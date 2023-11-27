const { MerkleTree } = require("merkletreejs");
// const keccak256 = require("keccak256");

const { readCSV } = require("../helpers/merkle_tree");

const fs = require("fs");

task("tree", "Generates merkle proofs from CSV")
  .addParam("csv", "Path to CSV file")
  .setAction(async (taskArgs) => {
    const blocks = await readCSV(taskArgs.csv);

    // Convert blocks
    const buffers = blocks.map((b) => {
      const addressBytes = ethers.utils.arrayify(b.address); // Convert address to bytes
      const amountBytes = ethers.utils.hexZeroPad(
        ethers.BigNumber.from(b.amount),
        32
      );

      // Concatenate address and amount bytes
      const concatenatedBytes = ethers.utils.concat([
        addressBytes,
        amountBytes,
      ]);

      // Compute Keccak256 hash of concatenated bytes
      const hash = ethers.utils.keccak256(concatenatedBytes);

      return hash;
    });

    const merkleTree = new MerkleTree(buffers, ethers.utils.keccak256, {
      sort: true,
    });

    const root = merkleTree.getHexRoot();

    console.log("Merkle Root", root);

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

    const outputFile = `output_${totalAmount}_${root}.json`;

    fs.writeFileSync(outputFile, JSON.stringify(proofs));

    console.log(`Wrote data to ${outputFile}`);
  });
