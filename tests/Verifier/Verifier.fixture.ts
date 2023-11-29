import type { Verifier } from "../../types/contracts/Verifier";
import { ethers } from "hardhat";
import * as TDParameters from "../TokenDistributor/TokenDistributor.param";

export async function deployVerifierFixture(): Promise<{ token: Verifier, }> {
    const signers = await ethers.getSigners();
    const admin = signers[0];
    const Verify = await ethers.getContractFactory("Verifier");
    const verifier = await Verify.connect(admin).deploy(
      TDParameters.root,
    );
    await verifier.waitForDeployment();
  
    return { verifier };
  }