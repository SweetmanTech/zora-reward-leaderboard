import { utils } from "ethers"
import { mainnet, zora } from "@wagmi/core/chains"
import { ethGetLogsBatch } from "./alchemy/ethGetLogsBatch"
import ethBlockNumber from "./alchemy/eth_blockNumber"
import { zoraGetLogs } from "./zora/zora_getLogs"
import { PROTOCOL_REWARDS_ADDRESS, REWARD_DEPOSIT_EVENT_SIGNATURE } from "./consts"
import decodeBatchRewardLogs from "./zora/decodeBatchRewardLogs"

export const getRewardsDepositEvents = async (chainId, numberOfDays) => {
  const topics = [utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE)]

  const latestBlock = await ethBlockNumber(chainId)
  const secondsPerBlock = chainId === mainnet.id ? 13.5 : 2
  const blocksIn24Hours = Math.floor((24 * 60 * 60) / secondsPerBlock)
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
      ? await zoraGetLogs(PROTOCOL_REWARDS_ADDRESS, topics, latestBlock, fromBlock)
      : await ethGetLogsBatch(chainId, requests)

  const parsedLogs = decodeBatchRewardLogs(batchedLogs)

  return parsedLogs.reverse()
}
