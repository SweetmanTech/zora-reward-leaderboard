import { useEffect } from "react"
import { useNetwork } from "wagmi"

const TimeFilter = ({ numberOfDays, setNumberOfDays }) => {
  const { chain } = useNetwork()

  useEffect(() => {
    setNumberOfDays(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain])

  return (
    <div className="w-full flex justify-center mb-4">
      <button
        type="button"
        className={`mx-2 p-2 rounded rounded-lg ${numberOfDays === 1 ? "bg-gray-300" : ""}`}
        onClick={() => setNumberOfDays(1)}
      >
        1D
      </button>
      <button
        type="button"
        className={`mx-2 p-2 rounded-lg ${numberOfDays === 7 ? "bg-gray-300" : ""}`}
        onClick={() => setNumberOfDays(7)}
      >
        7D
      </button>
      <button
        type="button"
        className={`mx-2 p-2 rounded-lg ${numberOfDays === 30 ? "bg-gray-300" : ""}`}
        onClick={() => setNumberOfDays(30)}
      >
        30D
      </button>
    </div>
  )
}

export default TimeFilter
