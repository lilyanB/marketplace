import { ethers } from "hardhat";

async function main() {

  const marketplaceAddress = "0xCc0d2D1eD33D7FB5D1317CD47cEb51082EFe1e0E"
  const myERC721Address = "0x7191d79df6bf1ab1CF300b03AE12c3f6707034Ce"
  const myERC20Address = "0x977D7b53997a2abB96644978c241F9d00f786E65"

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
  // const addItemETH = await marketplace.createListing(1, myERC721Address, 10)
  // await addItemETH.wait();
  // console.log("addItemETH done")

  // await myERC721.approve(marketplaceAddress, 3)
  // const addItemERC20 = await marketplace.createListingERC20(3, myERC721Address, 100, myERC20Address)
  // await addItemERC20.wait();
  // console.log("addItemERC20 done")

  const marketItem1 = await marketplace.getMarketItem(1);
  const marketItem2 = await marketplace.getMarketItem(2);

  console.log('marketplace Information:');
  console.log(marketItem1);
  console.log(marketItem2);

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
