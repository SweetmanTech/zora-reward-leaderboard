import React, { useState, useEffect } from "react"
import { formatEther } from "ethers/lib/utils"
import { useNetwork } from "wagmi"
import SkeletonTableBody from "./SkeletonTableBody"
import Layout from "../Layout"
import getProtocolRewardsLeaderboard from "../../lib/getProtocolRewardsLeaderboard"
import LeaderboardTableBody from "./LeaderboardBody"

const LeaderboardPage = () => {
  const { chain } = useNetwork()
  const [collectors, setCollectors] = useState([])

  useEffect(() => {
    const fetchTopCollectors = async () => {
      const leaderboardData = await getProtocolRewardsLeaderboard(chain?.id || 1)
      // Mapping the new leaderboardData structure to match the table data
      const tableData = leaderboardData.map((item) => ({
        walletAddress: item.creator,
        nftsOwned: formatEther(item.totalCreatorReward), // Changed from `nftsOwned` to `totalCreatorReward`
        twitterHandle: "",
      }))

      setCollectors(tableData)
    }
    fetchTopCollectors()
  }, [chain])

  return (
    <Layout type="contained">
      <div className="w-full pt-24 mx-auto">
        <div
          className="
          font-hanson
          text-center 
          text-[40px] md:text-[75px] 
          font-bold pt-6
        "
        >
          Leaderboard
        </div>
        <div className="w-full flex justify-center pb-4">
          <div
            className="font-hanson 
            text-center 
            w-[300px] xs:w-[350px] md:w-[430px] 
            text-[13px] xs:text-[15px] md:text-[18px] 
            drop-shadow-[0_2px_2px_rgba(0,0,0,0.45)] 
            font-[500]"
          >
            Currently Tracking: <br /> Zora Protocol Rewards
          </div>
        </div>
        <div className="md:px-4 w-full flex justify-center">
          <div
            className="w-[310px] xs:w-[370px] md:w-full 
            border-[2px] border-[black] border-solid
            h-[470px] rounded-lg 
            overflow-auto 
            shadow-[4px_4px_4px_rgb(0,0,0,0.25)] dark:shadow-[4px_4px_4px_rgb(255,255,255,0.25)]
            scrollbar scrollbar-thumb-[black] 
            scrollbar-track-white 
            scrollbar-thumb-rounded-full"
          >
            <table className="w-full font-hanson bg-white text-black">
              <thead className="border-b-[2px] border-black border-solid">
                <tr>
                  <th
                    className="p-[5px] md:p-4 
                    text-left border-r-[2px] 
                    border-black text-center
                    uppercase 
                    text-[8px] xs:text-[11px] md:text-[18px]
                    md:min-w-[100px]"
                  >
                    Rank
                  </th>
                  <th
                    className="p-[5px] md:p-4 
                    text-left border-r-[2px] 
                    border-black text-center 
                    uppercase 
                    text-[8px] xs:text-[11px] md:text-[18px]
                    w-[100px] xs:!w-[130px] md:!w-[200px]"
                  >
                    Creator Rewards Earned
                  </th>
                  <th
                    className="p-[5px] md:p-4 
                    text-left border-r-[2px] 
                    border-black text-center 
                    uppercase 
                    text-[8px] xs:text-[11px] md:text-[18px]"
                  >
                    Address
                  </th>
                </tr>
              </thead>
              {collectors.length > 0 ? (
                <LeaderboardTableBody rows={collectors} />
              ) : (
                <SkeletonTableBody />
              )}
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default LeaderboardPage
