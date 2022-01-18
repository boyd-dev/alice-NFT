//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    function callByProxy(address _addr, bytes memory _payload) public returns (bytes memory) {
        (bool bOk, bytes memory result) = _addr.call(_payload);
        if (!bOk) {
            revert();
        }
        return result;
    }
}


contract MyTest {

    function sum(uint256 _a, uint256 _b) external pure returns (uint256) {
        return _a + _b;
    }

    function getPayload(uint256 _a, uint256 _b) public pure returns (bytes memory) {
        return abi.encodeWithSignature("sum(uint256,uint256)", _a, _b);
    }
}