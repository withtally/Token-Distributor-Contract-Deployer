import { ethers } from "hardhat";
import { expect } from "chai";

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import type { Signers } from "../types";
import { shouldBehaveLikeTD } from "./TokenDistributor.behavior";
import { deployTokenDistributorFixture, deployTokenFixture } from "./TokenDistributor.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;
  });

  describe("TokenDistributor", function () {
  
    const root = "0xfa2d88c3367862017f5e74924545e92cb45db4956e35117f1b4bb2a31d35e3fa";
    const totalClaimable = "13700000000000000000000";
    const claimPeriodStart = Math.floor(Date.now() / 1000); // now
    const claimPeriodEnd = claimPeriodStart + 86400; // 24 hours after claimPeriodStart
    const delegateTo = ethers.ZeroAddress;
  
    beforeEach(async function () {

      this.root = root;
      this.totalClaimable = totalClaimable;
      this.claimPeriodStart = claimPeriodStart;
      this.claimPeriodEnd = claimPeriodEnd;
      this.delegateTo = delegateTo;

      const { token } = await this.loadFixture(deployTokenFixture);
      this.token = token;
      
      const { tokenDistributor } = await this.loadFixture(deployTokenDistributorFixture);
      this.tokenDistributor = tokenDistributor;
    });
  
    shouldBehaveLikeTD();
  });

});

