import { expect } from "chai";
import { ethers } from "ethers";
// import json from files
import json from '../../files/example_output_13800000000000000000000_0xe0411005ab8b1a495bd3804b43874ef67471fd63c00a73e817c5d6e42e551738.json';


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

  it("true is true"), async function () {
    expect(true).to.equal(true);
  }

  it("merkle tree verify works"), async function () {

	// Account add to merkle tree
	// Account #15: 0xcd3B766CCDd6AE721141F452C550Ca635964ce71 (10000 ETH)
	// Private Key: 0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61
	// Now you can use the `signer` otherAccount to interact with the Ethereum network
	const privateKey = "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61";
  const pubKey = "0xcd3B766CCDd6AE721141F452C550Ca635964ce71";
	const wallet = new ethers.Wallet(privateKey);
	const otherAccount = wallet.connect(null); // Replace `provider` with your Ethereum provider
	
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
      this.tokenDistributor.connect(otherAccount).
      claim(
        json[pubKey].proofs,
        json[pubKey].amount,
      )
    ).to.emit(this.tokenDistributor, 'Claimed').
    withArgs(
      otherAccount.address,
      json['0xcd3B766CCDd6AE721141F452C550Ca635964ce71'].amount,
    );

  }

}
