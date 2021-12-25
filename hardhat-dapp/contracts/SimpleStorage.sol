//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract SimpleStorage {

    uint256 storedData;

    event Change(string message, uint newVal);

    constructor (uint s) {
        storedData = s;
    }

    function set(uint x) public {
        console.log("passed argument = %d", x);
        require(x < 5000, "Should be less than 5000");
        storedData = x;
        emit Change("set", x);
    }

    function get() public view returns (uint) {
        return storedData;
    }

}

