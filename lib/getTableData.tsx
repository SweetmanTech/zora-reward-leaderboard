import { formatEther } from "viem"
import getZoraFeeRecipients from "./getZoraFeeRecipients"

const getTableData = async (leaderboardData: any[]) => {
  const zoraFeeRecipients = await getZoraFeeRecipients()
  const tableData = []
  const zoraData = []

  if (leaderboardData) {
    leaderboardData.forEach((item: any) => {
      const formattedData = {
        walletAddress: item.creator,
        nftsOwned: formatEther(item.totalCreatorReward),
        twitterHandle: "",
        zoraReward: formatEther(item.zoraReward),
        ethereumReward: formatEther(item.mainnetReward),
        baseReward: formatEther(item.baseReward),
        optimismReward: formatEther(item.optimismReward),
      }

      if (zoraFeeRecipients.includes(item.creator.toLowerCase())) {
        zoraData.push(formattedData)
      } else {
        tableData.push(formattedData)
      }
    })
  }
  return { tableData, zoraData }
}

export default getTableData
