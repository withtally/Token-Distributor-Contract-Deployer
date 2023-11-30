// import { walletClient } from 'wagmi/config'

import { Signer } from "ethers";
import {
  getSignDomain as getDelegateSignDomain,
  getSignTypes as getDelegateSignTypes,
  getSignValue as getDelegateSignValue,
} from "./types";

export const signDelegateTransaction = async ({
  contractAddress,
  contractName,
  delegateeAddress,
  chainId,
  nonce,
  expiry,
  useVersion = false,
  signer,
}: {
  contractAddress: string;
  contractName: string;
  delegateeAddress: string;
  chainId: number;
  nonce: BigInt;
  expiry: number;
  useVersion: boolean;
  signer: Signer,
}) => {

  try {
    const domain = getDelegateSignDomain({
      contractName,
      chainId,
      contractAddress,
    });
    const types = getDelegateSignTypes();
    const value = getDelegateSignValue({
      delegatee: delegateeAddress,
      nonce: Number(nonce),
      expiry: BigInt(expiry),
    });

    const signature = await signer.signTypedData(domain, types, value);

    return signature ?? undefined;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};
