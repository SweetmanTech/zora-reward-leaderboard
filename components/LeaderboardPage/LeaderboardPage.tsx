import { formatEther } from "ethers/lib/utils"
import Layout from "../Layout"
import TimeFilter from "./TimeFilter"
import LeaderboardTable from "./LeaderboardTable"
import useLeaderboard from "../../hooks/useLeaderboard"
import LoadingModal from "../LoadingModal"

const LeaderboardPage = () => {
  const { collectors, numberOfDays, setNumberOfDays, loading, zoraFees, creatorFees } =
    useLeaderboard()

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
        <div className="flex">
          <div className="flex flex-col">
            <span>CREATORS</span>
            {creatorFees && parseFloat(formatEther(creatorFees)).toFixed(2)} ETH
          </div>
          <TimeFilter setNumberOfDays={setNumberOfDays} numberOfDays={numberOfDays} />
          <div className="flex flex-col ">
            <span>ZORA</span>
            <span>{zoraFees && parseFloat(formatEther(zoraFees)).toFixed(2)} ETH</span>
          </div>
        </div>
        <LeaderboardTable collectors={collectors} />
      </div>
      {loading && (
        <LoadingModal
          description={`getting onchain data for\n previous ${numberOfDays} day(s)...`}
        />
      )}
    </Layout>
  )
}

export default LeaderboardPage
