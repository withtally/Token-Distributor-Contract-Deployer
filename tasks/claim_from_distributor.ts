import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import { TokenDistributor, TokenDistributor__factory } from "../types";

task("claim", "Claims tokens from a token distributor.")
  .addParam(
    "distributor",
    "The address of the token distributor."
  )
  .addParam("json", "The path to the JSON file.")
  .setAction(async (taskArgs: TaskArguments, { ethers }) => {
    console.log("Claiming tokens from the token distributor...");

    const { token_distributor_address, json_path } = taskArgs;

    // Load the JSON file
    const json = require(json_path);

    // Get the signer address
    const signers = await ethers.getSigners();
    const signerAddress = await signers[0].getAddress();

    if (!json[signerAddress]) {
      throw new Error(
        `The signer address ${signerAddress} is not in the JSON file.`
      );
    }

    // Find the amount and proof in the JSON using the signer address
    const amount = json[signerAddress].amount;
    const proofs = json[signerAddress].ss;

    // Deploy the contract using the token distributor address
    const contract: TokenDistributor = await TokenDistributor__factory.connect(
      token_distributor_address
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
