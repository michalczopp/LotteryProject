import { ethers } from "ethers";
import * as dotenv from 'dotenv';
dotenv.config();
import{ Lottery__factory } from "../typechain-types";
const BET_PRICE = 1;
const BET_FEE = 0.2;
const TOKEN_RATIO = 1n;

function setupProvider() {
    const provider = new ethers.AlchemyProvider(
      "eth",
      process.env.ALCHEMY_API_KEY ?? ""
    );
    return provider;
  }

async function main() {
    const provider = setupProvider();
    const wallet = ethers.Wallet.fromPhrase(process.env.PRIVATE_KEY ?? "", provider);
    console.log(`Using address ${wallet.address}`);
    const balanceBN = await provider.getBalance(wallet.address);
    const balance = Number(ethers.formatUnits(balanceBN));
    console.log(`Wallet balance ${balance}`);
    if (balance < 0.01) {
      throw new Error("Not enough ether");
    }
    console.log("Deploying Lottery Contract.");
    const ltoFactory = new Lottery__factory(wallet);
    const contract = await ltoFactory.deploy(
        "LotteryToken", "LTO", TOKEN_RATIO, ethers.parseUnits(BET_PRICE.toFixed(18)), ethers.parseUnits(BET_FEE.toFixed(18)
    ));
    await contract.waitForDeployment();
    const add = await contract.getAddress();
    console.log(`Contract deployed to mainnet with address: ${add}.`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});