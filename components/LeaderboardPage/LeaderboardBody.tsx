import useBalanceOf from "../../hooks/useBalanceOf"
import TokenGateRow from "../TokenGateRow"
import LeaderboardRow from "./LeaderboardRow"

const LeaderboardTableBody = ({ rows }) => {
  const { balance, fetchBalance } = useBalanceOf()
  return (
    <tbody>
      {rows.map((collector, index) => {
        if (balance > 0 || index < 1)
          return (
            <LeaderboardRow
              key={collector.walletAddress}
              address={collector.walletAddress}
              numberOwned={collector.nftsOwned}
              rank={index + 1}
            />
          )
        return null
      })}
      {!balance && <TokenGateRow numberOfRows={rows.length} fetchBalance={fetchBalance} />}
    </tbody>
  )
}

export default LeaderboardTableBody
