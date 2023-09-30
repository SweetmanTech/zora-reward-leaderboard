import axios from "axios"

const getLeaderboard = async (numberOfDays) => {
  const { data } = await axios.get(`/api/get/leaderboard?numberOfDays=${numberOfDays}`)
  console.log("SWEETS DATA", data)
  return data
}

export default getLeaderboard
