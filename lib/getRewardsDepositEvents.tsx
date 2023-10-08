import { utils } from "ethers"
import { zora } from "@wagmi/core/chains"
import { ethGetLogsBatch } from "./alchemy/ethGetLogsBatch"
import ethBlockNumber from "./alchemy/eth_blockNumber"
import { zoraGetLogs } from "./zora/zora_getLogs"
import { PROTOCOL_REWARDS_ADDRESS, REWARD_DEPOSIT_EVENT_SIGNATURE } from "./consts"
import decodeBatchRewardLogs from "./zora/decodeBatchRewardLogs"
import getBlocksPerDay from "./getBlocksPerDay"

export const getRewardsDepositEvents = async (chainId, numberOfDays) => {
  const topics = [utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE)]

  const latestBlock = await ethBlockNumber(chainId)
  const blocksIn24Hours = getBlocksPerDay(chainId)
  const range = blocksIn24Hours * numberOfDays
  const fromBlock = latestBlock - range
  const blockRange = 100_000
  const requests = []

  for (let startBlock = fromBlock; startBlock <= latestBlock; startBlock += blockRange) {
    const endBlock = Math.min(startBlock + blockRange - 1, latestBlock)
    requests.push({
      fromBlock: `0x${startBlock.toString(16)}`,
      toBlock: `0x${endBlock.toString(16)}`,
      address: PROTOCOL_REWARDS_ADDRESS,
      topics,
    })
  }
  const batchedLogs =
    chainId === zora.id
      ? await zoraGetLogs(PROTOCOL_REWARDS_ADDRESS, requests)
      : await ethGetLogsBatch(chainId, requests)

  const parsedLogs = decodeBatchRewardLogs(batchedLogs, chainId)

  return parsedLogs.reverse()
}
