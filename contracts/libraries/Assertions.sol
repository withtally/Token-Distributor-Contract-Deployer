// SPDX-License-Identifier: GPL-3.0  
pragma solidity 0.8.20;

/**
  @title Assertions
  @notice Library for assertion methods to validate inputs
*/
library Assertions {

  // Errors
  error NotGreaterThan(uint256 _x, uint256 _y);
  error NotLesserThan(uint256 _x, uint256 _y);
  error NotGreaterOrEqualThan(uint256 _x, uint256 _y); 
  error NotLesserOrEqualThan(uint256 _x, uint256 _y);
  error IntNotGreaterThan(int256 _x, int256 _y);
  error IntNotLesserThan(int256 _x, int256 _y);
  error IntNotGreaterOrEqualThan(int256 _x, int256 _y);
  error IntNotLesserOrEqualThan(int256 _x, int256 _y);
  error NullAmount();
  error NullAddress();

  /**
    @notice Asserts x is greater than y
    @param _x Value to check
    @param _y Comparison value
    @return __x Equal to _x 
  */
  function assertGt(uint256 _x, uint256 _y) internal pure returns (uint256 __x) {
    if (_x <= _y) revert NotGreaterThan(_x, _y);
    return _x; 
  }

  /**
    @notice Asserts x is greater than y
    @param _x Value to check
    @param _y Comparison value 
    @return __x Equal to _x
  */
  function assertGt(int256 _x, int256 _y) internal pure returns (int256 __x) {
    if (_x <= _y) revert IntNotGreaterThan(_x, _y);
    return _x;
  }

  // AssertGreaterThanOrEqual

  /**
    @notice Asserts x is greater than or equal to y
    @param _x Value to check
    @param _y Comparison value
    @return __x Equal to _x
  */
  function assertGtEq(uint256 _x, uint256 _y) internal pure returns (uint256 __x) {
    if (_x < _y) revert NotGreaterOrEqualThan(_x, _y);
    return _x;
  }

  // AssertIntGreaterThanOrEqual

  /**
    @notice Asserts x is greater than or equal to y 
    @param _x Value to check
    @param _y Comparison value
    @return __x Equal to _x
  */
  function assertGtEq(int256 _x, int256 _y) internal pure returns (int256 __x) {
    if (_x < _y) revert IntNotGreaterOrEqualThan(_x, _y); 
    return _x;
  }

  // AssertLessThan

  /**
    @notice Asserts x is less than y
    @param _x Value to check
    @param _y Comparison value
    @return __x Equal to _x
  */
  function assertLt(uint256 _x, uint256 _y) internal pure returns (uint256 __x) {
    if (_x >= _y) revert NotLesserThan(_x, _y);
    return _x;
  }  

  // AssertIntLessThan

  /**  
    @notice Asserts x is less than y
    @param _x Value to check
    @param _y Comparison value
    @return __x Equal to _x
  */
  function assertLt(int256 _x, int256 _y) internal pure returns (int256 __x) {
    if (_x >= _y) revert IntNotLesserThan(_x, _y);
    return _x;
  }

  // AssertLessThanOrEqual

  /**
    @notice Asserts x is less than or equal to y
    @param _x Value to check
    @param _y Comparison value
    @return __x Equal to _x
  */
  function assertLtEq(uint256 _x, uint256 _y) internal pure returns (uint256 __x) {
    if (_x > _y) revert NotLesserOrEqualThan(_x, _y); 
    return _x;
  }

  // AssertIntLessThanOrEqual  

  /**
    @notice Asserts x is less than or equal to y
    @param _x Value to check
    @param _y Comparison value 
    @return __x Equal to _x
  */    
  function assertLtEq(int256 _x, int256 _y) internal pure returns (int256 __x) {
    if (_x > _y) revert IntNotLesserOrEqualThan(_x, _y);
    return _x;
  }

  // NonZeroAmount

  /**
    @notice Asserts a non-zero uint input
    @param _x Value to check
    @return __x Equal to _x 
  */
  function assertNonNull(uint256 _x) internal pure returns (uint256 __x) {
    if (_x == 0) revert NullAmount(); 
    return _x;
  }

  // NonNullAddress

  /**
    @notice Asserts a non-zero address input
    @param _address Address to check 
    @return __address Equal to _address
  */    
  function assertNonNull(address _address) internal pure returns (address __address) {
    if (_address == address(0)) revert NullAddress();
    return _address; 
  }
}