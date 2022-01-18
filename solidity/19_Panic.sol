//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Callee {

    function f(uint256 _v) external pure returns (uint256) {
        return 10000000 / _v;
    }
}

contract Caller {

    Callee callee;
    uint256 public errorCode;

    constructor(address _addr) {
        callee = Callee(_addr);
    }

    function foo(uint256 _v) public returns (uint256, bool) {

        try callee.f(_v) returns (uint256 result) {
            return (result, true);
        } catch Panic(uint code) {
            errorCode = code;
            return (0, false);
        }
    }

}
