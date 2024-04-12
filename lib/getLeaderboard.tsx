import axios from "axios"

const getLeaderboard = async (numberOfDays) => {
  const { data } = await axios.get(
    `https://cached.quickindexer.xyz/leaderboard?days=${numberOfDays}`,
  )
  return data
}

export default getLeaderboard
