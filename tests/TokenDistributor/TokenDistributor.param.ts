
import { ethers } from "hardhat";

const root = "0xfa2d88c3367862017f5e74924545e92cb45db4956e35117f1b4bb2a31d35e3fa";
const totalClaimable = "13700000000000000000000";
const claimPeriodStart = Math.floor(Date.now() / 1000); // now
const claimPeriodEnd = claimPeriodStart + 86400; // 24 hours after claimPeriodStart
const delegateTo = ethers.ZeroAddress;

export {
    root,
    totalClaimable,
    claimPeriodStart,
    claimPeriodEnd,
    delegateTo
}