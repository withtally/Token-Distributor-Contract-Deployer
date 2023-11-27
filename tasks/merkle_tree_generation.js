const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

const { readCSV } = require("../helpers/merkle_tree");

const fs = require("fs");

task("tree", "Generates merkle proofs from CSV")
  .addParam("csv", "Path to CSV file")
  .setAction(async (taskArgs) => {
    console.log("\nMerkle Tree");
    const blocks = await readCSV(taskArgs.csv);

    // Convert blocks
    const buffers = blocks.map((b) => {
      const addressBytes = ethers.utils.arrayify(b.address); // Convert address to bytes
      const amountBytes = ethers.BigNumber.from(b.amount).toHexString();

      // Concatenate address and amount bytes
      const concatenatedBytes = ethers.utils.hexConcat([
        addressBytes,
        amountBytes,
      ]);

      // Compute Keccak256 hash of concatenated bytes
      const hash = ethers.utils.keccak256(concatenatedBytes);

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

    const proofs = {};

    let totalAmount = ethers.BigNumber.from("0");

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
