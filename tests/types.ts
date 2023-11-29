import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";

import type { TokenDistributor } from "../typechain-types/contracts/TokenDistributor";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
    export interface Context {
        tokenDistributor: TokenDistributor;
        loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
        signers: Signers;
    }
}

export interface Signers {
    admin: SignerWithAddress;
}