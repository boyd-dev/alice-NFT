//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    Greeter c;

    function foo() public returns (string memory){
        c = Greeter(0xf96B30bFD86739D715Aa5F56d139377b73dC94b3);
        return c.greet();
    }
}

abstract contract Greeter {
    function greet() virtual public view returns (string memory);
}
