![Theme image for repository](resources/banner.png)
Token Distributor Contract Deployer
======================

Task to deploy a Token distributor:

```bash
npx hardhat tokenDistributor --network hardhat --root 0xROOT_OF_MERKLE_TREE \
    --token OxDELEGATE_ADDRESS \
    --total 1000000 \
    --start 1000 \
    --end 2000 \
    --delegate OxDELEGATE_ADDRESS

# total, start, end are integers
# start and end represent the block number
# delegate is optional
```