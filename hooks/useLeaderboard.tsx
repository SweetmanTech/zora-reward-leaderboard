import { useEffect, useState } from "react"
import { formatEther } from "ethers/lib/utils"
import { useNetwork } from "wagmi"
import getLeaderboard from "../lib/getLeaderboard"

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
      const { leaderboardData, totalCreatorFees, totalZoraFees } = await getLeaderboard(
        numberOfDays,
      )

      const tableData = leaderboardData.map((item: any) => ({
        walletAddress: item.creator,
        nftsOwned: formatEther(item.totalCreatorReward),
        twitterHandle: "",
        zoraReward: formatEther(item.zoraReward),
        ethereumReward: formatEther(item.ethereumReward),
        baseReward: formatEther(item.baseReward),
        optimismReward: formatEther(item.optimismReward),
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
