//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract HelloWorld {

    string public s;

    constructor(string memory _s) {
        s = _s;
    }

    function set(string memory _s) public {
        s = _s;
    }

}


