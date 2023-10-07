import { zora } from "@wagmi/core/chains"
import { utils } from "ethers"
import { ethGetLogsBatch } from "../alchemy/ethGetLogsBatch"
import { zoraGetLogs } from "./zora_getLogs"
import { PROTOCOL_REWARDS_ADDRESS, REWARD_DEPOSIT_EVENT_SIGNATURE } from "../consts"
import decodeBatchRewardLogs from "./decodeBatchRewardLogs"
import ethBlockNumber from "../alchemy/eth_blockNumber"

const getCreatorRewards = async (chainId, address) => {
  console.log("SWEETS getCreatorRewards")
  console.log("SWEETS add1ress", address)
  const creatorTopic = [
    utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE),
    utils.hexZeroPad(address, 32),
    null,
    null,
  ]
  const createReferralTopic = [
    utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE),
    null,
    utils.hexZeroPad(address, 32),
    null,
  ]
  const mintReferralTopic = [
    utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE),
    null,
    null,
    utils.hexZeroPad(address, 32),
  ]
  const topics = [creatorTopic, createReferralTopic, mintReferralTopic]

  const startBlock = 0
  const currentBlock = await ethBlockNumber(chainId)
  console.log("SWEETS currentBlock", currentBlock)

  const blockRange = 100_000
  const requests = []

  for (let j = 0; j < topics.length; j += 1) {
    for (let i = startBlock; i <= currentBlock; i += blockRange) {
      const endBlock = Math.min(i + blockRange - 1, currentBlock)
      requests.push({
        fromBlock: `0x${i.toString(16)}`,
        toBlock: `0x${endBlock.toString(16)}`,
        address: PROTOCOL_REWARDS_ADDRESS,
        topic: topics[j],
      })
    }
  }

  const batchedLogs =
    chainId === zora.id
      ? await zoraGetLogs(PROTOCOL_REWARDS_ADDRESS, requests)
      : await ethGetLogsBatch(chainId, requests)
  const parsedLogs = decodeBatchRewardLogs(batchedLogs, chainId)
  console.log("SWEETS parsedLogs", parsedLogs)

  return parsedLogs
}

export default getCreatorRewards
