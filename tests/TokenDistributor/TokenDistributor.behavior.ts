import { ethers } from "hardhat";
import { expect } from "chai";
import hre from "hardhat";

// import json from files

import * as TDParameters from "./TokenDistributor.param";
import { signDelegateTransaction } from "../../helpers/sign";
import type { TokenDistributor } from "../../types/contracts/TokenDistributor";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deployTokenFixture } from "./TokenDistributor.fixture";

export async function shouldBehaveLikeTD(): Promise<void> {
  it("should initialize the contract correctly", async function () {
    expect(await this.tokenDistributor.root()).to.equal(this.root);
    expect(await this.tokenDistributor.token()).to.equal(
      await this.token.getAddress()
    );
    expect(await this.tokenDistributor.totalClaimable()).to.equal(
      this.totalClaimable
    );
    expect(await this.tokenDistributor.claimPeriodStart()).to.equal(
      this.claimPeriodStart
    );
    expect(await this.tokenDistributor.claimPeriodEnd()).to.equal(
      this.claimPeriodEnd
    );
  });

  it("token distributor claim should work", async function () {
    await hre.network.provider.send("evm_increaseTime", [2]);
    await hre.network.provider.send("evm_mine");
    const pubKey = this.signers.admin.address;
    const json = TDParameters.json;

    await expect(
      this.tokenDistributor
        .connect(this.signers.admin)
        .claim(json[pubKey].proofs, json[pubKey].amount)
    ).to.emit(this.tokenDistributor, "Claimed")
      .withArgs(
        pubKey,
        json[pubKey].amount
        // 0
      );

    // check total amount decreases.
    expect(await this.tokenDistributor.totalClaimable()).to.equal(
      (BigInt(this.totalClaimable) - BigInt(json[pubKey].amount))
    );
  });

  it("should revert because it can only claim once", async function () {
    await hre.network.provider.send("evm_increaseTime", [2]);
    await hre.network.provider.send("evm_mine");
    const pubKey = this.signers.admin.address;
    const json = TDParameters.json;

    await expect(
      this.tokenDistributor
        .connect(this.signers.admin)
        .claim(json[pubKey].proofs, json[pubKey].amount)
    ).to.emit(this.tokenDistributor, "Claimed")
      .withArgs(
        pubKey,
        json[pubKey].amount
        // 0
      );

    await expect(
      this.tokenDistributor
        .connect(this.signers.admin)
        .claim(json[pubKey].proofs, json[pubKey].amount)
    ).to.revertedWithCustomError(this.tokenDistributor, "TokenDistributor_AlreadyClaimed");
  });

  it("claimAndDelegate should work", async function () {
    await hre.network.provider.send("evm_increaseTime", [2]);
    await hre.network.provider.send("evm_mine");
    // const erc20 = getErc20(tokenAddress, signer)
    const erc20 = await this.token;
    const json = TDParameters.json;

    const fromAddress = await this.signers.admin.getAddress();
    const nonce = await erc20.nonces(fromAddress);

    const expiry = Math.floor(Date.now() / 1000) + 60 * 60 * 24; // 24 hours

    // get chainID on hardhat test
    const chainId = hre.network.config.chainId;

    const signature = await signDelegateTransaction({
      contractAddress: await erc20.getAddress(),
      contractName: await erc20.name(),
      delegateeAddress: fromAddress,
      chainId: chainId ? chainId : 31337,
      nonce,
      expiry,
      signer: this.signers.admin,
    });

    const { v, r, s } = ethers.Signature.from(signature);
    await expect(
      this.tokenDistributor
        .connect(this.signers.admin)
        .claimAndDelegate(
          json[fromAddress].proofs,
          json[fromAddress].amount,
          fromAddress,
          expiry,
          v,
          r,
          s
        )
    )
      .to.emit(this.tokenDistributor, "Claimed")
      .withArgs(
        fromAddress,
        json[fromAddress].amount
        // 0
      );
  });

  it("should emit correct event when sweep works", async function () {
    const sweepReceiver = await this.signers.admin.getAddress();

    // Advance the chain in time by 1 day (86400 seconds) and some seconds.
    await hre.network.provider.send("evm_increaseTime", [86500]);
    await hre.network.provider.send("evm_mine");

    await expect(
      this.tokenDistributor.connect(this.signers.admin).sweep(sweepReceiver)
    ).to.emit(this.tokenDistributor, "Swept");
  });

  it("revert when claiming 0", async function () {
    await hre.network.provider.send("evm_increaseTime", [2]);
    await hre.network.provider.send("evm_mine");
    const pubKey = this.signers.admin.address;
    const json = TDParameters.json;

    await expect(
      this.tokenDistributor
        .connect(this.signers.admin)
        .claim(json[pubKey].proofs, 0)
    ).to.reverted;
  });

  it("should revert when sweep is outside time range permited", async function () {
    const sweepReceiver = await this.signers.admin.getAddress();

    await expect(
      this.tokenDistributor.connect(this.signers.admin).sweep(sweepReceiver)
    ).to.revertedWithCustomError(
      this.tokenDistributor,
      "TokenDistributor_ClaimPeriodNotEnded"
    );
  });

  it("should emit correct event when withdrawn works", async function () {
    // admin can withdrawn any amount
    const receiver = await this.signers.admin.getAddress();
    const MyERC20 = await ethers.getContractFactory("MyERC20");

    await expect(
      this.tokenDistributor.connect(this.signers.admin).withdraw(receiver, 100)
    )
      .to.emit(this.tokenDistributor, "Withdrawn")
      .withArgs(receiver, 100);
  });

  it("should emit revert when withdrawning more then sufficient balance", async function () {
    // admin can withdrawn any amount
    const receiver = await this.signers.admin.getAddress();
    await expect(
      this.tokenDistributor
        .connect(this.signers.admin)
        .withdraw(receiver, TDParameters.totalClaimable + 1)
    ).to.revertedWithCustomError(this.token, "ERC20InsufficientBalance");
  });

  describe("Unauthorized", function () {
    it("should revert when unauthorized address calls sweep", async function () {
      const unauthorizedAddress = this.signers.notAuthorized.getAddress();
      await expect(
        this.tokenDistributor
          .connect(this.signers.notAuthorized)
          .sweep(unauthorizedAddress)
      ).to.be.revertedWithCustomError(this.tokenDistributor, "Unauthorized");
    });

    it("should revert when unauthorized address calls withdraw", async function () {
      const unauthorizedAddress = this.signers.notAuthorized.getAddress();

      await expect(
        this.tokenDistributor
          .connect(this.signers.notAuthorized)
          .withdraw(unauthorizedAddress, 10000000000n)
      ).to.be.revertedWithCustomError(this.tokenDistributor, "Unauthorized");
    });
  });
}

