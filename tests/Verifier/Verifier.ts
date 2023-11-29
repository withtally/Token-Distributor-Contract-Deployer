import { ethers } from "hardhat";
import { expect } from "chai";

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

import type { Signers } from "../types";

import * as TDParameters from "../TokenDistributor/TokenDistributor.param";
import {
    deployVerifierFixture,
  } from "./Verifier.fixture";
import { shouldVerifyCorrectly } from "./Verifier.behavior";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers = await ethers.getSigners();
    this.signers.admin = signers[0];

    this.loadFixture = loadFixture;
  });

  describe("Verifier", async function () {
    before(async function () {
      this.signers = {} as Signers;

      const signers = await ethers.getSigners();
      this.signers.admin = signers[0];

      this.root = TDParameters.root;

      this.loadFixture = loadFixture;
    });

    beforeEach(async function () {
        const { verifier } = await this.loadFixture(deployVerifierFixture);
        this.verifier = verifier;
    });

    shouldVerifyCorrectly();
  });
});
