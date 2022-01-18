//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;

contract MyContract {

    mapping(address => uint256) booking;

    constructor() {
        booking[0x5B38Da6a701c568545dCfcB03FcB875f56beddC4] = 100;
    }

    function getTikets(address _owner) public view returns (uint256) {
        return booking[_owner];
    }

}
