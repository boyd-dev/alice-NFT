//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.0;

contract MyContract {

    uint[] public arr;

    constructor() {
        for (uint i=0; i<10; i++) {
            arr.push(i*10);
        }
    }

    function addElement(uint256 _v) public {
        arr.push(_v);
    }

    function removeElement(uint _index) public {
        delete arr[_index];
    }

    function removeSize() public {
        arr.pop();
    }
}