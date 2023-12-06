import { ethers } from "hardhat";
import { expect } from "chai";

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import type { Signers } from "../types";
import { shouldBehaveLikeTD,shouldNotDeploy } from "./TokenDistributor.behavior";
import {
  deployTokenDistributorFixture,
  deployTokenFixture,
} from "./TokenDistributor.fixture";
import * as TDParameters from "./TokenDistributor.param";

describe("TokenDistributor", async function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.notAuthorized = signers[1];

    this.root = TDParameters.root;
    this.totalClaimable = TDParameters.totalClaimable;
    this.claimPeriodStart = TDParameters.claimPeriodStart;
    this.claimPeriodEnd = TDParameters.claimPeriodEnd;

    
    // this.delegateTo = TDParameters.delegateTo;

    this.loadFixture = loadFixture;
  });

  beforeEach(async function () {
    const { token } = await this.loadFixture(deployTokenFixture);
    this.token = token;

    // Could not use this.loadFixture(deployTokenDistributorFixture) here
    // const { tokenDistributor } = await this.loadFixture(deployTokenDistributorFixture)
    const { tokenDistributor } = await deployTokenDistributorFixture(
      await token.getAddress()
    );
    this.tokenDistributor = tokenDistributor;

    const transaction = await token.transfer(
      await this.tokenDistributor.getAddress(),
      this.totalClaimable
    );
    const receipt = await transaction.wait();
    expect(receipt?.status).to.equal(1);
  });

  shouldBehaveLikeTD();

  shouldNotDeploy();
});

