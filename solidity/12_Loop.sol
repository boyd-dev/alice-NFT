//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    uint256 public s;

    function f() public {
        for (uint i=0; i<=10; i++) {
            s = s + i;
        }
    }

    function w() public {
        uint256 i;
        while(i<=10) {
            s = s + i;
            i++;
        }
    }

    function dw() public {
        uint256 i;
        do {
            s = s + i;
            i++;
        } while (i<=10) ;
    }

    function reset() public {
        s = 0;
    }

}
