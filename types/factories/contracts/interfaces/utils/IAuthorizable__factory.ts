/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAuthorizable,
  IAuthorizableInterface,
} from "../../../../contracts/interfaces/utils/IAuthorizable";

const _abi = [
  {
    inputs: [],
    name: "AlreadyAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAuthorized",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "AddAuthorization",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "RemoveAuthorization",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "addAuthorization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "authorizedAccounts",
    outputs: [
      {
        internalType: "uint256",
        name: "_authorized",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "authorizedAccounts",
    outputs: [
      {
        internalType: "address[]",
        name: "_accounts",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_account",
        type: "address",
      },
    ],
    name: "removeAuthorization",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IAuthorizable__factory {
  static readonly abi = _abi;
  static createInterface(): IAuthorizableInterface {
    return new Interface(_abi) as IAuthorizableInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IAuthorizable {
    return new Contract(address, _abi, runner) as unknown as IAuthorizable;
  }
}
