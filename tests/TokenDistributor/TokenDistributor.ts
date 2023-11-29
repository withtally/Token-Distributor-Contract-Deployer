import { ethers } from "hardhat";
import { expect } from "chai";

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import type { Signers } from "../types";
import { shouldBehaveLikeTD } from "./TokenDistributor.behavior";
import { deployTokenDistributorFixture, deployTokenFixture } from "./TokenDistributor.fixture";
import * as TDParameters from "./TokenDistributor.param";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;

  });

  describe("TokenDistributor", function () {

    before(async function () {

      this.signers = {} as Signers;
  
      const signers = await ethers.getSigners();
      this.signers.admin = signers[0];

      this.root = TDParameters.root;
      this.totalClaimable = TDParameters.totalClaimable;
      this.claimPeriodStart = TDParameters.claimPeriodStart;
      this.claimPeriodEnd = TDParameters.claimPeriodEnd;
      this.delegateTo = TDParameters.delegateTo;
  
      this.loadFixture = loadFixture;
    });
  
    beforeEach(async function () {

      const { token } = await this.loadFixture(deployTokenFixture);
      this.token = token;
      
      // Could not use this.loadFixture(deployTokenDistributorFixture) here
      // const { tokenDistributor } = await this.loadFixture(deployTokenDistributorFixture)
      const { tokenDistributor } = await deployTokenDistributorFixture(await token.getAddress());
      this.tokenDistributor = tokenDistributor;
    });
  
    shouldBehaveLikeTD();
  });

});

