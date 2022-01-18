//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Ownable {

    address private owner;

    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    constructor () {
        owner = msg.sender;
    }

    function isOwner() public view returns (bool) {
        return msg.sender == owner;
    }
}

contract MyContract is Ownable {

}
