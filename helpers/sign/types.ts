import { TypedDataDomain, TypedDataField } from "ethers";

  
export const getSignDomain = ({
    contractName,
    chainId,
    contractAddress,
  }: {
    contractName: string;
    chainId: number | undefined;
    contractAddress: string;
  }): TypedDataDomain  => {
      const domain = {
        name: contractName,
        version: "1",
        chainId,
        verifyingContract: contractAddress as `0x${string}`,
      } as const;
  
      return domain;
  };
  
export const getSignTypes = (): Record<string, Array<TypedDataField>> => {
const types: Record<string, Array<TypedDataField>> = {
    // 'EIP712Domain': [
    // { name: "name", type: "string" },
    // { name: "version", type: "string" },
    // { name: "chainId", type: "uint256" },
    // { name: "verifyingContract", type: "address" },
    // ],
    'Delegation': [
    { name: "delegatee", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "expiry", type: "uint256" },
    ],
};

return types;
};

export const getSignValue = ({
  delegatee,
  nonce,
  expiry,
}: {
  delegatee: string
  nonce: number
  expiry: BigInt | string | number
}) :Record<string, any>=> {
  const value = {
    delegatee,
    nonce,
    expiry,
  }

  return value
}