import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import { MyERC20__factory } from "../types";

task("transfer", "Transfer tokens.")
  .addParam("to", "The address of the token receiver.")
  .addParam("token", "The address of the token.")
  .addParam("amount", "The amount.")
  .setAction(async (taskArgs: TaskArguments, { }) => {
    
    console.log("Transfer tokens...");
    const { to, token, amount } = taskArgs;

    // Connect the contract using the token address
    const erc20 = await MyERC20__factory.connect(token);

    const tx = await erc20.transfer(to, amount);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Check Status
    if (receipt?.status === 0) {
      throw new Error("Transaction failed");
    } else {
      console.log("Tokens transfered successfully!");
    }
  });
