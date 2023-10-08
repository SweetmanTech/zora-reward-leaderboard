import { useRouter } from "next/router"
import { base, mainnet, optimism, zora } from "@wagmi/core/chains"
import { useEffect, useState } from "react"
import getProfile from "../lib/getProfile"
import getCreatorRewards from "../lib/zora/getCreatorRewards"
import calculateTotalRewards from "../lib/calculateTotalRewards"
import getRecentEvents from "../lib/getRecentEvents"
import updateCreatorTotals from "../lib/firebase/updateCreatorTotals"
import getAddressForHandle from "../lib/getAddressForHandle"

const useProfile = () => {
  const { query } = useRouter()
  const { profile } = query
  const [address, setAddress] = useState(null)
  const [data, setData] = useState(null as any)
  const [events, setEvents] = useState([])
  const chaindId = zora.id

  useEffect(() => {
    const init = async () => {
      const response = await getAddressForHandle(profile)
      setAddress(response)
    }
    if (!profile) return
    init()
  }, [profile])

  useEffect(() => {
    const init = async () => {
      console.log("SWEETS init")
      const { data: profileData } = await getProfile(address)
      console.log("SWEETS ADDRESS", address)
      setData(profileData)
      const response = await getCreatorRewards(zora.id, address)
      const opResponse = await getCreatorRewards(optimism.id, address)
      const baseResponse = await getCreatorRewards(base.id, address)
      const ethResponse = await getCreatorRewards(mainnet.id, address)
      console.log("SWEETS opResponse", opResponse)

      setEvents([...response, ...opResponse, ...baseResponse, ...ethResponse])
    }
    if (!address) return
    init()
  }, [address])

  useEffect(() => {
    const init = async () => {
      console.log("SWEETS events", events)
      const total = calculateTotalRewards(address, events)
      const oneMonthEvents = getRecentEvents(events, chaindId, 30)
      const oneMonth = calculateTotalRewards(address, oneMonthEvents)
      const oneWeekEvents = getRecentEvents(events, chaindId, 7)
      const oneWeek = calculateTotalRewards(address, oneWeekEvents)
      const newData = {
        total,
        oneMonth,
        oneWeek,
      }
      console.log("SWEETS newData", newData)
      setData(newData)
      updateCreatorTotals(profile, total, oneMonth, oneWeek)
    }
    if (events.length === 0) return
    init()
  }, [events])

  return { profile, data, events, address }
}

export default useProfile
