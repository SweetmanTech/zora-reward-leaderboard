/* eslint-disable no-console */
import axios from "axios"
import getProtocolRewardsLeaderboard from "../../../../lib/getProtocolRewardsLeaderboard"

const getLeaderboard = async (numberOfDays = 1) => {
  let response
  /**
   * 1. Try to get the leaderboard data from the cached server
   * 2. If that fails, try to get the leaderboard data from the main server
   * 3. If that fails, try to get the leaderboard data from the protocol rewards server
   */
  try {
    const { data } = await axios.get(
      `https://cached.quickindexer.xyz/leaderboard/?days=${numberOfDays}`,
    )
    response = {
      leaderboardData: data.leaderboard_data,
      totalCreatorFees: data.totalCreatorFees,
      totalZoraFees: data.totalZoraFees,
    }
  } catch (ex) {
    console.error(ex)
    try {
      const { data } = await axios.get(
        `https://api.quickindexer.xyz/leaderboard/?days=${numberOfDays}`,
      )
      response = {
        leaderboardData: data.leaderboard_data,
        totalCreatorFees: data.totalCreatorFees,
        totalZoraFees: data.totalZoraFees,
      }
    } catch (ex1) {
      console.error(ex1)
      try {
        response = await getProtocolRewardsLeaderboard(numberOfDays)
      } catch (ex2) {
        response = { data: false }
        console.error(ex2)
      }
    }
  }

  return response
}

export default async function handler(req: any, res: any) {
  const data = await getLeaderboard(req?.query?.numberOfDays)
  res.status(200).json(data)
}
