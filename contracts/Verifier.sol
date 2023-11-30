pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Verifier {
    bytes32 private root;

    constructor(bytes32 _root) {
        // (1)
        root = _root;
    }

    function verify(
        bytes32[] memory proof,
        address addr,
        uint256 amount
    ) public {
        // (2)
        // bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(addr, amount))));
        bytes32 leaf = keccak256(abi.encodePacked(addr, amount));
        // (3)
        require(MerkleProof.verify(proof, root, leaf), "Invalid proof");
        // (4)
    }

    function generateLeaf(address addr, uint256 amount) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(addr, amount));
    }
}