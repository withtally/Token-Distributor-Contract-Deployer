
  
export const getSignDomain = ({
    contractName,
    chainId,
    contractAddress,
    useVersion=false,
  }: {
    contractName: string;
    chainId: number | undefined;
    contractAddress: string;
    useVersion: boolean;
  }) => {
    // Use "version" only if OZ
    if (useVersion) {
      const domain = {
        name: contractName,
        version: "1",
        chainId,
        verifyingContract: contractAddress as `0x${string}`,
      } as const;
  
      return domain;
    }
  
    // No "version" in other cases
    const domain = {
      name: contractName,
      chainId,
      verifyingContract: contractAddress as `0x${string}`,
    } as const;
  
    return domain;
  };
  
export const getSignTypes = ({
    useVersion=false,
}: {
    useVersion: boolean;
}) => {
  // Use "version" only if OZ
  if (useVersion) {
    const types = {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
        { name: "verifyingContract", type: "address" },
      ],
      Delegation: [
        { name: "delegatee", type: "address" },
        { name: "nonce", type: "uint256" },
        { name: "expiry", type: "uint256" },
      ],
    }

    return types
  }

  // No "version" in other cases
  const types = {
    EIP712Domain: [
      { name: "name", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
    ],
    Delegation: [
      { name: "delegatee", type: "address" },
      { name: "nonce", type: "uint256" },
      { name: "expiry", type: "uint256" },
    ],
  }

  return types
}

export const getSignValue = ({
  delegatee,
  nonce,
  expiry,
}: {
  delegatee: string
  nonce: number
  expiry: BigInt | string | number
}) => {
  const value = {
    delegatee,
    nonce,
    expiry,
  }

  return value
}