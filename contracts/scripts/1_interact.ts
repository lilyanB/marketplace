const hre = require("hardhat");
const ethershardhat = hre.ethers;
const { expect, assert } = require("chai");

async function main() {

  const marketplaceAddress = "0xf5059a5D33d5853360D16C683c16e67980206f36"
  const myERC721Address = "0x95401dc811bb5740090279Ba06cfA8fcF6113778"
  const myERC20Address = "0x998abeb3E57409262aE5b751f60747921B33613E"

  const Marketplace = await ethershardhat.getContractFactory("Marketplace");
  const marketplace = Marketplace.attach(marketplaceAddress);
  console.log(`deployed marketplace at ${marketplace.target}`);

  const MyERC721 = await ethershardhat.getContractFactory("MyERC721");
  const myERC721 = MyERC721.attach(myERC721Address);
  console.log(`deployed myERC721 at ${myERC721.target}`);

  const MyERC20 = await ethershardhat.getContractFactory("MyERC20");
  const myERC20 = MyERC20.attach(myERC20Address);
  console.log(`deployed myERC20 at ${myERC20.target}`);

  // await myERC721.approve(marketplaceAddress, 1)
  // const addItemETH = await marketplace.createListing(1, myERC721Address, 1000)
  // await addItemETH.wait();
  // console.log("addItemETH done")

  // await myERC721.approve(marketplaceAddress, 3)
  // const addItemERC20 = await marketplace.createListingERC20(3, myERC721Address, 10, myERC20Address)
  // await addItemERC20.wait();
  // console.log("addItemERC20 done")

  const marketItem1 = await marketplace.getMarketItem(1);
  const marketItem2 = await marketplace.getMarketItem(2);

  console.log('marketplace Information:');
  console.log(marketItem1);
  console.log(marketItem2);

  await marketplace.buyListing(1, { value: 1000 })
  await myERC20.approve(marketplaceAddress, 10)
  await marketplace.buyListingERC20(2)


  const marketItem1AfterBuy = await marketplace.getMarketItem(1);
  const marketItem2AfterBuy = await marketplace.getMarketItem(2);
  const listedNFTsAfterBuy = await marketplace.getMyListedNFTs();
  console.log('marketplace Information after buy:');
  console.log(marketItem1AfterBuy);
  console.log(marketItem2AfterBuy);
  console.log(listedNFTsAfterBuy);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
