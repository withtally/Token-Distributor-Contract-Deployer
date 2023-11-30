# Token Distributor Contract Deployer

![Banner](resources/banner.png)

Tally Token Distributor is part of the suite of tools and services Tally has at its disposal. For more information see the [Tally Docs](https://docs.tally.xyz/premium-features/dao-launcher).

## 📗 Overview

This repo provides tasks and scripts to easily deploy and test a Token Distributor smart contract on Ethereum networks. 

The Token Distributor facilitates distributing ERC20 tokens via Merkle proofs during a specified claim period. Users can define custom allocation logic and generate proof data.

`pnpm install`

`pnpm clean`

`pnpm test`

`npx hardhat compile`

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


### Generating Merkle Tree

To generate the merkle tree we will need a csv with the following format:

```csv
0x64ff820bbD2947B2f2D4355D4852F17eb0156D9A,10000
0x64ff820bbD2947B2f2D4355D4852F17eb0156D9B,12000
```

- accounts addresses to the left, and token quantities to the right
- you have to consider that the quantity must have the decimals in accord to your token contract
- our script reads it row by row
- so if you have 18 decimals it should be something like:

```csv
  0x2a9e4c022d26d3277fdb60f36779142e1d53e03d,100000000000000000000
  0x34f5a5e655a1accbda3c584f83cdc03d97b19983,100000000000000000000
  0x42022c4c5b185cc871c898e729d765e26754bf03,100000000000000000000
  0x47af38230614fca9127bf6e95a3e602075f532d2,100000000000000000000
  0x54691741f6451f4eae797bd365a17b45ece418f3,100000000000000000000
  0xa5a3ee1f3e04bf47d246bd778127a557ed13d87d,100000000000000000000
  0xb546fb9f4db1cfff7cde73bc97ad426a4ff94fd4,100000000000000000000
```

After you already have the .csv file as stated above, you will need to run it this way:

```bash
npx hardhat tree 
  --csv /path/to/file

# Example output:
Merkle Tree
root hash 0x043cda8ef0ba380f54f4123c83d044dd7cdcd4a8f6f7fdb6af940a6805c4ba84
Total amount: BigNumber { value: "22000" }
Wrote data to output_22000_0x043cda8ef0ba380f54f4123c83d044dd7cdcd4a8f6f7fdb6af940a6805c4ba84.json
```

We at tally will process the output file in the BE, for our [DAO Launcher](https://docs.tally.xyz/premium-features/dao-launcher)


#### Merkle Output
Example how it looks like:

```json
{
  "0xb1040D3ce131b3204E5229C80a8d5Ae271B2ef09": {
    "amount": "100000000000000000000",
    "proofs": [
      "0xdc73020d35d4038876346b675ba8ed96b5ff70eaf0447ad6e151b7f2c03d756e",
      "0xd672039d4528e62d9b2ec18dcac8ad63433623cab1748094ab2222e27039416d",
      "0x02e243d9684ffb3fe4a70ea7cc3262ba2e97252cfae4d2f5c2d89c6a94eeee45",
      "0xcb3d7aef30412ebba3b98168617cd4124ef538c38e2f3e10cdf1524cbf6265f8",
      "0x08ceb8964833500c1cbfd779f89461af44b04660682e6499f706c4de0b05fcd7",
      "0xce6f98d40bc9a04b26b418d05b81fd0304f7a024ac4f2b0e1127e6c48c3ab2b5",
      "0x22ca8b5a233588f420eb5bb6a6bed360ec26d830355ce3f20e6875c465298ac2"
    ]
  },
  ...
}
```

- you can also check an example at files folder.

#### Changing the merkle tree script

Right now the OZ Tree generator does not match what we need on tally so I changed it to a modified version of the generator, to use it you need to link it locally.

```bash
git clone https://github.com/withtally/merkle-tree
cd merkle-tree
npm link
cd -
pnpm link ./merkle-tree # or the path where you put it
pnpm test # should work.
```

This will be changed to a published package as soon as we deploy it.

### Deploying 

⚠️ the token contract must have been deployed previously.

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
- `token` is the address of a contract which implements ERC20,ERC20Votes.
- if you used our merkle tree generator you will find `total` and `root` in the file name. 

#### Validating contract

After running the task to deploy the contract it will print in your terminal a command line in which you can copy and paste in terminal if you provide your etherscan API KEY in .env file you will be able to validate the contracts.

```bash
    # it will also create a file contracts.out where you will have information about your contract
    # and a spare npx hardhat verify command that will help you verify your contract if you forgot previously.
    Thu Nov 23 2023 17:52:12 GMT-0300 (Brasilia Standard Time)
    Token contract deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3 - hardhat - block number: 1
    npx hardhat verify --network hardhat 0x5FbDB2315678afecb367f032d93F642f64180aa3 "0x5491ccc79ff3c51dc66717d3dfc3affe977e218763db87d261adc29580fdfbf8" "0x22d953bc460246199a02A4c6C2dAA929335645d0" 13700000000000000000000 1700782677 1706023862 0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE
```
### Testing

To run the tests you can:

```
npx hardhat test
```

or 

```
pnpm test
```

-------

## 🚨 Disclaimer

Tally is not responsible for funds or contracts deployed with this tool. Intended for internal testing only.

## Contributions

Contributions are welcome! See the [contributing guidelines](CONTRIBUTING.md) to get started.