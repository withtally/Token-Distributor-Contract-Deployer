import { MerkleTree } from "merkletreejs";
import  keccak256 from "keccak256";
import readCSV  from "../helpers/merkle_tree";
import fs from "fs";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { task } from "hardhat/config";


task("tree", "Generates merkle proofs from CSV")
  .addParam("csv", "Path to CSV file")
  .setAction(async (taskArgs: { csv: string },hre: HardhatRuntimeEnvironment) => {
    console.log("\nMerkle Tree");

    const blocks = await readCSV(taskArgs.csv);

    // Convert blocks
    const buffers = blocks.map((b) => {
      const addressBytes = hre.ethers.utils.arrayify(b.address); // Convert address to bytes
      const amountBytes = hre.ethers.BigNumber.from(b.amount).toHexString();

      // Concatenate address and amount bytes
      const concatenatedBytes = hre.ethers.utils.hexConcat([
        addressBytes,
        amountBytes,
      ]);

      // Compute Keccak256 hash of concatenated bytes
      const hash = hre.ethers.utils.keccak256(concatenatedBytes);

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

    let totalAmount = hre.ethers.BigNumber.from("0");

    blocks.forEach((block, index) => {
      const proof = merkleTree.getHexProof(buffers[index]);

      proofs[block.address] = {
        amount: block.amount,
        proofs: proof,
      };

      totalAmount = totalAmount.add(block.amount);
    });

    console.log("Total amount:", totalAmount);

    const outputFile = `output_${totalAmount}_${root}.json`;

    fs.writeFileSync(outputFile, JSON.stringify(proofs));

    console.log(`Wrote data to ${outputFile}`);
  });
