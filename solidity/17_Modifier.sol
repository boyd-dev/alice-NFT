//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    address owner;
    uint256 public v;

    constructor() {
        owner = msg.sender;
    }

    modifier myModifier1(address _addr) {
        require(_addr == owner, "Only owner");
        _;
    }

    modifier myModifier2(uint256 _v) {
        require(_v <= 10000, "Less than 10K");
        _;
    }

    function foo(uint256 _v) public myModifier1(msg.sender) myModifier2(_v) {
        v = _v;
    }
}
