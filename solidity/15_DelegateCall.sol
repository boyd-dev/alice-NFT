//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Callee {

    uint256 public k;
    uint256 public x;

    function increase(uint256 _v) external {
        k = _v*100;
        x = 2**8;
    }
}

contract Caller {

    uint256 public k;
    uint8 public x;
    address public calleeAddr;

    constructor(address _addr) {
        calleeAddr = _addr;
    }

    function f(uint256 _val) external {

        bytes memory payload = abi.encodeWithSignature("increase(uint256)", _val);
        (bool success, ) = calleeAddr.delegatecall(payload);

        if (!success) {
            revert();
        }
    }
}
