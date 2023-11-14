import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    // for testnet
    "pego-testnet": {
      url: "https://rpc.pegotest.net/",
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 1000000000000,
    },
    // for mainnet
    "pego-mainnet": {
      url: "https://pegorpc.com/",
      accounts: [`0x${PRIVATE_KEY}`],
      gasPrice: 1000000000000,
    },
  },
  defaultNetwork: "pego-testnet",
};

export default config;
