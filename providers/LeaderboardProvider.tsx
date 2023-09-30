import { createContext, useContext, useMemo } from "react"
import useLeaderboard from "../hooks/useLeaderboard"
import useEthPrice from "../hooks/useEthPrice"

const LeaderboardContext = createContext(null)

const LeaderboardProvider = ({ children }) => {
  const leaderboard = useLeaderboard()
  const { ethPrice } = useEthPrice() as any

  const value = useMemo(() => ({ ...leaderboard, ethPrice }), [leaderboard, ethPrice])

  return <LeaderboardContext.Provider value={value}>{children}</LeaderboardContext.Provider>
}

export const useLeaderboardProvider = () => {
  const context = useContext(LeaderboardContext)
  if (!context) {
    throw new Error("useLeaderboardProvider must be used within a LeaderboardProvider")
  }
  return context
}

export default LeaderboardProvider
