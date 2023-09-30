import { useEffect, useState } from "react"
import { formatEther } from "ethers/lib/utils"
import { useNetwork } from "wagmi"
import getProtocolRewardsLeaderboard from "../lib/getProtocolRewardsLeaderboard"

const useLeaderboard = () => {
  const { chain } = useNetwork()
  const [collectors, setCollectors] = useState([])
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTopCollectors = async () => {
      setLoading(true)
      const leaderboardData = await getProtocolRewardsLeaderboard(numberOfDays)
      const tableData = leaderboardData.map((item) => ({
        walletAddress: item.creator,
        nftsOwned: formatEther(item.totalCreatorReward),
        twitterHandle: "",
      }))

      setCollectors(tableData)
      setLoading(false)
    }
    fetchTopCollectors()
  }, [chain, numberOfDays])

  return { collectors, numberOfDays, setNumberOfDays, loading }
}

export default useLeaderboard
