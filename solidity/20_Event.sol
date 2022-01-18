//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    address owner;
    event Deposit(address _from, uint _value);

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function disable() external {
        selfdestruct(payable(owner));
    }
}
