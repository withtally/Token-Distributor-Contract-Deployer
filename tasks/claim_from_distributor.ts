import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import { TokenDistributor, TokenDistributor__factory } from "../types";
import fs from "fs";

task("claim", "Claims tokens from a token distributor.")
  .addParam(
    "distributor",
    "The address of the token distributor."
  )
  .addParam("json", "The path to the JSON file.")
  .setAction(async (taskArgs: TaskArguments, { ethers }) => {
    console.log("Claiming tokens from the token distributor...");

    const { distributor, json } = taskArgs;

    // Read the content of the JSON file
    const rawData = fs.readFileSync(json, 'utf-8');
    const jsonC = JSON.parse(rawData);

    // Get the signer address
    const signers = await ethers.getSigners();
    const signerAddress = await signers[0].getAddress();

    if (!jsonC[signerAddress]) {
      throw new Error(
        `The signer address ${signerAddress} is not in the JSON file.`
      );
    }

    // Find the amount and proof in the JSON using the signer address
    const amount = jsonC[signerAddress].amount;
    const proofs = jsonC[signerAddress].ss;

    // Deploy the contract using the token distributor address
    const contract: TokenDistributor = await TokenDistributor__factory.connect(
      distributor
    );

    // Make a call to the contract to claim tokens
    const tx = await contract.claim( proofs,amount);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Check Status
    if (receipt?.status === 0) {
      throw new Error("Transaction failed");
    } else {
      console.log("Tokens claimed successfully!");
    }
  });
