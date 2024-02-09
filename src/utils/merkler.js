import { MerkleTree } from 'merkletreejs'
import { ethers } from 'ethers'
import wallets from "./whitelisted_addresses.json"

const leaves = wallets.map((el) => ethers.keccak256(el.address, el.amount))
const tree = new MerkleTree(leaves, ethers.keccak256, { sortPairs: true })

const getRoot = () => {
  return tree.getHexRoot()
}

const getLeaf = (address, amount) => {
  const leaf = ethers.keccak256(address, amount)
  return leaf
}

const getProof = (address, amount) => {
  const proof = tree.getHexProof(getLeaf(address, amount))
  return proof
}

export { leaves, tree, wallets, getRoot, getLeaf, getProof }
