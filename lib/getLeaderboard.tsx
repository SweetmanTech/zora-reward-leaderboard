import axios from "axios"

const getLeaderboard = async (numberOfDays) => {
  const { data } = await axios.get(
    `https://cached.quickindexer.xyz/leaderboard?days=${numberOfDays}`,
  )
  const cleanedData = {
    leaderboardData: data.leaderboard_data,
    recordsCount: data.recordsCount,
    totalCreatorFees: data.totalCreatorFees,
    totalZoraFees: data.totalZoraFees,
  }
  return cleanedData
}

export default getLeaderboard
