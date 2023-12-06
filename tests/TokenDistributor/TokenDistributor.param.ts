
// import { ethers } from "hardhat";

const root = "0xae1b08655703dc89f64177d04982f7644b008d9e4dcbf6aa686698d4128c2406";
const totalClaimable = "13800000000000000000000";
const claimPeriodStart = Math.floor(Date.now() / 1000)+20; // now
const claimPeriodEnd = claimPeriodStart + 86400; // 24 hours after claimPeriodStart
// const delegateTo = "0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE";

import json from '../../files/example.json';

export {
    root,
    totalClaimable,
    claimPeriodStart,
    claimPeriodEnd,
    // delegateTo
    json
}