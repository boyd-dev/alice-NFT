//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    function getArrayElementAdd(uint[] memory a1) external pure returns (uint[] memory) {
        return map(a1, fnAdd);
    }

    function getArrayElementSquare(uint[] memory a2) external pure returns (uint[] memory) {
        return map(a2, fnSquare);
    }

    function map(uint[] memory arr, function (uint) pure returns (uint) f)
    internal pure returns (uint[] memory result) {
        result = new uint[](arr.length);
        for (uint i=0; i<arr.length; i++) {
            result[i] = f(arr[i]);
        }
    }

    function fnAdd(uint a) internal pure returns (uint) {
        return a+a;
    }

    function fnSquare(uint a) internal pure returns (uint) {
        return a*a;
    }

}

