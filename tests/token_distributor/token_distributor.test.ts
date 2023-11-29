import { ethers } from "hardhat";
import { expect } from "chai";

describe("TokenDistributor", function () {
  let tokenDistributor;
  let token;

  const root = ethers.utils.formatBytes32String("root");
  const totalClaimable = ethers.utils.parseEther("100");
  const claimPeriodStart = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now
  const claimPeriodEnd = claimPeriodStart + 86400; // 24 hours after claimPeriodStart
  const delegateTo = ethers.constants.AddressZero;

  beforeEach(async function () {
    const MyERC20 = await ethers.getContractFactory("MyERC20");
    token = await MyERC20.deploy();
    await token.deployed();
    
    const TokenDistributor = await ethers.getContractFactory("TokenDistributor");
    tokenDistributor = await TokenDistributor.deploy(
      root,
      token.address,
      totalClaimable,
      claimPeriodStart,
      claimPeriodEnd,
      delegateTo
    );
  });

  it("should initialize the contract correctly", async function () {
    expect(await tokenDistributor.root()).to.equal(root);
    expect(await tokenDistributor.token()).to.equal(token.address);
    expect(await tokenDistributor.totalClaimable()).to.equal(totalClaimable);
    expect(await tokenDistributor.claimPeriodStart()).to.equal(claimPeriodStart);
    expect(await tokenDistributor.claimPeriodEnd()).to.equal(claimPeriodEnd);
    expect(await tokenDistributor.delegateTo()).to.equal(delegateTo);
  });
});