import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import {
  MyERC20__factory,
  TokenDistributor,
  TokenDistributor__factory,
} from "../types";
import { signDelegateTransaction } from "../helpers/sign";

task("claim_delegate", "Claims and delegates tokens from a token distributor.")
  .addParam("distributor", "The address of the token distributor.")
  .addParam("json", "The path to the JSON file.")
  .addOptionalParam(
    "delegate",
    "ethereum address who will be delegated to. e.g: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  )
  .setAction(async (taskArgs: TaskArguments, { ethers, network }) => {
    console.log("Claiming and delegating tokens from the token distributor...");

    const { distributor, json } = taskArgs;

    // Load the JSON file
    const jsonC = require(json);

    // Get the signer address
    const signers = await ethers.getSigners();
    const signer = signers[0];
    const signerAddress = await signer.getAddress();

    // get delegate address
    const _delegateTo: string = taskArgs.delegate
      ? taskArgs.delegate
      : signer.address;

    const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours

    if (!jsonC[signerAddress]) {
      throw new Error(
        `The signer address ${signerAddress} is not in the JSON file.`
      );
    }

    // Find the amount and proof in the JSON using the signer address
    const amount = jsonC[signerAddress].amount;
    const proofs = jsonC[signerAddress].proof;

    // Connect the contract using the token distributor address
    const contract: TokenDistributor = await TokenDistributor__factory.connect(
      distributor
    );

    // generate v,r,s
    const tokenAddress = await contract.token();
    // Connect the contract using the token address
    const erc20 = await MyERC20__factory.connect(tokenAddress);

    // nonce from signer
    const nonce = await erc20.nonces(signerAddress);

    // get chainID on hardhat
    const chainId = network.config.chainId;
    const signature = await signDelegateTransaction({
      contractAddress: await erc20.getAddress(),
      contractName: await erc20.name(),
      delegateeAddress: signerAddress,
      chainId: chainId ? chainId : 31337, // fetch from hardhat or use as hardhat local
      nonce,
      expiry,
      signer: signer,
    });

    const { v, r, s } = ethers.Signature.from(signature);

    // Make a call to the contract to claim and delegate tokens
    const tx = await contract.claimAndDelegate(
      proofs,
      amount,
      _delegateTo,
      100000n,
      v,
      r,
      s
    );

    // Wait for the transaction to be mined
    const receipt = await tx.wait();

    // Check Status
    if (receipt?.status === 0) {
      throw new Error("Transaction failed");
    } else {
      console.log("Tokens claimed and delegated successfully!");
    }
  });
