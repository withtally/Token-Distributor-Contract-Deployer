import { useSignTypedData } from "wagmi";

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
}: {
  contractAddress: string;
  contractName: string;
  delegateeAddress: string;
  chainId: number;
  nonce: BigInt;
  expiry: number;
  useVersion: boolean;
}) => {
  const { signTypedDataAsync } = useSignTypedData();

  try {
    const domain = getDelegateSignDomain({
      contractName,
      chainId,
      contractAddress,
      useVersion,
    });
    const types = getDelegateSignTypes({ useVersion });
    const value = getDelegateSignValue({
      delegatee: delegateeAddress,
      nonce: Number(nonce),
      expiry: BigInt(expiry),
    });

    const signature = await signTypedDataAsync({
      domain,
      types,
      value,
    });

    return signature ?? undefined;
  } catch (error) {
    console.error(error);

    return undefined;
  }
};
