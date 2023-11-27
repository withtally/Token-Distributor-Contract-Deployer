// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.20;

import {IAuthorizable} from "../utils/IAuthorizable.sol";  

import {ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/**
  @title ITokenDistributor
  @notice Interface for a token distributor contract
*/
interface ITokenDistributor is IAuthorizable {

  // Events

  /**   
    @param _user Account that claimed tokens
    @param _amount Amount of tokens claimed
  */
  event Claimed(address _user, uint256 _amount);
  
  /**
    @param _sweepReceiver Account receiving leftover tokens
    @param _amount Tokens transferred
  */ 
  event Swept(address _sweepReceiver, uint256 _amount);

  /**
    @param _to Receiver of withdrawn tokens  
    @param _amount Tokens withdrawn
  */
  event Withdrawn(address _to, uint256 _amount);

  // Errors

  error TokenDistributor_ClaimPeriodNotStarted();
  error TokenDistributor_ClaimPeriodEnded(); 
  error TokenDistributor_AlreadyClaimed();
  error TokenDistributor_ZeroAmount();
  error TokenDistributor_FailedMerkleProofVerify();
  error TokenDistributor_ClaimPeriodNotEnded();

  // Views
  
  /**
    @return _root Merkle root for claims
  */
  function root() external view returns (bytes32 _root);

  /**  
    @return _token ERC20 token contract 
  */
  function token() external view returns (ERC20Votes _token);

  /**
    @return _totalClaimable Total tokens allocated
  */
  function totalClaimable() external view returns (uint256 _totalClaimable);

  /**
    @return _claimPeriodStart Start time for claims
  */
  function claimPeriodStart() external view returns (uint256 _claimPeriodStart);

  /**
    @return _claimPeriodEnd End time for claims
  */ 
  function claimPeriodEnd() external view returns (uint256 _claimPeriodEnd);
   
  /**
    @param _proof Merkle proof data
    @param _user Account to check claim for 
    @param _amount Tokens to claim
    @return _claimable Whether claim is valid
  */
  function canClaim(bytes32[] calldata _proof, address _user, uint256 _amount) external view returns (bool _claimable);

  /** 
    @param _proof Merkle proof data
    @param _amount Tokens to claim
  */
  function claim(bytes32[] calldata _proof, uint256 _amount) external;

  /**
    @param _proof Merkle proof data  
    @param _amount Tokens to claim
    @param _delegatee Account to delegate votes
    @param _expiry Signature expiry  
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
  ) external;
   
  /**
    @param _user Account address
    @return _claimed Whether tokens have been claimed
  */
  function claimed(address _user) external view returns (bool _claimed);

  /**
    @param _sweepReceiver Account to send leftover tokens
  */
  function sweep(address _sweepReceiver) external;

  /**  
    @param _to Receiver of withdrawn tokens
    @param _amount Tokens to withdraw 
  */
  function withdraw(address _to, uint256 _amount) external;
}