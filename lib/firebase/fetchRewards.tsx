import getBlockRewards from "../zora/getBlockRewards"
import getLatestIndexedBlock from "./getLatestIndexedBlock"
import updateRewardLog from "./updateRewardLog"

const fetchRewards = async (chainId) => {
  const latestIndexedBlock = await getLatestIndexedBlock(chainId)
  console.log("SWEETS latestIndexedBlock", latestIndexedBlock)
  const range = 10_000
  const response = await getBlockRewards(chainId, latestIndexedBlock, latestIndexedBlock + range)
  console.log("SWEETS response", response)
  for (let i = 0; i < response.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const updateResponse = await updateRewardLog(response[i])
    console.log("SWEETS updateResponse", updateResponse)
  }
}

export default fetchRewards
