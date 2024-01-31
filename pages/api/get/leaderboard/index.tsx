/* eslint-disable no-console */
import axios from "axios"
import getProtocolRewardsLeaderboard from "../../../../lib/getProtocolRewardsLeaderboard"

const getLeaderboard = async (numberOfDays = 1) => {
  let response
  try {
    const { data } = await axios.get(
      `https://api.quickindexer.xyz/leaderboard/?days=${numberOfDays}`,
    )
    response = {
      leaderboardData: data.leaderboard_data,
      totalCreatorFees: data.totalCreatorFees,
      totalZoraFees: data.totalZoraFees,
    }
  } catch (ex) {
    console.error(ex)
    try {
      response = await getProtocolRewardsLeaderboard(numberOfDays)
    } catch (ex2) {
      response = { data: false }
      console.error(ex2)
    }
  }
  return response
}

export default async function handler(req: any, res: any) {
  const data = await getLeaderboard(req?.query?.numberOfDays)
  res.status(200).json(data)
}
