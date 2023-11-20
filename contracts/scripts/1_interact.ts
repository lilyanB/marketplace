import { ethers } from "hardhat";

async function main() {

  const marketplaceAddress = "0xCc0d2D1eD33D7FB5D1317CD47cEb51082EFe1e0E"
  const myERC721Address = "0xD895C0D2283cc5E276eE9AC4f07B89D08e029F52"
  const myERC20Address = "0x16cD189131b07C0a09932d3f9d7b74D7EE259D04"

  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = Marketplace.attach(marketplaceAddress);
  console.log(`deployed marketplace at ${marketplace.target}`);

  const MyERC721 = await ethers.getContractFactory("MyERC721");
  const myERC721 = MyERC721.attach(myERC721Address);
  console.log(`deployed myERC721 at ${myERC721.target}`);

  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const myERC20 = MyERC20.attach(myERC20Address);
  console.log(`deployed myERC20 at ${myERC20.target}`);

  // await myERC721.approve(marketplaceAddress, 1)
  // const addItemETH = await marketplace.createListing(1, myERC721Address, ethers.parseEther('0.00001'))
  // await addItemETH.wait();
  // console.log("addItemETH done")


  // await myERC721.approve(marketplaceAddress, 2)
  // const addItemETH2 = await marketplace.createListingERC20(2, myERC721Address, ethers.parseEther('0.00002'))
  // await addItemETH2.wait();
  // console.log("addItemERC20 done")

  // await myERC721.approve(marketplaceAddress, 3)
  // const addItemERC20 = await marketplace.createListingERC20(3, myERC721Address, 100, myERC20Address)
  // await addItemERC20.wait();
  // console.log("addItemERC20 done")


  const ERC20Name = await myERC20.name();
  console.log(`ERC20Name:`, ERC20Name);

  console.log('marketplace Information:');
  for (let i = 1; i <= 8; i++) {
    const marketItem = await marketplace.getMarketItem(i);
    console.log(`MarketItem ${i}:`, marketItem);
  }

  // await marketplace.buyListing(1, { value: 1000 })
  // await myERC20.approve(marketplaceAddress, 10)
  // await marketplace.buyListingERC20(2)


  // const marketItem1AfterBuy = await marketplace.getMarketItem(1);
  // const marketItem2AfterBuy = await marketplace.getMarketItem(2);
  // const listedNFTsAfterBuy = await marketplace.getMarketplaceItemIds();
  // console.log('marketplace Information after buy:');
  // console.log(marketItem1AfterBuy);
  // console.log(marketItem2AfterBuy);
  // console.log(listedNFTsAfterBuy);



  const listedNFTsAfterBuy = await myERC721.tokenURI(1);
  console.log('uri : ', listedNFTsAfterBuy);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