export function shouldNotDeploy(): void {
  describe("Should not deploy correctly", async function () {
    it("should revert when initializing the contract incorrectly on start end periods", async function () {
      this.loadFixture = loadFixture;

      const signers = await ethers.getSigners();
      const admin = signers[0];
      const { token } = await this.loadFixture(deployTokenFixture);
      this.token = token;

      this.root = TDParameters.root;
      this.totalClaimable = TDParameters.totalClaimable;
      this.claimPeriodStart = TDParameters.claimPeriodStart;
      this.claimPeriodEnd = TDParameters.claimPeriodStart;

      const TokenDistributor = await ethers.getContractFactory(
        "TokenDistributor"
      );
      await expect(
        TokenDistributor.connect(admin).deploy(
          TDParameters.root,
          token,
          TDParameters.totalClaimable,
          TDParameters.claimPeriodStart,
          TDParameters.claimPeriodStart,
          admin.address
        )
      ).to.be.revertedWithCustomError(TokenDistributor, "NotGreaterThan");
    });

    it("should revert when initializing the contract incorrectly totalClaimable as 0", async function () {
      this.loadFixture = loadFixture;

      const signers = await ethers.getSigners();
      const admin = signers[0];
      const { token } = await this.loadFixture(deployTokenFixture);
      this.token = token;

      this.root = TDParameters.root;
      this.totalClaimable = TDParameters.totalClaimable;
      this.claimPeriodStart = TDParameters.claimPeriodStart;
      this.claimPeriodEnd = TDParameters.claimPeriodStart;

      const TokenDistributor = await ethers.getContractFactory(
        "TokenDistributor"
      );
      await expect(
        TokenDistributor.connect(admin).deploy(
          TDParameters.root,
          token,
          0,
          TDParameters.claimPeriodStart,
          TDParameters.claimPeriodStart,
          admin.address
        )
      ).to.be.revertedWithCustomError(TokenDistributor, "NullAmount");
    });

    it("should revert when initializing the contract incorrectly totalClaimable is out of bounds", async function () {
      this.loadFixture = loadFixture;

      const signers = await ethers.getSigners();
      const admin = signers[0];
      const { token } = await this.loadFixture(deployTokenFixture);
      this.token = token;

      this.root = TDParameters.root;
      this.totalClaimable = TDParameters.totalClaimable;
      this.claimPeriodStart = TDParameters.claimPeriodStart;
      this.claimPeriodEnd = TDParameters.claimPeriodStart;

      const TokenDistributor = await ethers.getContractFactory(
        "TokenDistributor"
      );

      try {
        await TokenDistributor.connect(admin).deploy(
          TDParameters.root,
          token,
          115792089237316195423570985008687907853269984665640564039457584007913129639938n,
          TDParameters.claimPeriodStart,
          TDParameters.claimPeriodStart,
          admin.address
        );

        expect.fail("Expected an error, but none was thrown");
      } catch (error) {
        expect(error.code).to.equal("INVALID_ARGUMENT");
        expect(error.argument).to.equal("_totalClaimable");
        expect(error.value.toString()).to.equal(
          "115792089237316195423570985008687907853269984665640564039457584007913129639938"
        );
        expect(error.shortMessage).to.equal("value out-of-bounds");
      }
    });
  });
}
