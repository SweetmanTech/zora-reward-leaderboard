import { useState } from "react"
import useBalanceOf from "../../hooks/useBalanceOf"
import TokenGateRow from "../TokenGateRow"
import LeaderboardRow from "./LeaderboardRow"

const LeaderboardTableBody = ({ rows }) => {
  const [pagination, setPagination] = useState(10)
  const { balance, fetchBalance } = useBalanceOf()
  return (
    <tbody>
      {rows.map((row, index) => {
        if ((balance > 0 && index < pagination) || index < 1)
          return <LeaderboardRow key={row.walletAddress} row={row} rank={index + 1} />
        return null
      })}
      {!balance && <TokenGateRow numberOfRows={rows.length} fetchBalance={fetchBalance} />}
    </tbody>
  )
}

export default LeaderboardTableBody
