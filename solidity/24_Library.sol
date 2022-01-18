//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

library LibUser {

    struct UserInfo {
        uint256 userId;
        string userName;
        uint256 regDate;
    }

    function addUser(UserInfo storage _self, uint256 _userId, string memory _userName) internal {
        _self.userId = _userId;
        _self.userName = _userName;
        _self.regDate = block.timestamp;
    }
}

contract MyContract {

    LibUser.UserInfo user;
    mapping (uint256 => LibUser.UserInfo) users;

    using LibUser for LibUser.UserInfo;

    function setUser(uint256 _userId, string memory _userName) external {
        user.addUser(_userId, _userName);
        users[_userId] = user;
    }

    function getUser(uint256 _userId) public view returns (LibUser.UserInfo memory) {
        return users[_userId];
    }

}
