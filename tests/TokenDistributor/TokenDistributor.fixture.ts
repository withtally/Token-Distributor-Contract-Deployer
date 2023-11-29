import { ethers } from "hardhat";

import type { MyERC20 } from "../../typechain-types/contracts/MyERC20";
import type { TokenDistributor } from "../../typechain-types/contracts/TokenDistributor";

export async function deployTokenFixture(): Promise<{ token: MyERC20 }> {
  const signers = await ethers.getSigners();
  const admin = signers[0];
  const MyERC20 = await ethers.getContractFactory("MyERC20");
  const token = await MyERC20.deploy();
  await token.deployed();

  return { token };
}

export async function deployTokenDistributorFixture(): Promise<{
  tokenDistributor: TokenDistributor;
}> {
  const signers = await ethers.getSigners();
  const admin = signers[0];

  const TokenDistributor = await ethers.getContractFactory("TokenDistributor");
  const tokenDistributor = await TokenDistributor.deploy(
    this.root,
    this.token.address,
    this.totalClaimable,
    this.claimPeriodStart,
    this.claimPeriodEnd,
    this.delegateTo
  );
  await tokenDistributor.deployed();

  return { tokenDistributor };
}
