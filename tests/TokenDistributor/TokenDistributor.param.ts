
import { ethers } from "hardhat";

const root = "0xe0411005ab8b1a495bd3804b43874ef67471fd63c00a73e817c5d6e42e551738";
const totalClaimable = "13800000000000000000000";
const claimPeriodStart = Math.floor(Date.now() / 1000)+20; // now
const claimPeriodEnd = claimPeriodStart + 86400; // 24 hours after claimPeriodStart
// const delegateTo = "0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE";
import json from '../../files/example_output_13800000000000000000000_0xe0411005ab8b1a495bd3804b43874ef67471fd63c00a73e817c5d6e42e551738.json';

export {
    root,
    totalClaimable,
    claimPeriodStart,
    claimPeriodEnd,
    // delegateTo
    json
}