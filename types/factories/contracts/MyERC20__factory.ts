/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { MyERC20, MyERC20Interface } from "../../contracts/MyERC20";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "CheckpointUnorderedInsertion",
    type: "error",
  },
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "increasedSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "cap",
        type: "uint256",
      },
    ],
    name: "ERC20ExceededSafeSupply",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "ERC2612ExpiredSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "signer",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "ERC2612InvalidSigner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timepoint",
        type: "uint256",
      },
      {
        internalType: "uint48",
        name: "clock",
        type: "uint48",
      },
    ],
    name: "ERC5805FutureLookup",
    type: "error",
  },
  {
    inputs: [],
    name: "ERC6372InconsistentClock",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "bits",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "SafeCastOverflowedUintDowncast",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string",
      },
    ],
    name: "StringTooLong",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
    ],
    name: "VotesExpiredSignature",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "fromDelegate",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "toDelegate",
        type: "address",
      },
    ],
    name: "DelegateChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "previousVotes",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newVotes",
        type: "uint256",
      },
    ],
    name: "DelegateVotesChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "CLOCK_MODE",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "pos",
        type: "uint32",
      },
    ],
    name: "checkpoints",
    outputs: [
      {
        components: [
          {
            internalType: "uint48",
            name: "_key",
            type: "uint48",
          },
          {
            internalType: "uint208",
            name: "_value",
            type: "uint208",
          },
        ],
        internalType: "struct Checkpoints.Checkpoint208",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "clock",
    outputs: [
      {
        internalType: "uint48",
        name: "",
        type: "uint48",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegatee",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "delegateBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "delegates",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "timepoint",
        type: "uint256",
      },
    ],
    name: "getPastTotalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timepoint",
        type: "uint256",
      },
    ],
    name: "getPastVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "getVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "numCheckpoints",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6101606040523480156200001257600080fd5b506040518060400160405280600781526020016626bcaa37b5b2b760c91b81525080604051806040016040528060018152602001603160f81b8152506040518060400160405280600781526020016626bcaa37b5b2b760c91b815250604051806040016040528060038152602001624d544b60e81b81525081600390816200009b91906200098d565b506004620000aa82826200098d565b50620000bc915083905060056200019a565b61012052620000cd8160066200019a565b61014052815160208084019190912060e052815190820120610100524660a0526200015b60e05161010051604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201529081019290925260608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b60805250503060c052506200019433620001786012600a62000b6c565b6200018e906902ec1978c47766a0000062000b7d565b620001d3565b62000c85565b6000602083511015620001ba57620001b28362000215565b9050620001cd565b81620001c784826200098d565b5060ff90505b92915050565b6001600160a01b038216620002035760405163ec442f0560e01b8152600060048201526024015b60405180910390fd5b620002116000838362000258565b5050565b600080829050601f8151111562000243578260405163305a27a960e01b8152600401620001fa919062000b97565b8051620002508262000be7565b179392505050565b620002658383836200026a565b505050565b62000277838383620002d9565b6001600160a01b038316620002cc5760006200029260025490565b90506001600160d01b0380821115620002c957604051630e58ae9360e11b81526004810183905260248101829052604401620001fa565b50505b620002658383836200040c565b6001600160a01b03831662000308578060026000828254620002fc919062000c0c565b909155506200037c9050565b6001600160a01b038316600090815260208190526040902054818110156200035d5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401620001fa565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166200039a57600280548290039055620003b9565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003ff91815260200190565b60405180910390a3505050565b6001600160a01b03831662000441576200043e600a62000925620004a460201b176200043884620004b9565b620004f3565b50505b6001600160a01b03821662000470576200046d600a620009316200053060201b176200043884620004b9565b50505b6001600160a01b0383811660009081526008602052604080822054858416835291205462000265929182169116836200053e565b6000620004b2828462000c22565b9392505050565b60006001600160d01b03821115620004ef576040516306dfcc6560e41b815260d0600482015260248101839052604401620001fa565b5090565b6000806200052362000504620006a5565b6200051a6200051388620006b6565b868860201c565b87919062000705565b915091505b935093915050565b6000620004b2828462000c4c565b816001600160a01b0316836001600160a01b031614158015620005615750600081115b1562000265576001600160a01b0383161562000604576001600160a01b038316600090815260096020908152604082208291620005af919062000530901b62000931176200043886620004b9565b6001600160d01b031691506001600160d01b03169150846001600160a01b031660008051602062002b4e8339815191528383604051620005f9929190918252602082015260400190565b60405180910390a250505b6001600160a01b0382161562000265576001600160a01b0382166000908152600960209081526040822082916200064c9190620004a4901b62000925176200043886620004b9565b6001600160d01b031691506001600160d01b03169150836001600160a01b031660008051602062002b4e833981519152838360405162000696929190918252602082015260400190565b60405180910390a25050505050565b6000620006b162000715565b905090565b80546000908015620006fc57620006e283620006d460018462000c6f565b600091825260209091200190565b54660100000000000090046001600160d01b0316620004b2565b60009392505050565b6000806200052385858562000722565b6000620006b143620008b4565b825460009081908015620008555760006200074487620006d460018562000c6f565b60408051808201909152905465ffffffffffff80821680845266010000000000009092046001600160d01b0316602084015291925090871610156200079c57604051632520601d60e01b815260040160405180910390fd5b805165ffffffffffff808816911603620007f05784620007c388620006d460018662000c6f565b80546001600160d01b039290921666010000000000000265ffffffffffff90921691909117905562000844565b6040805180820190915265ffffffffffff80881682526001600160d01b0380881660208085019182528b54600181018d5560008d815291909120945191519092166601000000000000029216919091179101555b602001519250839150620005289050565b50506040805180820190915265ffffffffffff80851682526001600160d01b0380851660208085019182528854600181018a5560008a815291822095519251909316660100000000000002919093161792019190915590508162000528565b600065ffffffffffff821115620004ef576040516306dfcc6560e41b81526030600482015260248101839052604401620001fa565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806200091457607f821691505b6020821081036200093557634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200026557600081815260208120601f850160051c81016020861015620009645750805b601f850160051c820191505b81811015620009855782815560010162000970565b505050505050565b81516001600160401b03811115620009a957620009a9620008e9565b620009c181620009ba8454620008ff565b846200093b565b602080601f831160018114620009f95760008415620009e05750858301515b600019600386901b1c1916600185901b17855562000985565b600085815260208120601f198616915b8281101562000a2a5788860151825594840194600190910190840162000a09565b508582101562000a495787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052601160045260246000fd5b600181815b8085111562000ab057816000190482111562000a945762000a9462000a59565b8085161562000aa257918102915b93841c939080029062000a74565b509250929050565b60008262000ac957506001620001cd565b8162000ad857506000620001cd565b816001811462000af1576002811462000afc5762000b1c565b6001915050620001cd565b60ff84111562000b105762000b1062000a59565b50506001821b620001cd565b5060208310610133831016604e8410600b841016171562000b41575081810a620001cd565b62000b4d838362000a6f565b806000190482111562000b645762000b6462000a59565b029392505050565b6000620004b260ff84168362000ab8565b8082028115828204841417620001cd57620001cd62000a59565b600060208083528351808285015260005b8181101562000bc65785810183015185820160400152820162000ba8565b506000604082860101526040601f19601f8301168501019250505092915050565b80516020808301519190811015620009355760001960209190910360031b1b16919050565b80820180821115620001cd57620001cd62000a59565b6001600160d01b0381811683821601908082111562000c455762000c4562000a59565b5092915050565b6001600160d01b0382811682821603908082111562000c455762000c4562000a59565b81810381811115620001cd57620001cd62000a59565b60805160a05160c05160e051610100516101205161014051611e6e62000ce06000396000610d5001526000610d2301526000610b0601526000610ade01526000610a3901526000610a6301526000610a8d0152611e6e6000f3fe608060405234801561001057600080fd5b506004361061018d5760003560e01c806370a08231116100e35780639ab24eb01161008c578063d505accf11610066578063d505accf14610375578063dd62ed3e14610388578063f1127ed8146103c157600080fd5b80639ab24eb01461033c578063a9059cbb1461034f578063c3cda5201461036257600080fd5b80638e539e8c116100bd5780638e539e8c1461030257806391ddadf41461031557806395d89b411461033457600080fd5b806370a08231146102ab5780637ecebe00146102d457806384b0196e146102e757600080fd5b80633644e51511610145578063587cde1e1161011f578063587cde1e1461022a5780635c19a95c1461026e5780636fcfff451461028357600080fd5b80633644e515146102075780633a46b1a81461020f5780634bf5d7e91461022257600080fd5b806318160ddd1161017657806318160ddd146101d357806323b872dd146101e5578063313ce567146101f857600080fd5b806306fdde0314610192578063095ea7b3146101b0575b600080fd5b61019a610400565b6040516101a79190611a9b565b60405180910390f35b6101c36101be366004611aca565b610492565b60405190151581526020016101a7565b6002545b6040519081526020016101a7565b6101c36101f3366004611af4565b6104ac565b604051601281526020016101a7565b6101d76104d0565b6101d761021d366004611aca565b6104df565b61019a610565565b610256610238366004611b30565b6001600160a01b039081166000908152600860205260409020541690565b6040516001600160a01b0390911681526020016101a7565b61028161027c366004611b30565b6105dd565b005b610296610291366004611b30565b6105ec565b60405163ffffffff90911681526020016101a7565b6101d76102b9366004611b30565b6001600160a01b031660009081526020819052604090205490565b6101d76102e2366004611b30565b6105f7565b6102ef610602565b6040516101a79796959493929190611b4b565b6101d7610310366004611be1565b610648565b61031d6106b2565b60405165ffffffffffff90911681526020016101a7565b61019a6106bc565b6101d761034a366004611b30565b6106cb565b6101c361035d366004611aca565b6106fb565b610281610370366004611c0b565b610709565b610281610383366004611c63565b6107c6565b6101d7610396366004611ccd565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6103d46103cf366004611d00565b610900565b60408051825165ffffffffffff1681526020928301516001600160d01b031692810192909252016101a7565b60606003805461040f90611d40565b80601f016020809104026020016040519081016040528092919081815260200182805461043b90611d40565b80156104885780601f1061045d57610100808354040283529160200191610488565b820191906000526020600020905b81548152906001019060200180831161046b57829003601f168201915b5050505050905090565b6000336104a081858561093d565b60019150505b92915050565b6000336104ba85828561094f565b6104c58585856109cd565b506001949350505050565b60006104da610a2c565b905090565b6000806104ea6106b2565b90508065ffffffffffff16831061052a57604051637669fc0f60e11b81526004810184905265ffffffffffff821660248201526044015b60405180910390fd5b61055461053684610b57565b6001600160a01b038616600090815260096020526040902090610b8e565b6001600160d01b0316949350505050565b606061056f610c47565b65ffffffffffff1661057f6106b2565b65ffffffffffff16146105a5576040516301bfc1c560e61b815260040160405180910390fd5b5060408051808201909152601d81527f6d6f64653d626c6f636b6e756d6265722666726f6d3d64656661756c74000000602082015290565b336105e88183610c52565b5050565b60006104a682610cdc565b60006104a682610cfe565b600060608060008060006060610616610d1c565b61061e610d49565b60408051600080825260208201909252600f60f81b9b939a50919850469750309650945092509050565b6000806106536106b2565b90508065ffffffffffff16831061068e57604051637669fc0f60e11b81526004810184905265ffffffffffff82166024820152604401610521565b6106a261069a84610b57565b600a90610b8e565b6001600160d01b03169392505050565b60006104da610c47565b60606004805461040f90611d40565b6001600160a01b03811660009081526009602052604081206106ec90610d76565b6001600160d01b031692915050565b6000336104a08185856109cd565b8342111561072d57604051632341d78760e11b815260048101859052602401610521565b604080517fe48329057bfd03d55e49b547132e39cffd9c1820ad7b9d4c5307691425d15adf60208201526001600160a01b0388169181019190915260608101869052608081018590526000906107a79061079f9060a00160405160208183030381529060405280519060200120610db2565b858585610ddf565b90506107b38187610e0d565b6107bd8188610c52565b50505050505050565b834211156107ea5760405163313c898160e11b815260048101859052602401610521565b60007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98888886108378c6001600160a01b0316600090815260076020526040902080546001810190915590565b6040805160208101969096526001600160a01b0394851690860152929091166060840152608083015260a082015260c0810186905260e001604051602081830303815290604052805190602001209050600061089282610db2565b905060006108a282878787610ddf565b9050896001600160a01b0316816001600160a01b0316146108e9576040516325c0072360e11b81526001600160a01b0380831660048301528b166024820152604401610521565b6108f48a8a8a61093d565b50505050505050505050565b604080518082019091526000808252602082015261091e8383610e60565b9392505050565b600061091e8284611d90565b600061091e8284611db7565b61094a8383836001610e96565b505050565b6001600160a01b0383811660009081526001602090815260408083209386168352929052205460001981146109c757818110156109b857604051637dc7a0d960e11b81526001600160a01b03841660048201526024810182905260448101839052606401610521565b6109c784848484036000610e96565b50505050565b6001600160a01b0383166109f757604051634b637e8f60e11b815260006004820152602401610521565b6001600160a01b038216610a215760405163ec442f0560e01b815260006004820152602401610521565b61094a838383610f6b565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016148015610a8557507f000000000000000000000000000000000000000000000000000000000000000046145b15610aaf57507f000000000000000000000000000000000000000000000000000000000000000090565b6104da604080517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60208201527f0000000000000000000000000000000000000000000000000000000000000000918101919091527f000000000000000000000000000000000000000000000000000000000000000060608201524660808201523060a082015260009060c00160405160208183030381529060405280519060200120905090565b600065ffffffffffff821115610b8a576040516306dfcc6560e41b81526030600482015260248101839052604401610521565b5090565b815460009081816005811115610bed576000610ba984610f76565b610bb39085611dd7565b60008881526020902090915081015465ffffffffffff9081169087161015610bdd57809150610beb565b610be8816001611dea565b92505b505b6000610bfb8787858561105e565b90508015610c3957610c2087610c12600184611dd7565b600091825260209091200190565b54660100000000000090046001600160d01b0316610c3c565b60005b979650505050505050565b60006104da43610b57565b6001600160a01b0382811660008181526008602052604080822080548686167fffffffffffffffffffffffff0000000000000000000000000000000000000000821681179092559151919094169392849290917f3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f9190a461094a8183610cd7866110c0565b6110de565b6001600160a01b0381166000908152600960205260408120546104a69061124a565b6001600160a01b0381166000908152600760205260408120546104a6565b60606104da7f0000000000000000000000000000000000000000000000000000000000000000600561127b565b60606104da7f0000000000000000000000000000000000000000000000000000000000000000600661127b565b80546000908015610da957610d9083610c12600184611dd7565b54660100000000000090046001600160d01b031661091e565b60009392505050565b60006104a6610dbf610a2c565b8360405161190160f01b8152600281019290925260228201526042902090565b600080600080610df188888888611326565b925092509250610e0182826113f5565b50909695505050505050565b6001600160a01b038216600090815260076020526040902080546001810190915581811461094a576040516301d4b62360e61b81526001600160a01b038416600482015260248101829052604401610521565b60408051808201909152600080825260208201526001600160a01b038316600090815260096020526040902061091e90836114ae565b6001600160a01b038416610ec05760405163e602df0560e01b815260006004820152602401610521565b6001600160a01b038316610eea57604051634a1406b160e11b815260006004820152602401610521565b6001600160a01b03808516600090815260016020908152604080832093871683529290522082905580156109c757826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610f5d91815260200190565b60405180910390a350505050565b61094a838383611521565b600081600003610f8857506000919050565b60006001610f9584611588565b901c6001901b90506001818481610fae57610fae611dfd565b048201901c90506001818481610fc657610fc6611dfd565b048201901c90506001818481610fde57610fde611dfd565b048201901c90506001818481610ff657610ff6611dfd565b048201901c9050600181848161100e5761100e611dfd565b048201901c9050600181848161102657611026611dfd565b048201901c9050600181848161103e5761103e611dfd565b048201901c905061091e8182858161105857611058611dfd565b0461161c565b60005b818310156110b85760006110758484611632565b60008781526020902090915065ffffffffffff86169082015465ffffffffffff1611156110a4578092506110b2565b6110af816001611dea565b93505b50611061565b509392505050565b6001600160a01b0381166000908152602081905260408120546104a6565b816001600160a01b0316836001600160a01b0316141580156111005750600081115b1561094a576001600160a01b038316156111a8576001600160a01b038316600090815260096020526040812081906111439061093161113e8661164d565b611681565b6001600160d01b031691506001600160d01b03169150846001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724838360405161119d929190918252602082015260400190565b60405180910390a250505b6001600160a01b0382161561094a576001600160a01b038216600090815260096020526040812081906111e19061092561113e8661164d565b6001600160d01b031691506001600160d01b03169150836001600160a01b03167fdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724838360405161123b929190918252602082015260400190565b60405180910390a25050505050565b600063ffffffff821115610b8a576040516306dfcc6560e41b81526020600482015260248101839052604401610521565b606060ff83146112955761128e836116ba565b90506104a6565b8180546112a190611d40565b80601f01602080910402602001604051908101604052809291908181526020018280546112cd90611d40565b801561131a5780601f106112ef5761010080835404028352916020019161131a565b820191906000526020600020905b8154815290600101906020018083116112fd57829003601f168201915b505050505090506104a6565b600080807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a084111561136157506000915060039050826113eb565b604080516000808252602082018084528a905260ff891692820192909252606081018790526080810186905260019060a0016020604051602081039080840390855afa1580156113b5573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166113e1575060009250600191508290506113eb565b9250600091508190505b9450945094915050565b600082600381111561140957611409611e13565b03611412575050565b600182600381111561142657611426611e13565b036114445760405163f645eedf60e01b815260040160405180910390fd5b600282600381111561145857611458611e13565b036114795760405163fce698f760e01b815260048101829052602401610521565b600382600381111561148d5761148d611e13565b036105e8576040516335e2f38360e21b815260048101829052602401610521565b6040805180820190915260008082526020820152826000018263ffffffff16815481106114dd576114dd611e29565b60009182526020918290206040805180820190915291015465ffffffffffff81168252660100000000000090046001600160d01b0316918101919091529392505050565b61152c8383836116f9565b6001600160a01b03831661157d57600061154560025490565b90506001600160d01b038082111561157a57604051630e58ae9360e11b81526004810183905260248101829052604401610521565b50505b61094a838383611823565b600080608083901c1561159d57608092831c92015b604083901c156115af57604092831c92015b602083901c156115c157602092831c92015b601083901c156115d357601092831c92015b600883901c156115e557600892831c92015b600483901c156115f757600492831c92015b600283901c1561160957600292831c92015b600183901c156104a65760010192915050565b600081831061162b578161091e565b5090919050565b60006116416002848418611e3f565b61091e90848416611dea565b60006001600160d01b03821115610b8a576040516306dfcc6560e41b815260d0600482015260248101839052604401610521565b6000806116ad61168f6106b2565b6116a561169b88610d76565b868863ffffffff16565b879190611899565b915091505b935093915050565b606060006116c7836118a7565b604080516020808252818301909252919250600091906020820181803683375050509182525060208101929092525090565b6001600160a01b0383166117245780600260008282546117199190611dea565b909155506117969050565b6001600160a01b038316600090815260208190526040902054818110156117775760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610521565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b0382166117b2576002805482900390556117d1565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161181691815260200190565b60405180910390a3505050565b6001600160a01b03831661184557611842600a61092561113e8461164d565b50505b6001600160a01b03821661186757611864600a61093161113e8461164d565b50505b6001600160a01b0383811660009081526008602052604080822054858416835291205461094a929182169116836110de565b6000806116ad8585856118cf565b600060ff8216601f8111156104a657604051632cd44ac360e21b815260040160405180910390fd5b8254600090819080156119f75760006118ed87610c12600185611dd7565b60408051808201909152905465ffffffffffff80821680845266010000000000009092046001600160d01b03166020840152919250908716101561194457604051632520601d60e01b815260040160405180910390fd5b805165ffffffffffff808816911603611993578461196788610c12600186611dd7565b80546001600160d01b039290921666010000000000000265ffffffffffff9092169190911790556119e7565b6040805180820190915265ffffffffffff80881682526001600160d01b0380881660208085019182528b54600181018d5560008d815291909120945191519092166601000000000000029216919091179101555b6020015192508391506116b29050565b50506040805180820190915265ffffffffffff80851682526001600160d01b0380851660208085019182528854600181018a5560008a81529182209551925190931666010000000000000291909316179201919091559050816116b2565b6000815180845260005b81811015611a7b57602081850181015186830182015201611a5f565b506000602082860101526020601f19601f83011685010191505092915050565b60208152600061091e6020830184611a55565b80356001600160a01b0381168114611ac557600080fd5b919050565b60008060408385031215611add57600080fd5b611ae683611aae565b946020939093013593505050565b600080600060608486031215611b0957600080fd5b611b1284611aae565b9250611b2060208501611aae565b9150604084013590509250925092565b600060208284031215611b4257600080fd5b61091e82611aae565b60ff60f81b881681526000602060e081840152611b6b60e084018a611a55565b8381036040850152611b7d818a611a55565b606085018990526001600160a01b038816608086015260a0850187905284810360c0860152855180825283870192509083019060005b81811015611bcf57835183529284019291840191600101611bb3565b50909c9b505050505050505050505050565b600060208284031215611bf357600080fd5b5035919050565b803560ff81168114611ac557600080fd5b60008060008060008060c08789031215611c2457600080fd5b611c2d87611aae565b95506020870135945060408701359350611c4960608801611bfa565b92506080870135915060a087013590509295509295509295565b600080600080600080600060e0888a031215611c7e57600080fd5b611c8788611aae565b9650611c9560208901611aae565b95506040880135945060608801359350611cb160808901611bfa565b925060a0880135915060c0880135905092959891949750929550565b60008060408385031215611ce057600080fd5b611ce983611aae565b9150611cf760208401611aae565b90509250929050565b60008060408385031215611d1357600080fd5b611d1c83611aae565b9150602083013563ffffffff81168114611d3557600080fd5b809150509250929050565b600181811c90821680611d5457607f821691505b602082108103611d7457634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6001600160d01b03818116838216019080821115611db057611db0611d7a565b5092915050565b6001600160d01b03828116828216039080821115611db057611db0611d7a565b818103818111156104a6576104a6611d7a565b808201808211156104a6576104a6611d7a565b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b600082611e5c57634e487b7160e01b600052601260045260246000fd5b50049056fea164736f6c6343000814000adec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724";

type MyERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MyERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class MyERC20__factory extends ContractFactory {
  constructor(...args: MyERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MyERC20 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MyERC20__factory {
    return super.connect(runner) as MyERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyERC20Interface {
    return new Interface(_abi) as MyERC20Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): MyERC20 {
    return new Contract(address, _abi, runner) as unknown as MyERC20;
  }
}
