import { useEffect, useState } from "react"
import getEthPrice from "../lib/getEthPrice"

const useEthPrice = () => {
  const [ethPrice, setEthPrice] = useState(0)

  useEffect(() => {
    const init = async () => {
      const response = await getEthPrice()
      setEthPrice(response)
    }
    init()
  }, [])

  const getUsdConversion = (balance) => {
    if (!balance) return 0
    return (parseFloat(balance) * ethPrice).toFixed(2)
  }

  return { ethPrice, getUsdConversion }
}

export default useEthPrice
