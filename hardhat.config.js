////////////////////////////////////////////////////////////////////////////////////////
//                                                                                    //
//      "C~                                                                           //
//  ^'1XUpkhhQ_.                                                                      //
//  ]?{/xXXJZphhc|,                                                                   //
//  ]]]?]]]nzXXJbhhhw"        lqhhhhhhhhhhhhm              nhhh:  uhhu                //
//  I]?]]]]]](|rXXC0whqu      !qhhhhhhhhhhhhm              nhhh:  uhhu                //
//    ^_?]]]]?]]]1uXXLkh           Jhhh:                   nhhh:  uhhu                //
//      ']]]]]]]]]]cXLkh           Jhhh:     ltczzzn[[zzx  xhhh:  uhhu xzz1'    ^zzz  //
//      ']]?]]]]]]?cX(.(           Jhhh:    :hhhhhhhhhhhm  nhhh:  uhhu  hhh:    hhh:  //
//      ']]]]?rXXY('               Jhhh:    hhhr    :hhhm  nhhh:  uhhu  ^Uhh/ :whh[   //
//      ']]]]]rXUhh:               Jhhh:   zhhh:     [hhm  nhhh:  uhhu   lQhkruhhu    //
//      ']]?]]rXUhh:               Jhhh:    hhh|    ]hhhm  nhhh:  uhhu    lqhhhhw:    //
//      ']?]]]rXUhh:               Jhhh:    ihhhqZZwhhhhm  nhhh:  uhhu     mhhhhm     //
//      '_]]]?rXn {^               /ccc^      {cQhmz <ccr  }ccc^  {cc{      hhh_      //
//        '`l]:'I                                                         .mhh/.      //
//                                                                        +phU,       //
//                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////

//----------
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// requiring tasks.
require("./tasks/deploy_token_distributor.js");

/* ========== DATA FROM .env ===========*/
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
const ARBITRUM_SEPOLIAR_URL = process.env.ARBITRUM_SEPOLIAR_URL

// Etherscan key
const ETHERSCAN_KEY = process.env.ETHERSCAN_API_KEY
const POLYGONSCAN_KEY = process.env.POLYGONSCAN_KEY
const OPT_ETHERSCAN_KEY = process.env.OPT_ETHERSCAN_KEY
const ARBISCAN_KEY = process.env.ARBISCAN_KEY

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ],

  },
  etherscan: {
    // To get the correct names needed run: 
    //  npx hardhat verify --list-networks
    apiKey: {
      mainnet: ETHERSCAN_KEY,
      sepolia: ETHERSCAN_KEY,
      polygon: POLYGONSCAN_KEY,
      polygonMumbai: POLYGONSCAN_KEY,
      optimisticEthereum: OPT_ETHERSCAN_KEY,
      arbitrumOne: ARBISCAN_KEY,
      "scroll-alpha": "EMPTY",
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
      gasLimit: 2100000,
    },
    localhost: {
      url: "http://localhost:8545",
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
      gas: 2100000,
      gasPrice: 8000000000,
      gasLimit: 2100000,
    },
    ganache: {
      url: "http://localhost:7545",
      accounts: [PRIVATE_KEY],
    },
    // ETH - networks
    // Ethereum mainnet config
    ethereum: {
      url: ETHEREUM_URL,
      accounts: [PRIVATE_KEY],
    },
    // Sepolia testnet config
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
    // Polygon (Matic) - networks
    // Polygon mainnet config
    polygon: {
      url: POLYGON_URL,
      accounts: [PRIVATE_KEY],
    },
    // Mumbai testnet config
    mumbai: {
      url: MUMBAI_URL,
      accounts: [PRIVATE_KEY],
    },
    // Optimism - networks
    // Optimism mainnet config
    optimism: {
      url: OPTIMISM_URL,
      accounts: [PRIVATE_KEY],
    },
    // Arbitrum - networks
    // Arbitrum One mainnet config
    arbitrum: {
      url: ARBITRUM_URL,
      accounts: [PRIVATE_KEY],
    },
    arbitrumNova: {
      url: ARBITRUM_NOVA_URL,
      accounts: [PRIVATE_KEY],
    },
    arbitrumSepolia: {
      url: ARBITRUM_SEPOLIAR_URL,
      accounts: [PRIVATE_KEY],
    },
  }
};

