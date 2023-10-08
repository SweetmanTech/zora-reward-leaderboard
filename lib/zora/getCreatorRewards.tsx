import { zora } from "@wagmi/core/chains"
import { ethGetLogsBatch } from "../alchemy/ethGetLogsBatch"
import { zoraGetLogs } from "./zora_getLogs"
import { PROTOCOL_REWARDS_ADDRESS } from "../consts"
import decodeBatchRewardLogs from "./decodeBatchRewardLogs"
import ethBlockNumber from "../alchemy/eth_blockNumber"
import { getCreatorRewardTopics } from "./topics"

const getCreatorRewards = async (chainId, address) => {
  const topics = getCreatorRewardTopics(address)
  const startBlock = 0
  const currentBlock = await ethBlockNumber(chainId)
  const blockRange = 10_000_000
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
  console.log("SWEETS requests", requests)
  console.log("SWEETS chainId", chainId)

  const batchedLogs =
    chainId === zora.id ? await zoraGetLogs(requests) : await ethGetLogsBatch(chainId, requests)
  const parsedLogs = decodeBatchRewardLogs(batchedLogs, chainId)
  return parsedLogs
}

export default getCreatorRewards
