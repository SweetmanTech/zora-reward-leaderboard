import { useState } from "react"
import useEthPrice from "../../hooks/useEthPrice"

const Balance = ({ amount, label = "total" }) => {
  const [isSelectedUSD, setIsSelectedUSD] = useState(true)
  const { getUsdConversion } = useEthPrice()

  return (
    <div className="flex mt-2">
      <button
        type="button"
        className="font-monument_extended text-[22px]
          bg-[url('/images/Expand/m_dollar_bg.png')]
          w-[38px] h-[60px] bg-cover
          flex items-center justify-center"
        onClick={() => setIsSelectedUSD(!isSelectedUSD)}
      >
        {isSelectedUSD ? "$" : "Ξ"}
      </button>
      <div
        className="font-monument_extended text-[22px]
          bg-[url('/images/Expand/m_balance_bg.png')]
          w-[222px] h-[60px] bg-cover
          pl-[10px]
          flex items-center justify-start"
      >
        {isSelectedUSD ? `${getUsdConversion(amount)} USD` : `${parseFloat(amount).toFixed(4)} ETH`}
      </div>
      <div
        className="font-monument_extended text-[22px]
          bg-[url('/images/Expand/m_copy_bg.png')]
          w-[111px] h-[60px] bg-cover
          pl-[10px]
          flex items-center justify-start"
      >
        {label}
      </div>
    </div>
  )
}

export default Balance
