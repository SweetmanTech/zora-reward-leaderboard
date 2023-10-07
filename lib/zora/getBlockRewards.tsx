import { zora } from "@wagmi/core/chains"
import { utils } from "ethers"
import { ethGetLogsBatch } from "../alchemy/ethGetLogsBatch"
import { zoraGetLogs } from "./zora_getLogs"
import { PROTOCOL_REWARDS_ADDRESS, REWARD_DEPOSIT_EVENT_SIGNATURE } from "../consts"
import decodeBatchRewardLogs from "./decodeBatchRewardLogs"

const getBlockRewards = async (chainId, fromBlock, toBlock) => {
  const topics = [utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE)]

  const requests = []

  const blockRange = 10_000
  for (let startBlock = fromBlock; startBlock <= toBlock; startBlock += blockRange) {
    const endBlock = Math.min(startBlock + blockRange - 1, toBlock)
    requests.push({
      fromBlock: `0x${startBlock.toString(16)}`,
      toBlock: `0x${endBlock.toString(16)}`,
      address: PROTOCOL_REWARDS_ADDRESS,
      topics,
    })
  }

  const batchedLogs =
    chainId === zora.id
      ? await zoraGetLogs(PROTOCOL_REWARDS_ADDRESS, topics, toBlock, fromBlock)
      : await ethGetLogsBatch(chainId, requests)
  const parsedLogs = decodeBatchRewardLogs(batchedLogs)
  return parsedLogs
}

export default getBlockRewards
