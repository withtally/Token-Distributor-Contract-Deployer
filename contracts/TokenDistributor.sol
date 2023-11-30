// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.20;

import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {Authorizable} from "./utils/Authorizable.sol";
import {ITokenDistributor} from "./interfaces/tokens/ITokenDistributor.sol";
import {Assertions} from "./libraries/Assertions.sol";

/**
  @title TokenDistributor
  @notice Distributes ERC20 tokens via Merkle proofs 
  during a specified claim period
*/
contract TokenDistributor is Authorizable, ITokenDistributor {

  using Assertions for address;
  using Assertions for uint256;

  /**
    @notice Merkle root for claims 
  */
  bytes32 public root;

  /** 
    @notice ERC20 token being distributed
  */
  ERC20Votes public token;

  /**
    @notice Total tokens allocated for distribution
  */ 
  uint256 public totalClaimable;

  /**
    @notice Start timestamp for claim period 
  */
  uint256 public claimPeriodStart;

  /**
    @notice End timestamp for claim period
  */
  uint256 public claimPeriodEnd;

  /**
    @notice Mapping of addresses that have claimed
  */
  mapping(address => bool) public claimed;

  using SafeERC20 for ERC20Votes;

  /**
    @param _root Merkle root for claims
    @param _token ERC20 token address
    @param _totalClaimable Total tokens to distribute 
    @param _claimPeriodStart Distribution start timestamp
    @param _claimPeriodEnd Distribution end timestamp
    @param _delegateTo Address to delegate token voting power
  */
  constructor(
    bytes32 _root,
    ERC20Votes _token,
    uint256 _totalClaimable,
    uint256 _claimPeriodStart,
    uint256 _claimPeriodEnd,
    address _delegateTo
  ) Authorizable(msg.sender) {
    
    // Set storage variables
    root = _root;
    token = ERC20Votes(address(_token).assertNonNull());
    totalClaimable = _totalClaimable.assertNonNull();
    claimPeriodStart = _claimPeriodStart.assertGt(block.timestamp);
    claimPeriodEnd = _claimPeriodEnd.assertGt(claimPeriodStart);

    // Delegate tokens 
    token.delegate(_delegateTo.assertNonNull());
  }

  /**
    @notice Checks if a claim can be made
    @param _proof Merkle proof data 
    @param _user Claiming address
    @param _amount Claimable amount 
    @return _claimable Whether claim is valid
  */
  function canClaim(bytes32[] calldata _proof, address _user, uint256 _amount) external view returns (bool _claimable) {
    return _canClaim(_proof, _user, _amount);
  }

  /**
    @notice Claims tokens  
    @param _proof Merkle proof data
    @param _amount Amount to claim
  */
  function claim(bytes32[] calldata _proof, uint256 _amount) external {
    _claim(_proof, _amount);
  }

  /**
    @notice Claims tokens and delegates voting power
    @param _proof Merkle proof data
    @param _amount Amount to claim 
    @param _delegatee Address to delegate voting power 
    @param _expiry Expiry for signature  
    @param _v Signature recovery bit
    @param _r Signature output r
    @param _s Signature output s
  */
  function claimAndDelegate(
    bytes32[] calldata _proof,
    uint256 _amount,
    address _delegatee,
    uint256 _expiry, 
    uint8 _v,
    bytes32 _r,
    bytes32 _s
  ) external {
    
    // Claim tokens
    _claim(_proof, _amount);

    // Delegate using EIP-712 sig 
    token.delegateBySig(_delegatee, 0, _expiry, _v, _r, _s); 
  }

  /**
    @notice Withdraws any remaining tokens
    @dev Only authorized
    @param _sweepReceiver Address to send tokens
  */
  function sweep(address _sweepReceiver) external override isAuthorized {
    
    // Must be after claim period
    if (block.timestamp <= claimPeriodEnd) revert TokenDistributor_ClaimPeriodNotEnded();
    
    // Transfer out tokens
    uint256 _balance = token.balanceOf(address(this)).assertGt(0);   
    token.safeTransfer(_sweepReceiver, _balance);

    emit Swept({_sweepReceiver: _sweepReceiver, _amount: _balance});
  }

  /**
    @notice Withdraws tokens during claim period 
    @dev Only authorized
    @param _to Receiver of tokens
    @param _amount Tokens to withdraw
  */
  function withdraw(address _to, uint256 _amount) external override isAuthorized {
    
    token.safeTransfer(_to, _amount);

    emit Withdrawn({_to: _to, _amount: _amount});
  }

  /**
    @notice Internal check if a claim is valid
    @param _proof Merkle proof data
    @param _user Claiming address
    @param _amount Claim amount
    @return _claimable Validity of claim 
  */
  function _canClaim(bytes32[] calldata _proof, address _user, uint256 _amount) internal view returns (bool _claimable) {
    
    _claimable = _claimPeriodActive() 
                && _amount > 0 
                && !claimed[_user] 
                && _merkleVerified(_proof, _user, _amount);
  }

  /**
    @notice Internal claim logic
    @param _proof Merkle proof data
    @param _amount Amount to claim  
  */
  function _claim(bytes32[] calldata _proof, uint256 _amount) internal {

    // Validate claim
    _validateClaim(_proof, _amount);

    // Mark claimed
    claimed[msg.sender] = true;  

    // Update total supply
    totalClaimable -= _amount;

    // Transfer tokens
    token.safeTransfer(msg.sender, _amount);

    emit Claimed({_user: msg.sender, _amount: _amount});
  }

  /**
    @notice Internal claim validation  
    @param _proof Merkle proof data
    @param _amount Claim amount
  */
  function _validateClaim(bytes32[] calldata _proof, uint256 _amount) internal view {

    // Validate conditions
    if (block.timestamp < claimPeriodStart) revert TokenDistributor_ClaimPeriodNotStarted();
    if (block.timestamp > claimPeriodEnd) revert TokenDistributor_ClaimPeriodEnded();
    if (_amount == 0) revert TokenDistributor_ZeroAmount();
    if (claimed[msg.sender]) revert TokenDistributor_AlreadyClaimed();
    if (!_merkleVerified(_proof, msg.sender, _amount)) revert TokenDistributor_FailedMerkleProofVerify();
  }

  /**
    @notice Checks if currently in claim period
    @return _active Whether period is active
  */
  function _claimPeriodActive() internal view returns (bool _active) {
    
    _active = block.timestamp >= claimPeriodStart 
              && block.timestamp <= claimPeriodEnd;
  }

  /**
    @notice Verifies a Merkle proof
    @param _proof Merkle proof data
    @param _user Claiming address
    @param _amount Claim amount  
    @return _valid Validity of proof
  */
  function _merkleVerified(
    bytes32[] calldata _proof,
    address _user,
    uint256 _amount
  ) internal view returns (bool _valid) {
    // bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(_user, _amount))));
    bytes32 leaf = keccak256(abi.encodePacked(_user, _amount));
    _valid = MerkleProof.verify(_proof, root, leaf);
  }
}