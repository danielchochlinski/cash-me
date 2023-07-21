import { ethers } from "hardhat";

async function deployTransactions() {
  const transactions = await ethers.deployContract("Transactions");
  await transactions.waitForDeployment();
  console.log(`Transactions deployed to ${transactions.target}`);
}

async function deployUserProfile() {
  const users = await ethers.deployContract("Users");
  await users.waitForDeployment();
  console.log(`UserProfile deployed to ${users.target}`);
}

async function main() {
  try {
    deployUserProfile();
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main();
