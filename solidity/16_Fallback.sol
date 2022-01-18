//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract Caller {

    function f() external {

        address callee = 0x0fC5025C764cE34df352757e82f7B5c4Df39A836;
        bytes memory payload = abi.encode("Hello", 1000);

        (bool success, ) = callee.call(payload);

        if (!success) {
            revert();
        }
    }
}

contract Callee {

    bytes public data;
    string public s;
    uint256 public v;

    fallback(bytes calldata _input) external returns (bytes memory) {
        data = _input;
        (s, v) = abi.decode(_input, (string, uint256));
        return _input;
    }
}
