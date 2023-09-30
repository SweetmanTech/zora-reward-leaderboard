import { formatEther } from "ethers/lib/utils"
import { useState } from "react"

const Earnings = ({ label, fees, ethPrice }) => {
  const [showUsd, setShowUsd] = useState(false)
  const creator = fees && parseFloat(formatEther(fees)) * (showUsd ? ethPrice : 1)

  return (
    <button
      type="button"
      onClick={() => setShowUsd(!showUsd)}
      className="flex flex-col bg-white p-4 shadow-md rounded-lg mr-4 text-black"
    >
      <span className="font-hanson text-[18px] font-bold">{label}</span>
      <span className="font-hanson text-[33px]">
        {fees && creator.toFixed(2)} {showUsd ? "USD" : "ETH"}
      </span>
    </button>
  )
}

export default Earnings
