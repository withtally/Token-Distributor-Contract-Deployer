import { expect } from "chai";
import { ethers, AbiCoder } from "ethers";
import hre from "hardhat";

// import json from files
import * as TDParameters from "./TokenDistributor.param";
import { signDelegateTransaction } from "../../helpers/sign";

export function shouldBehaveLikeTD(): void {
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

  it("token distributor claim works", async function () {
    const pubKey = this.signers.admin.address;
    const json = TDParameters.json;

    await expect(
      this.tokenDistributor
        .connect(this.signers.admin)
        .claim(json[pubKey].proofs, json[pubKey].amount)
    )
      .to.emit(this.tokenDistributor, "Claimed")
      .withArgs(
        pubKey,
        json[pubKey].amount
        // 0
      );
  });

  it("claimAndDelegate should work", async function () {
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
}
