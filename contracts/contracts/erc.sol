// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC721 is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        for (uint i = 1; i <= 3; i++) {
            _safeMint(msg.sender, i);
        }
    }
}

contract MyERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}
