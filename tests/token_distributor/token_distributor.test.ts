import { ethers } from "hardhat";
import { expect } from "chai";

describe("TokenDistributor", function () {
  let tokenDistributor;
  let token;

  // _root: string,
  // _token: string,
  // _totalClaimable: string,
  // _claimPeriodStart: number,
  // _claimPeriodEnd: number,
  // example_output_13700000000000000000000_0xfa2d88c3367862017f5e74924545e92cb45db4956e35117f1b4bb2a31d35e3fa.json
  // _delegateTo: string,
  const root = "0xfa2d88c3367862017f5e74924545e92cb45db4956e35117f1b4bb2a31d35e3fa";
  const totalClaimable = "13700000000000000000000";
  const claimPeriodStart = Math.floor(Date.now() / 1000); // now
  const claimPeriodEnd = claimPeriodStart + 86400; // 24 hours after claimPeriodStart
  const delegateTo = ethers.ZeroAddress;

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