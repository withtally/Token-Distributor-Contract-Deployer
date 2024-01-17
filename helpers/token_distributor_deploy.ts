// import type { ethers } from "ethers";

/**
 * TokenDistributor
 * 
 * @param _root The root of the Merkle tree. It's a bytes 32 hash: 0xd5b13e5d2412661bc4ffbfaea0e5e3dfc8d8ee2587404490e94d5280e1a739d3
 * @param _token The token address, e.g: 0x5FbDB2315678afecb367f032d93F642f64180aa3 
 * @param _totalClaimable Total amount claimable, e.g: 100000000000000000000 (a number)
 * @param _claimPeriodStart Claim period start, e.g: 1625097600 (an integer)
 * @param _claimPeriodEnd Claim period end, e.g: 1625097600 (an integer)
 * @param _delegateTo Ethereum address who will be delegated to, e.g: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
 * @param signer Signer for the transaction.
 * @returns 
 */
const tokenDistributor = async (
    _root: string,
    _token: string,
    _totalClaimable: string,
    _claimPeriodStart: number,
    _claimPeriodEnd: number,
    _delegateTo: string,
    signer: any,
    ethers: any,
    gas: string = "30000000"
) => {

    // We get the contract to deploy
    const TokenDistributor = await ethers.getContractFactory("TokenDistributor");

    // constructor( bytes32 _root, ERC20Votes _token, uint256 _totalClaimable, uint256 _claimPeriodStart, uint256 _claimPeriodEnd, address _delegateTo ) 
    const tokenDistributor = await TokenDistributor.connect(signer).deploy(
        _root,
        _token,
        _totalClaimable,
        _claimPeriodStart,
        _claimPeriodEnd,
        _delegateTo,
        {
            gasLimit: gas,
        } // Pass the gas limit value as an option
    );

    // await deploy and get block number
    await tokenDistributor.waitForDeployment();
    return tokenDistributor;
};

export {
    tokenDistributor,
};
