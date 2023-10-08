import { defaultAbiCoder } from "ethers/lib/utils"
import getCleanedEthereumAddress from "../getCleanedEthereumAddress"

const decodeBatchRewardLogs = (batchedLogs, chainId) => {
  const filteredArr = batchedLogs.filter((value) => value !== undefined)

  const parsedLogs = filteredArr.map((log, index) => {
    try {
      const decodedData = defaultAbiCoder.decode(
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
        log?.data,
      )

      return {
        creator: getCleanedEthereumAddress(log.topics[1].toLowerCase()),
        createReferral: getCleanedEthereumAddress(log.topics[2].toLowerCase()),
        mintReferral: getCleanedEthereumAddress(log.topics[3].toLowerCase()),
        firstMinter: getCleanedEthereumAddress(decodedData[0]),
        zora: decodedData[1],
        from: decodedData[2],
        creatorReward: decodedData[3].toString(),
        createReferralReward: decodedData[4].toString(),
        mintReferralReward: decodedData[5].toString(),
        firstMinterReward: decodedData[6].toString(),
        zoraReward: decodedData[7].toString(),
        transactionHash: log.transactionHash,
        blockNumber: log.blockNumber,
        chainId,
        logIndex: log.logIndex,
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error parsing log at index ${index}:`, log)
      throw error
    }
  })

  return parsedLogs
}

export default decodeBatchRewardLogs
