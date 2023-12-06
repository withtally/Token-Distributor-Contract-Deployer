import type { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/dist/src/signer-with-address";

import type { TokenDistributor } from "../types/contracts/TokenDistributor";
import type { Verifier } from "../types/contracts/Verifier";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
    export interface Context {
        tokenDistributor: TokenDistributor;
        verifier: Verifier;
        loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
        signers: Signers;
    }
}

export interface Signers {
    admin: SignerWithAddress;
    notAuthorized: SignerWithAddress;
}