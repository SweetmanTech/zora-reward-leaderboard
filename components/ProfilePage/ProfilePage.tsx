import { formatEther } from "viem"
import truncateEthAddress from "../../lib/truncateEthAddress"
import { useProfileProvider } from "../../providers/ProfileProvider"
import Balance from "../Balance"

const ProfilePage = () => {
  const { profile, data, events } = useProfileProvider()

  const keys = data && Object.keys(data)
  const ethTotal = data && formatEther(data?.total)
  const ethMonthly = data && formatEther(data?.oneMonth)
  const ethWeekly = data && formatEther(data?.oneWeek)
  console.log("SWEETS ethTotal", data)
  return (
    <div className="text-white font-hanson">
      <p className=" text-xl">{profile} has earned</p>
      <Balance amount={ethTotal} />
      <Balance amount={ethMonthly} label="30D" />
      <Balance amount={ethWeekly} label="7D" />
      {keys &&
        keys.map((key) => (
          <div key={key}>
            {key}: {data[key]}
          </div>
        ))}
      {events &&
        events.map((e) => (
          <div key={`${e.transactionHash}-${e.logIndex}`}>
            <ol>
              {Object.keys(e).map((attribute, index) => (
                <li key={Object.keys(e)[index]}>
                  {Object.keys(e)[index]}:{truncateEthAddress(e[Object.keys(e)[index]])}
                </li>
              ))}
            </ol>
          </div>
        ))}
    </div>
  )
}

export default ProfilePage
