import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

import dotenv from "dotenv";
dotenv.config();
const { ALCHEMY_API_URL, WALLET_PRIVATE_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL,
      gasPrice: 50000000000,

      accounts: [`${WALLET_PRIVATE_KEY}`],
    },
  },
};

export default config;
