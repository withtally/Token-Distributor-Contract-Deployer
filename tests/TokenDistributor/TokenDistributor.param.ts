
// import { ethers } from "hardhat";

const root = "0xb2870dc35bde1db219264a32129df3e73fb74b9f7ede7a7cf8fbf190bb5eb914";
const totalClaimable = "13800000000000000000000";
const claimPeriodStart = Math.floor(Date.now() / 1000)+3; // now
const claimPeriodEnd = claimPeriodStart + 86400; // 24 hours after claimPeriodStart
// const delegateTo = "0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE";

import json from '../../files/example_output_13800000000000000000000_0xb2870dc35bde1db219264a32129df3e73fb74b9f7ede7a7cf8fbf190bb5eb914.json';

export {
    root,
    totalClaimable,
    claimPeriodStart,
    claimPeriodEnd,
    // delegateTo
    json
}