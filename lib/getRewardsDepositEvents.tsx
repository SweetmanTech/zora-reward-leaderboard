import { utils } from "ethers"
import { ethGetLogs } from "./alchemy/eth_getLogs"
import getCleanedEthereumAddress from "./getCleanedEthereumAddress"

const PROTOCOL_REWARDS_ADDRESS = "0x7777777F279eba3d3Ad8F4E708545291A6fDBA8B"

export const getRewardsDepositEvents = async (chainId) => {
  const eventSignature =
    "RewardsDeposit(address,address,address,address,address,address,uint256,uint256,uint256,uint256,uint256)"
  const topics = [utils.id(eventSignature)]
  const rawLogs = await ethGetLogs(chainId, PROTOCOL_REWARDS_ADDRESS, topics)

  const parsedLogs = rawLogs.map((log, index) => {
    try {
      // Decode the data section of the log
      const decodedData = utils.defaultAbiCoder.decode(
        [
          "address", // firstMinter
          "address", // zora
          "address", // from
          "uint256", // creatorReward
          "uint256", // createReferralReward
          "uint256", // mintReferralReward
          "uint256", // firstMinterReward
          "uint256", // zoraReward
        ],
        log.data,
      )

      return {
        creator: getCleanedEthereumAddress(log.topics[1].toLowerCase()), // directly from topic
        createReferral: log.topics[2].toLowerCase(), // directly from topic
        mintReferral: log.topics[3].toLowerCase(), // directly from topic
        firstMinter: decodedData[0],
        zora: decodedData[1],
        from: decodedData[2],
        creatorReward: decodedData[3].toString(),
        createReferralReward: decodedData[4].toString(),
        mintReferralReward: decodedData[5].toString(),
        firstMinterReward: decodedData[6].toString(),
        zoraReward: decodedData[7].toString(),
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error parsing log at index ${index}:`, log)
      throw error
    }
  })

  return parsedLogs.reverse()
}
