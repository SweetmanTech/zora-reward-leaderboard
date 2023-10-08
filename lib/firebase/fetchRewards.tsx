import getBlockRewards from "../zora/getBlockRewards"
import getLatestIndexedBlock from "./getLatestIndexedBlock"
import updateRewardLog from "./updateRewardLog"

const fetchRewards = async (chainId) => {
  const latestIndexedBlock = await getLatestIndexedBlock(chainId)
  const range = 10_000
  const response = await getBlockRewards(chainId, latestIndexedBlock, latestIndexedBlock + range)
  for (let i = 0; i < response.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await updateRewardLog(response[i])
  }
}

export default fetchRewards
