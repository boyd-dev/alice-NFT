//SPDX-License-Identifier:MIT
pragma solidity 0.8.10;

contract Callee {

    uint[5] arr = [1,2,3,4,5];

    function print(uint _index) public view returns (uint) {
        require(_index < arr.length, "index out of bound");
        return arr[_index];
    }
}

contract Caller {

    Callee callee;
    string public errData;

    constructor(address _addr) {
        callee = Callee(_addr);
    }

    function get(uint _index) public returns (uint, bool) {

        try callee.print(_index) returns (uint v) {
            return (v, true);

        } catch Error(string memory _err) {
            errData = _err;
            return (0, false);
        }
    }
}
