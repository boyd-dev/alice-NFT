//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    struct Certification {
        string certId;
        string certName;
        uint regDate;
    }

    struct UserInfo {
        string userId;
        string name;
        mapping (uint => Certification) certs;
    }

    mapping(address => UserInfo) public users;

    function registerUser(string memory _name, string memory _userId) external {

        users[msg.sender].userId = _userId;
        users[msg.sender].name = _name;
    }

    function registerCert(uint _certNo, string memory _certId, string memory _certName, uint _regDate) external {
        UserInfo storage u = users[msg.sender];
        u.certs[_certNo] = Certification({certId: _certId, certName: _certName, regDate: _regDate});
    }

    function getUserCertInfo(address _addr, uint _certNo) public view returns (string memory) {
        Certification memory c = users[_addr].certs[_certNo];
        return c.certId;
    }
}
