import { useEffect, useState } from "react"
import { formatEther } from "ethers/lib/utils"
import { useNetwork } from "wagmi"
import getLeaderboard from "../lib/getLeaderboard"
import getZoraFeeRecipients from "../lib/getZoraFeeRecipients"
import getTableData from "../lib/getTableData"
import getFilteredTotals from "../lib/getFilteredTotals"

const useLeaderboard = () => {
  const { chain } = useNetwork()
  const [collectors, setCollectors] = useState([])
  const [creatorFees, setCreatorFees] = useState<string>("")
  const [zoraFees, setZoraFees] = useState<string>("")
  const [numberOfDays, setNumberOfDays] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState(100)

  useEffect(() => {
    const fetchTopCollectors = async () => {
      setLoading(true)
      setPagination(1)
      const { leaderboardData, totalCreatorFees, totalZoraFees } = await getLeaderboard(
        numberOfDays,
      )
      const { tableData, zoraData } = await getTableData(leaderboardData)
      console.log("SWEETS SUBTRACT ZORA DATA FROM CREATOR FEES", zoraData)
      const { zoraFilteredFees, creatorFilteredFees } = getFilteredTotals(
        totalCreatorFees,
        totalZoraFees,
        zoraData,
      )
      console.log("SWEETS zoraFilteredFees", zoraFilteredFees)
      console.log("SWEETS creatorFilteredFees", creatorFilteredFees)
      setCollectors(tableData)
      setCreatorFees(creatorFilteredFees.toString())
      setZoraFees(zoraFilteredFees.toString())
      setPagination(100)
      setLoading(false)
    }
    fetchTopCollectors()
  }, [chain, numberOfDays])

  return {
    collectors,
    numberOfDays,
    setNumberOfDays,
    loading,
    creatorFees,
    zoraFees,
    pagination,
    setPagination,
  }
}

export default useLeaderboard
