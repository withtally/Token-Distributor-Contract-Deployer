import { expect } from "chai";
import { ethers } from "ethers";
// import json from files
import * as TDParameters from "../TokenDistributor/TokenDistributor.param";


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

}