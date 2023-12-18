
// import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { StandardMerkleTree } from "@tallyxyz/merkle-tree";

import { readCSV } from "../helpers/merkle_tree";
import fs from "fs";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("tree", "Generates merkle proofs from CSV")
  .addParam("csv", "Path to CSV file")
  .setAction(async function (taskArgs: TaskArguments) {
    try {
      console.log("\nMerkle Tree");

      const blocks = await readCSV(taskArgs.csv);

      const values = blocks.map((b) => [b.address, b.amount]);

      const tree = StandardMerkleTree.of(values, ["address", "uint256"]);

      const root = tree.root;
      console.log("Root hash", root);

      const proofs: Record<string, { amount: string; proofs: string[] }> = {};

      let totalAmount = 0n;

      for (const [i, v] of tree.entries()) {
        const proof = tree.getProof(i);
        const [address, amount] = v;

        proofs[address] = {
          amount: amount,
          proofs: proof,
        };

        totalAmount += BigInt(amount);
      }

      console.log("Total amount:", totalAmount);

      const outputFile = `output_${totalAmount}_${root}.json`;

      fs.writeFileSync(outputFile, JSON.stringify(proofs));
      // fs.writeFileSync("tree.json", JSON.stringify(tree.dump()));

      console.log(`Wrote data to ${outputFile}`);
    } catch (error:any) {
      console.error("Error:", error.message);
      process.exit(1);
    }
  });
