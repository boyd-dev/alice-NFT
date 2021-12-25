// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ALSnft is ERC721URIStorage {

    address owner;

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    constructor() ERC721("Alice Loves Sea NFT", "ALS") {
        owner = msg.sender;
    }

    function mint(address toAddr, uint256 tokenId, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenId;
        _mint(toAddr, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
