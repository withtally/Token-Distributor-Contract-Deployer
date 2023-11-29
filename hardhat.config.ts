
// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-etherscan");

//import dotenv config
import "dotenv/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
// import type { HardhatUserConfig } from "hardhat/config";
// import type { NetworkUserConfig } from "hardhat/types";

// requiring tasks.

import "./tasks/deploy_token_distributor";
import "./tasks/merkle_tree_generation";
import "./tasks/deploy_token";

/* ========== DATA FROM .env ===========*/
// Private key
// Private key
const PRIVATE_KEY = process.env.PRIVATE_KEY

// Ethereum network nodes
const ETHEREUM_URL = process.env.ETHEREUM_URL
const SEPOLIA_URL = process.env.SEPOLIA_URL

// Polygon network nodes
const POLYGON_URL = process.env.POLYGON_URL
const MUMBAI_URL = process.env.MUMBAI_URL

// Optimism network nodes
const OPTIMISM_URL = process.env.OPTIMISM_URL

// Arbitrum network nodes
const ARBITRUM_URL = process.env.ARBITRUM_URL
const ARBITRUM_NOVA_URL = process.env.ARBITRUM_NOVA_URL
const ARBITRUM_SEPOLIA_URL = process.env.ARBITRUM_SEPOLIA_URL

// Etherscan key
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY
const OPT_ETHERSCAN_KEY = process.env.OPT_ETHERSCAN_KEY
const ARBISCAN_KEY = process.env.ARBISCAN_KEY
const config: any = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          metadata: {
            // Not including the metadata hash
            bytecodeHash: "none",
          },
          // Disable the optimizer when debugging
          optimizer: {
            enabled: true,
            runs: 800,
          },
        }
      },
    ],
  },
  etherscan: {
    apiKey: {
      mainnet: ETHERSCAN_KEY,
      sepolia: ETHERSCAN_KEY,
      polygon: POLYGONSCAN_KEY,
      polygonMumbai: POLYGONSCAN_KEY,
      optimisticEthereum: OPT_ETHERSCAN_KEY,
      arbitrumOne: ARBISCAN_KEY,
      arbitrumSepolia: ARBISCAN_KEY,
    },
    customChains: [
      {
        network: "arbitrumGoerli",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      },
      {
        network: "arbitrumSepolia",
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io"
        }
      },
      {
        network: "baseGoerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      },
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      },
      {
        network: "zkevm",
        chainId: 1101,
        urls: {
          apiURL:"https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com"
        }
      },
      {
        network: "scroll-alpha",
        chainId: 534353,
        urls: {
          apiURL: "https://blockscout.scroll.io/api",
          browserURL: "https://blockscout.scroll.io/"
        }
      }
    ]
  },
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61", // Replace with your private key
          balance: "10000000000000000000000", // Replace with the desired balance
        },
        {
          privateKey: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // Replace with your private key
          balance: "10000000000000000000000", // Replace with the desired balance
        },
      ],
      // chainId: chainIds.hardhat,
    },
    localhost: {
      url: "http://localhost:8545",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    ganache: {
      url: "http://localhost:7545",
      accounts: [PRIVATE_KEY],
    },
    ethereum: {
      url: ETHEREUM_URL,
      accounts: [PRIVATE_KEY],
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
    polygon: {
      url: POLYGON_URL,
      accounts: [PRIVATE_KEY],
    },
    mumbai: {
      url: MUMBAI_URL,
      accounts: [PRIVATE_KEY],
    },
    optimism: {
      url: OPTIMISM_URL,
      accounts: [PRIVATE_KEY],
    },
    arbitrum: {
      url: ARBITRUM_URL,
      accounts: [PRIVATE_KEY],
    },
    arbitrumNova: {
      url: ARBITRUM_NOVA_URL,
      accounts: [PRIVATE_KEY],
    },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./tests",
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;

