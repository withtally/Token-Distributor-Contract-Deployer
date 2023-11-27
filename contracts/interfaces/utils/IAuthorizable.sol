// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.20;

/**
  @title IAuthorizable
  @notice Interface for authorization management
*/
interface IAuthorizable {

  // Events 

  /**
    @notice Emitted when an account is authorized
    @param _account Authorized account  
  */
  event AddAuthorization(address _account);

  /**
    @notice Emitted when an account authorization is removed 
    @param _account Account removed from authorization
  */
  event RemoveAuthorization(address _account);

  // Errors

  /** 
    @notice Attempting to authorize an already authorized account 
  */
  error AlreadyAuthorized();
  
  /**
    @notice Attempting to remove authorization from an unauthorized account
  */  
  error NotAuthorized();

  /**  
    @notice Function called by unauthorized account 
  */
  error Unauthorized();

  // Views

  /**
    @notice Checks if account is authorized
    @param _account Account address to check 
    @return _authorized Authorization status 
  */
  function authorizedAccounts(address _account) external view returns (uint256 _authorized);

  /**
    @notice Gets array of authorized accounts
    @return _accounts Array of authorized account addresses
  */
  function authorizedAccounts() external view returns (address[] memory _accounts);

  // Write

  /**
    @notice Adds account address to authorized set
  */
  function addAuthorization(address _account) external;

  /** 
    @notice Removes account address from authorized set
  */
  function removeAuthorization(address _account) external;
}