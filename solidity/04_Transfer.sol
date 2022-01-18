//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    constructor() payable { }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function sendEther(address payable _addr) public  {
        _addr.transfer(0.1 ether);
    }

}
