//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    enum Switch { OFF, ON }

    function foo(uint8 _v) public pure returns (bool) {
        bool result = false;
        if (_v == uint8(Switch.ON)) {
            result = true;
        }
        return result;
    }
}
