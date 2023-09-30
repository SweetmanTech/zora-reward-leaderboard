import axios from "axios"

const getEthPrice = async () => {
  try {
    const response: any = await axios.get("/api/getEthPrice")
    return response?.data?.USD
  } catch (err) {
    return 0
  }
}

export default getEthPrice
