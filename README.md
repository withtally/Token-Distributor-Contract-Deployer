# Token Distributor Contract Deployer

![Banner](resources/banner.png)

Tally Token Distributor is part of the suite of tools and services Tally has at its disposal. For more information see the [Tally Docs](https://docs.tally.xyz/premium-features/dao-launcher).

## 📗 Overview

This repo provides tasks and scripts to easily deploy and test a Token Distributor smart contract on Ethereum networks. 

The Token Distributor facilitates distributing ERC20 tokens via Merkle proofs during a specified claim period. Users can define custom allocation logic and generate proof data.

**Features:**

✅ Simple deployment script for the Token Distributor  

✅ Generate Merkle tree proof data from CSV  

<!-- ✅ Claim tokens via contract integration   -->

<!-- ✅ Full testing suite demo   -->

## 💻 Getting Started

The token contract must have been deployed previously due to a delegate method inside the vanilla Token Distributor. 

**(We may change delegation logic in the future)**

For the hardhat tasks in this repo to work you have to copy .env.example and create a .env.

Fill the .env with your nodes and apikeys ( you don't need to fill them all just with the network and explorer you pretend to use ).

### Deploying 

Deploy a new TokenDistributor contract:

```bash
npx hardhat tokenDistributor \
  --network hardhat \
  --root 0xROOT_OF_MERKLE_TREE \ 
  --token 0xDELEGATE_ADDRESS
  --total 1000000 \
  --start 1000 \ 
  --end 2000 \
  --delegate 0xDELEGATE_ADDRESS 
```

- `total`, `start`, `end` are integer timestamps
- `start` and `end` represent distribution time period   
- `delegate` is the address to delegate votes to (optional)

### Validating contracts

After running the task to deploy the contract it will print in your terminal a command line in which you can copy and paste in terminal if you provide your etherscan API KEY in .env file you will be able to validate the contracts.

```bash
    # it will also create a file contracts.out where you will have information about your contract
    # and a spare npx hardhat verify command that will help you verify your contract if you forgot previously.
    Thu Nov 23 2023 17:52:12 GMT-0300 (Brasilia Standard Time)
    Token contract deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3 - hardhat - block number: 1
    npx hardhat verify --network hardhat 0x5FbDB2315678afecb367f032d93F642f64180aa3 "0x5491ccc79ff3c51dc66717d3dfc3affe977e218763db87d261adc29580fdfbf8" "0x22d953bc460246199a02A4c6C2dAA929335645d0" 13700000000000000000000 1700782677 1706023862 0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE
```

<!-- ### Testing

Run tests:

```
npx hardhat test
``` -->
-------

## 🚨 Disclaimer

Tally is not responsible for funds or contracts deployed with this tool. Intended for internal testing only.

## Contributions

Contributions are welcome! See the [contributing guidelines](CONTRIBUTING.md) to get started.