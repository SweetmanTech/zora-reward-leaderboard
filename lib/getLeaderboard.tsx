import axios from "axios"

const getLeaderboard = async (numberOfDays) => {
  const { data } = await axios.get(
    `https://api.quickindexer.xyz/leaderboard/?days=${numberOfDays}`,
    {
      timeout: 20000,
    },
  )
  return {
    leaderboardData: data.leaderboard_data,
    totalCreatorFees: data.totalCreatorFees,
    totalZoraFees: data.totalZoraFees,
  }
}

export default getLeaderboard
