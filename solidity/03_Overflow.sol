//SPDX-License-Identifier:MIT
pragma solidity ^0.6.0;

contract MyContract {

    function foo() public pure returns (int8, int8){
        int8 x = -2**7;
        assert(-x == x);
        return (x, -x);
    }
}

/*
//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;

contract MyContract {

    function foo() public pure returns (int8, int8){
        int8 x = -2**7;
        assert(-x == x);
        return (x, -x);
    }
}
*/