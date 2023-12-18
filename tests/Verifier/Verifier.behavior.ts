import { expect } from "chai";
import { ethers } from "ethers";
// import json from files
import * as TDParameters from "../TokenDistributor/TokenDistributor.param";
import { standardLeafHash as hashingFunction } from "@tallyxyz/merkle-tree";

export function shouldVerifyCorrectly(): void {

  it("merkle tree verify", async function () {

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
      this.verifier.connect(this.signers.admin)
      .verify(
        json[pubKey].proofs,
        pubKey, 
        json[pubKey].amount
      )
    ).to.not.reverted;
  });

  it("generate leaf",async function(){

    const leaf = await this.verifier.generateLeaf(this.signers.admin.address,"1000000000000000000")
    
    const defaultAbiCoder = ethers.AbiCoder.defaultAbiCoder()
    // values, ["address", "uint256"]
    const value = [this.signers.admin.address,"1000000000000000000"]
    const types = ["address", "uint256"]

    // testing to see the correct way to keccak and pack the data to apply to our merkle tree generator.

    // const solidityLeaf = ethers.solidityPackedKeccak256(types, value)
    const solidityLeafBytes = hashingFunction(value, types)
    const solidityLeaf = '0x'+Buffer.from(solidityLeafBytes).toString('hex');

    expect(leaf).to.equal(solidityLeaf)
  })
}