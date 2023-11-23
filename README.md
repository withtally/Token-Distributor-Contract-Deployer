![Theme image for repository](resources/banner.png)

Token Distributor Contract Deployer
======================

### Tally

Token Distributor is part of the suite of tools and service tally has in it's disposal. for more information on it:
https://docs.tally.xyz/premium-features/dao-launcher

### How to use

The token contract must have been deployed previously due to a delegate method inside of vanilla token distributor. `( we may change it in the future )`

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

-------------

Tally is not responsible for funds or contracts deployed with this tool, this is used for internal testing.

-------------
