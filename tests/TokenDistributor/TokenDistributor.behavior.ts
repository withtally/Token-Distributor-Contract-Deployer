import { expect } from "chai";
import { ethers } from "ethers";
// import json from files
import * as TDParameters from "./TokenDistributor.param";

export function shouldBehaveLikeTD(): void {
  
  it("should initialize the contract correctly", async function () {
    expect(await this.tokenDistributor.root()).to.equal(this.root);
    expect(await this.tokenDistributor.token()).to.equal(await this.token.getAddress());
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

  it("merkle tree verify works", async function () {

    const pubKey = this.signers.admin.address;
    const json = TDParameters.json;
    
    /**
      @notice Claims tokens  
      @param _proof Merkle proof data
      @param _amount Amount to claim
    */
    // function claim(bytes32[] calldata _proof, uint256 _amount) external {
    // 	_claim(_proof, _amount);
    // }
    //  emit Claimed({_user: msg.sender, _amount: _amount});
    await expect(
      this.tokenDistributor.connect(this.signers.admin)
      .claim(
        json[pubKey].proofs, 
        json[pubKey].amount
      )
    ).to.emit(this.tokenDistributor, "Claimed")
    .withArgs(
      pubKey,
      json[pubKey].amount
      // 0
    );
  });
}