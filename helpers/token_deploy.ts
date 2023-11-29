// import type { ethers } from "ethers";

/**
 * Token
 * 
 * @param signer Signer for the transaction.
 * @returns 
 */
const token = async (
    signer: any,
    ethers: any,
    gas: string = "30000000"
) => {
    // We get the contract to deploy
    const Token = await ethers.getContractFactory("MyERC20");

    const token = await Token.connect(signer).deploy(
        { gasLimit: gas } // Pass the gas limit value as an option
    );

    // await deploy and get block number
    await token.waitForDeployment();
    return token;
};

export {
    token,
};
