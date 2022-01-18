//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Parent {

    uint256 private a;
    constructor(uint256 _a) {
         a = _a;
    }

    function get() internal view returns (uint256) {
        return a;
    }
}

contract Child is Parent {

    constructor(uint256 _v) Parent(_v){}

    function foo() public view returns (uint256) {
          return get();
    }
}
