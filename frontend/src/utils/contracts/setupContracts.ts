import { marketplaceAddress, myERC20Address, myERC721Address } from "./constants";
import marketJSON from "./ABI/Marketplace.json";
import myERC721JSON from "./ABI/MyERC721.json";
import myERC20JSON from "./ABI/MyERC20.json";

const marketABI = marketJSON.abi;
const myERC721ABI = myERC721JSON.abi;
const myERC20ABI = myERC20JSON.abi;

export const marketContract = {
    address: marketplaceAddress,
    abi: marketABI,
}

export const myERC721Contract = {
    address: myERC721Address,
    abi: myERC721ABI,
}

export const myERC20Contract = {
    address: myERC20Address,
    abi: myERC20ABI,
}

