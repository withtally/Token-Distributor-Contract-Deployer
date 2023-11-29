import fs from "fs";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import { token } from "../helpers/token_deploy";

task("token", "Deploys a token.")
  .setAction(
    async (taskArgs: TaskArguments, { ethers,network }) => {
      console.log("Deploying an sample Token contract for local testing");

      // const signer = await hre.ethers.getSigner();
      const signers = await ethers.getSigners();
      const signer = signers[0];

      // HARDHAT LOG
      console.log(
        `network:\x1B[36m${network.name}\x1B[37m`,
        `\nsigner address:\x1B[33m${signer.address}\x1B[37m\n`
      );

      const Token = await token(
        signer,
        ethers
      );

      const tdBlock = await ethers.provider.getBlock("latest");

      // DEPLOYMENT LOGS
      console.log(
        `Token Distributor deployed to:\x1B[33m`,
        await Token.getAddress(),
        "\x1B[37m"
      );
      console.log(`Creation block number:`, tdBlock?.number);

      // verify cli
      const verify_str =
        `npx hardhat verify ` +
        `--network ${network.name} ` +
        `${await Token.getAddress()} `
      console.log("\n" + verify_str);

      // save it to a file to make sure the user doesn't lose it.
      fs.appendFileSync(
        "contracts.out",
        `${new Date()}\nToken contract deployed at: ${
          await Token.getAddress()
        }` +
          ` - ${network.name} - block number: ${tdBlock?.number}\n${verify_str}\n\n`
      );

      fs.appendFileSync(
        "contracts.out",
        `\n\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ \n\n`
      );
    }
  );
