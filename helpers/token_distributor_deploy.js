
/**
 * TokenDistributor
 * 
 * @param {*} _root, The root of the Merkle tree. It's a bytes 32 hash: 0xd5b13e5d2412661bc4ffbfaea0e5e3dfc8d8ee2587404490e94d5280e1a739d3
 * @param {*} _token, The token address, e.g: 0x5FbDB2315678afecb367f032d93F642f64180aa3 
 * @param {*} _totalClaimable , total amount claimable, e.g: 100000000000000000000 ( a number )
 * @param {*} _claimPeriodStart , claim period start, e.g: 1625097600 ( an integer )
 * @param {*} _claimPeriodEnd , claim period end, e.g: 1625097600 ( an integer )
 * @param {*} _delegateTo , ethereum address who will be delegated to. e.g: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
 * @param {*} signer , signer for the transaction.
 * @returns 
 */
const tokenDistributor = async (
    _root,
    _token,
    _totalClaimable,
    _claimPeriodStart,
    _claimPeriodEnd,
    _delegateTo,
    signer
) => {
    // We get the contract to deploy
    const TokenDistributor = await hre.ethers.getContractFactory("TokenDistributor");

    // constructor( bytes32 _root, ERC20Votes _token, uint256 _totalClaimable, uint256 _claimPeriodStart, uint256 _claimPeriodEnd, address _delegateTo ) 
    const tokenDistributor = await TokenDistributor.connect(signer).deploy(
        _root,
        _token,
        _totalClaimable,
        _claimPeriodStart,
        _claimPeriodEnd,
        _delegateTo,
    );

    // await deploy and get block number
    await tokenDistributor.deployed();
    return tokenDistributor
}


module.exports = {
    tokenDistributor,
}