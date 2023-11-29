import { expect } from "chai";
import { ethers } from "ethers";

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

  it("merkle tree verify works"), async function () {

	// Account add to merkle tree
	// Account #15: 0xcd3B766CCDd6AE721141F452C550Ca635964ce71 (10000 ETH)
	// Private Key: 0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61
	// Now you can use the `signer` otherAccount to interact with the Ethereum network
	const privateKey = "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61";
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
    expect(await this.tokenDistributor.connect(otherAccount).claim(
		proof,
		amount,
    )).to.equal(true);
  }

}
