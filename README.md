# Token Distributor Contract Deployer

![Banner](resources/banner.png)

The Tally Token Distributor is a component within Tally's suite of tools and services. For detailed information, refer to the [Tally Docs](https://docs.tally.xyz/premium-features/dao-launcher).

## 📗 Overview

This repository contains tasks and scripts for effortless deployment and testing of a Token Distributor smart contract on Ethereum networks.

The Token Distributor enables the distribution of ERC20 tokens through Merkle proofs during a specified claim period. Users can define custom allocation logic and generate proof data.

```bash
pnpm install
pnpm clean
pnpm test
npx hardhat compile
```

**Features:**

✅ Simple deployment script for the Token Distributor

✅ Generation of Merkle tree proof data from CSV

✅ Token claiming through contract integration

## Using it with Tally

0. Deploy your token contract beforehand; refer to the [docs](https://docs.tally.xyz/user-guides/tally-contract-compatibility/tokens-erc-20-and-nfts).
1. Create your list as outlined [here](#create-your-list).
2. Install the local library using the provided [instructions](#we-changed-the-merkle-tree-script).
3. Generate the [tree](#generate-the-merkle-tree).
4. Deploy the token distributor contract using the [deploy task](#deploying).
5. Validate your contract as explained [here](#validating-contract).
6. Send the correct amount of tokens to the Distributor.
7. Share the generated .json file from step 3, along with the addresses for the token distributor and your token, to Tally.

## 💻 Getting Started

Ensure the token contract is deployed before using the hardhat tasks, owing to a delegate method within the vanilla Token Distributor.

For the hardhat tasks in this repository to function, copy .env.example and create a .env. Populate the .env with your nodes and apikeys (not all fields need to be filled, only those relevant to your chosen network and explorer).

### Merkle Tree Generator

#### Create your list

To generate the Merkle tree, you need a CSV in the following format:

```csv
0x64ff820bbD2947B2f2D4355D4852F17eb0156D9A,10000
0x64ff820bbD2947B2f2D4355D4852F17eb0156D9B,12000
```

- Account addresses on the left, token quantities on the right.
- Ensure the quantity aligns with the decimals of your token contract.
- If you have 18 decimals, the CSV should look like:

```csv
  0x2a9e4c022d26d3277fdb60f36779142e1d53e03d,100000000000000000000
  0x34f5a5e655a1accbda3c584f83cdc03d97b19983,100000000000000000000
  0x47af38230614fca9127bf6e95a3e602075f532d2,100000000000000000000
  0x54691741f6451f4eae797bd365a17b45ece418f3,100000000000000000000
  ...
```

#### Generate the Merkle Tree

After preparing the CSV file, run the following command:

```bash
npx hardhat tree 
  --csv /path/to/file

# Example output:
Merkle Tree
root hash 0x043cda8ef0ba380f54f4123c83d044dd7cdcd4a8f6f7fdb6af940a6805c4ba84
Total amount: BigNumber { value: "22000" }
Wrote data to output_22000_0x043cda8ef0ba380f54f4123c83d044dd7cdcd4a8f6f7fdb6af940a6805c4ba84.json
```

The generated output file will be processed by Tally in the backend for our [DAO Launcher](https://docs.tally.xyz/premium-features/dao-launcher).

#### Merkle Output

Example structure:

```json
{
  "0xb1040D3ce131b3204E5229C80a8d5Ae271B2ef09": {
    "amount": "100000000000000000000",
    "proofs": [
      "0xdc73020d35d4038876346b675ba8ed96b5ff70eaf0447ad6e151b7f2c03d756e",
      "0xd672039d4528e62d9b2ec18dcac8ad63433623cab1748094ab2222e27039416d",
      ...
    ]
  },
  ...
}
```

See the 'files' folder for an example.

#### We changed the Merkle tree ADT lib

The OZ Tree generator doesn't align with Tally's requirements due to leafhashing differences. We modified it accordingly.

Here's the distinction in the leaf hashing method:

```solidity
// bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(alice, 100))));
bytes32 leaf = keccak256(abi.encodePacked(_user, _amount));
```

- In the OZ deployer, the leaf hash is considered as per the commented line in the solidity contract above.
- The Tally token deployer uses the second line for leaf hashing, necessitating the modification in the Merkle tree leaf hashing function.
- We switched from a simple JS keccak to Solidity's keccak packed.

----------

### Deploying 

⚠️ The token contract must have been deployed previously.

Deploy a new Token Distributor contract:

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

- `total`, `start`, `end` are integer timestamps.
- `start` and `end` represent the distribution time period.
- `delegate` is the address to delegate votes to (optional).
- `token` is the address of a contract that implements ERC20, ERC20Votes.
- If you used our Merkle tree generator, you will find `total` and `root` in the file name. 

#### Validating Contract

After running the task to deploy the contract, it will print a command line in your terminal. If you provide your Etherscan API KEY in the .env file, you can use it to validate the contracts.

Example output:

```bash
Thu Nov 23 2023 17:52:12 GMT-0300 (Brasilia Standard Time)
Token contract deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3 - hardhat - block number: 1
npx hardhat verify --network hardhat 0x5FbDB2315678afecb367f032d93F642f64180aa3 "0x5491ccc79ff3c51dc66717d3dfc3affe977e218763db87d261adc29580fdfbf8" "0x22d953bc460246199a02A4c6C2dAA929335645d0" 13700000000000000000000 1700782677 1706023862 0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE
```
-----------

### Claim Tokens

After deploying the token and token distributor, you can claim the tokens with a task to test it:

```bash
npx hardhat claim \
  --distributor 0xADRESS_OF_IT \
  --json JSON_PATH_MERKLE_TREE
```

You can also try claiming and delegating:

```bash
npx hardhat claim_delegate \
  --distributor 0xADRESS_OF_IT \
  --json JSON_PATH_MERKLE_TREE \
  --delegate 0xADDRESS_OF_DELEGATEE #[OPTIONAL; if not used, it will self-delegate]
  
```

----------

### Testing

To run the tests, you can use:

```bash
npx hardhat test
```

or 

```bash
pnpm test
```

You can also check a test flow with tasks [here](files/example_test.md)

-------

## 🚨 Disclaimer

Tally is not responsible for funds or contracts deployed with this tool. It is intended for internal testing purposes only.

## Contributions

Contributions are welcome! Refer to the [contributing guidelines](CONTRIBUTING.md) to get started.