import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { readCSV } from "../helpers/merkle_tree";
import fs from "fs";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";
import { ethers } from "ethers";

task("tree", "Generates merkle proofs from CSV")
  .addParam("csv", "Path to CSV file")
  .setAction(async function (taskArgs: TaskArguments) {
    console.log("\nMerkle Tree");

    const blocks = await readCSV(taskArgs.csv);

    const buffers = blocks.map((b) => {
      const addressBytes = ethers.getBytes(b.address); // Convert address to bytes
      // const amountBytes = ethers.BigNumber.from(b.amount).toHexString();
      const amountBigInt = BigInt(b.amount);
      const amountHexString = "0x" + amountBigInt.toString(16);
      const amountBytes = Uint8Array.from(Buffer.from(amountHexString, "hex"));

      const concatenatedBytes = new Uint8Array(
        addressBytes.length + amountBytes.length
      );
      concatenatedBytes.set(addressBytes);
      concatenatedBytes.set(amountBytes, addressBytes.length);
      
      // Compute Keccak256 hash of concatenated bytes
      const hash = ethers.keccak256(concatenatedBytes);
      return hash;
    });

    const merkleTree = new MerkleTree(buffers, keccak256, {
      sort: false,
      // isBitcoinTree: false,
      hashLeaves: false,
      sortLeaves: false,
      sortPairs: false,
    });

    const root = merkleTree.getHexRoot();

    console.log("root hash", root);

    const proofs: Record<string, { amount: string; proofs: string[] }> = {};

    let totalAmount = 0n;

    blocks.forEach((block, index) => {
      const proof = merkleTree.getHexProof(buffers[index]);

      proofs[block.address] = {
        amount: block.amount,
        proofs: proof,
      };

      totalAmount = totalAmount + BigInt(block.amount);
    });

    console.log("Total amount:", totalAmount);

    const outputFile = `output_${totalAmount}_${root}.json`;

    fs.writeFileSync(outputFile, JSON.stringify(proofs));

    console.log(`Wrote data to ${outputFile}`);
  });
