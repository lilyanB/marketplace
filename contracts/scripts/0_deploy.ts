const hre = require("hardhat");
const ethershardhat = hre.ethers;
const { expect, assert } = require("chai");

async function main() {

  const [deployer] = await ethershardhat.getSigners();

  console.log('Deploying contracts with the deployer address:', deployer.address);

  const Marketplace = await ethershardhat.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.waitForDeployment();
  console.log(`deployed marketplace at ${marketplace.target}`);

  const MyERC721 = await ethershardhat.getContractFactory("MyERC721");
  const myERC721 = await MyERC721.deploy("Mon NFT", "NFT");
  await myERC721.waitForDeployment();
  console.log(`deployed myERC721 at ${myERC721.target}`);

  const MyERC20 = await ethershardhat.getContractFactory("MyERC20");
  const myERC20 = await MyERC20.deploy("Mon ERC20", "ERC20");
  await myERC20.waitForDeployment();
  console.log(`deployed myERC20 at ${myERC20.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
