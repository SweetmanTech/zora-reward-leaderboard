import { useEffect, useState } from "react"
import { formatEther } from "ethers/lib/utils"
import { useNetwork } from "wagmi"
import getProtocolRewardsLeaderboard from "../lib/getProtocolRewardsLeaderboard"

const useLeaderboard = () => {
  const { chain } = useNetwork()
  const [collectors, setCollectors] = useState([])
  const [creatorFees, setCreatorFees] = useState("")
  const [zoraFees, setZoraFees] = useState("")
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTopCollectors = async () => {
      setLoading(true)
      const { leaderboardData, totalCreatorFees, totalZoraFees } =
        await getProtocolRewardsLeaderboard(numberOfDays)
      const tableData = leaderboardData.map((item) => ({
        walletAddress: item.creator,
        nftsOwned: formatEther(item.totalCreatorReward),
        twitterHandle: "",
      }))

      setCollectors(tableData)
      setCreatorFees(totalCreatorFees)
      setZoraFees(totalZoraFees)
      setLoading(false)
    }
    fetchTopCollectors()
  }, [chain, numberOfDays])

  return { collectors, numberOfDays, setNumberOfDays, loading, creatorFees, zoraFees }
}

export default useLeaderboard
