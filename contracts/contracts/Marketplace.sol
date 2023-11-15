// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Marketplace {
    uint256 private marketplaceIds;
    uint256 private totalMarketplaceItemsSold;

    mapping(uint256 => Listing) private marketplaceIdToListingItem;

    struct Listing {
        uint256 marketplaceId;
        address nftAddress;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 listPrice;
        address erc20Address;
    }

    event ListingCreated(
        uint256 indexed marketplaceId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 listPrice,
        address erc20Address
    );

    modifier validPrice(uint256 price) {
        require(price > 0, "List price must be greater than 0");
        _;
    }

    function createListing(
        uint256 tokenId,
        address nftAddress,
        uint256 price
    ) external validPrice(price) {
        uint marketplaceItemId = ++marketplaceIds;
        _createListing(
            marketplaceItemId,
            tokenId,
            nftAddress,
            payable(msg.sender),
            payable(address(0)),
            price,
            address(0)
        );
    }

    function createListingERC20(
        uint256 tokenId,
        address nftAddress,
        uint256 price,
        address erc20Address
    ) external validPrice(price) {
        uint marketplaceItemId = ++marketplaceIds;
        _createListing(
            marketplaceItemId,
            tokenId,
            nftAddress,
            payable(msg.sender),
            payable(address(0)),
            price,
            erc20Address
        );
    }

    function _createListing(
        uint256 marketplaceItemId,
        uint256 tokenId,
        address nftAddress,
        address payable seller,
        address payable owner,
        uint256 price,
        address erc20Address
    ) internal {
        marketplaceIdToListingItem[marketplaceItemId] = Listing({
            marketplaceId: marketplaceItemId,
            nftAddress: nftAddress,
            tokenId: tokenId,
            seller: seller,
            owner: owner,
            listPrice: price,
            erc20Address: erc20Address
        });

        IERC721(nftAddress).transferFrom(seller, address(this), tokenId);
        emit ListingCreated(
            marketplaceItemId,
            nftAddress,
            tokenId,
            seller,
            owner,
            price,
            erc20Address
        );
    }

    function buyListing(uint256 marketplaceItemId) external payable {
        Listing storage listing = marketplaceIdToListingItem[marketplaceItemId];
        uint price = listing.listPrice;
        require(msg.value == price, "Incorrect value sent for NFT purchase");
        require(listing.erc20Address == address(0), "Wrong function");
        _executePurchase(marketplaceItemId, listing.nftAddress);
    }

    function buyListingERC20(uint256 marketplaceItemId) external {
        Listing storage listing = marketplaceIdToListingItem[marketplaceItemId];
        uint256 price = listing.listPrice;
        require(
            IERC20(listing.erc20Address).transferFrom(
                msg.sender,
                address(this),
                price
            ),
            "Failed to transfer ERC20 tokens"
        );
        _executePurchase(marketplaceItemId, listing.nftAddress);
    }

    function _executePurchase(
        uint256 marketplaceItemId,
        address nftAddress
    ) internal {
        Listing storage listing = marketplaceIdToListingItem[marketplaceItemId];
        uint256 tokenId = listing.tokenId;
        address payable sellerAddress = listing.seller;
        address erc20Address = listing.erc20Address;

        if (erc20Address != address(0)) {
            require(
                IERC20(erc20Address).transfer(sellerAddress, listing.listPrice),
                "Failed to transfer ERC20 tokens to seller"
            );
        } else {
            sellerAddress.transfer(listing.listPrice);
        }

        IERC721(nftAddress).transferFrom(address(this), msg.sender, tokenId);
        listing.owner = payable(msg.sender);
        totalMarketplaceItemsSold += 1;
    }

    function getMarketItem(
        uint256 marketplaceItemId
    ) external view returns (Listing memory) {
        return marketplaceIdToListingItem[marketplaceItemId];
    }

    function getTotalItemsSold() external view returns (uint256) {
        return totalMarketplaceItemsSold;
    }

    function getTotalItemsListed() external view returns (uint256) {
        return marketplaceIds;
    }

    function getMarketplaceItemIds() external view returns (uint256[] memory) {
        uint256[] memory itemIds = new uint256[](marketplaceIds);

        for (uint256 i = 1; i <= marketplaceIds; i++) {
            itemIds[i - 1] = i;
        }

        return itemIds;
    }
}
