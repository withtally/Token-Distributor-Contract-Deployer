// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.20;

import {IAuthorizable} from "../interfaces/utils/IAuthorizable.sol";  

import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

/**
  @title Authorizable
  @notice Provides basic authorization control functionality
  @dev Inherit from this contract to add authorization system
*/
abstract contract Authorizable is IAuthorizable {
  
  using EnumerableSet for EnumerableSet.AddressSet;

  /** 
    @notice Set of authorized addresses
  */
  EnumerableSet.AddressSet internal _authorizedAccounts;

  /**
    @notice Initializes contract with an authorized account
    @param _account Initial authorized account
  */
  constructor(address _account) {
    _addAuthorization(_account); 
  }

  /**
    @notice Checks if an account is authorized
    @param _account Address to check
    @return _authorized Authorization status
  */ 
  function authorizedAccounts(address _account) external view returns (uint256 _authorized) {
    
    // Compatibility with old implementation
    if (_isAuthorized(_account)) return 1;
  }

  /** 
    @notice Gets all authorized accounts
    @return _accounts Array of authorized addresses  
  */
  function authorizedAccounts() external view returns (address[] memory _accounts) {
    return _authorizedAccounts.values();
  }

  /**
    @notice Adds an account to authorized set
    @dev Only callable by authorized accounts 
    @param _account Address to authorize
  */
  function addAuthorization(address _account) external virtual isAuthorized {
    _addAuthorization(_account);
  }
   
  /**
    @notice Removes authorizion for an account 
    @dev Only callable by authorized accounts
    @param _account Address to remove authorization  
  */
  function removeAuthorization(address _account) external virtual isAuthorized {
    _removeAuthorization(_account);
  }

  /**
    @notice Checks if address is authorized
    @param _account Address to check
    @return _authorized Authorization status
  */
  function _isAuthorized(address _account) internal view virtual returns (bool _authorized) {
    return _authorizedAccounts.contains(_account);
  }  

  /** 
    @notice Adds address to authorized set
    @param _account Address to add 
  */
  function _addAuthorization(address _account) internal {

    // Prevent duplicate authorization
    if (_authorizedAccounts.add(_account)) {
      emit AddAuthorization(_account);
    } else {
      revert AlreadyAuthorized(); 
    }
  }

  /**
    @notice Removes address from authorized set
    @param _account Address to remove
  */
  function _removeAuthorization(address _account) internal {

    // Confirm account is authorized
    if (_authorizedAccounts.remove(_account)) {
      emit RemoveAuthorization(_account);
    } else {  
      revert NotAuthorized();
    }
  }
  
  /**
    @notice Reverts if msg.sender is not authorized
  */
  modifier isAuthorized() {
    if (!_isAuthorized(msg.sender)) revert Unauthorized();
    _;
  }
}