import { zora } from "@wagmi/core/chains"
import Layout from "../Layout"
import TimeFilter from "./TimeFilter"
import LeaderboardTable from "./LeaderboardTable"
import Earnings from "./Earnings"
import { useLeaderboardProvider } from "../../providers/LeaderboardProvider"
import { Button } from "../../shared/Button"
import getBlockRewards from "../../lib/zora/getBlockRewards"

const LeaderboardPage = () => {
  const { zoraFees, creatorFees } = useLeaderboardProvider()

  const handleClick = async () => {
    console.log("SWEETS LOOKUP FIRST EVENT ON ZORA NETWORK")
    const response = await getBlockRewards(zora.id, 2425356, 2425357)
    console.log("SWEETS response", response)
  }

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
        <Button id="api" onClick={handleClick}>
          Update Block Rewards
        </Button>
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
        <div className="flex flex-col md:flex-row justify-around items-center">
          <Earnings label="Creators are earning" fees={creatorFees} />
          <TimeFilter />
          <Earnings label="Zora is earning" fees={zoraFees} />
        </div>
        <LeaderboardTable />
      </div>
    </Layout>
  )
}

export default LeaderboardPage
