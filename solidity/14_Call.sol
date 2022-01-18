//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Callee {

    function increase(uint256 _v) external pure returns (uint256) {
        return _v * 100;
    }

    function foo(uint256 _x) external pure returns (uint256) {
        return _x;
    }
}

contract Caller {

    Callee callee;

    constructor(address _addr) {
        callee = Callee(_addr);
    }

    function f(uint _val) public view returns (uint256) {
        return callee.increase(_val);
    }
}
