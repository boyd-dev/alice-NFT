//SPDX-License-Identifier:MIT
pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract MyContract {

    struct UserInfo {
        string userId;
        string name;
        uint256 date;
    }

    mapping(address => UserInfo) public users;

    function setMember(string memory _userId, string memory _name, uint256 _date) external {
        users[msg.sender] = UserInfo({userId: _userId, name: _name, date: _date});
    }

    function getMemmber(address _addr) public view returns (UserInfo memory user) {
        return users[_addr];
    }

}