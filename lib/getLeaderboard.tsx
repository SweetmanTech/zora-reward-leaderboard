import axios from "axios"

const getLeaderboard = async (numberOfDays) => {
  const { data } = await axios.get(`/api/get/leaderboard?numberOfDays=${numberOfDays}`)
  console.log(data)
  return data
}

export default getLeaderboard
