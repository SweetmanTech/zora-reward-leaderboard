import useBalanceOf from "../../hooks/useBalanceOf"
import TokenGateRow from "../TokenGateRow"
import LeaderboardRow from "./LeaderboardRow"

const LeaderboardTableBody = ({ rows }) => {
  console.log("SWEETS ROWS", rows)
  const { balance, fetchBalance } = useBalanceOf()
  return (
    <tbody>
      {rows.map((row, index) => {
        if (balance > 0 || index < 1)
          return <LeaderboardRow key={row.walletAddress} row={row} rank={index + 1} />
        return null
      })}
      {!balance && <TokenGateRow numberOfRows={rows.length} fetchBalance={fetchBalance} />}
    </tbody>
  )
}

export default LeaderboardTableBody
