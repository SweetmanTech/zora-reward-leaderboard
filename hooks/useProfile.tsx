import { useRouter } from "next/router"
import { zora } from "@wagmi/core/chains"
import { useEffect, useState } from "react"
import getProfile from "../lib/getProfile"
import getCreatorRewards from "../lib/zora/getCreatorRewards"
import calculateTotalRewards from "../lib/calculateTotalRewards"
import getRecentEvents from "../lib/getRecentEvents"

const useProfile = () => {
  const { query } = useRouter()
  const { profile } = query
  const [data, setData] = useState(null as any)
  const [events, setEvents] = useState([])
  const chaindId = zora.id
  useEffect(() => {
    const init = async () => {
      const { data: profileData } = await getProfile(profile)
      setData(profileData)
      const response = await getCreatorRewards(chaindId, profile)
      setEvents(response)
    }
    if (!profile) return
    init()
  }, [profile])

  useEffect(() => {
    const init = async () => {
      // CALCULATE TOTAL REWARDS
      console.log("SWEETS events", events)
      const total = calculateTotalRewards(profile, events)
      console.log("SWEETS TOTAL", total)
      const oneMonthEvents = getRecentEvents(events, chaindId, 30)
      console.log("SWEETS oneMonthEvents", oneMonthEvents)
      const monthly = calculateTotalRewards(profile, oneMonthEvents)
      console.log("SWEETS monthly", monthly)
      const oneWeekEvents = getRecentEvents(events, chaindId, 7)
      console.log("SWEETS oneWeekEvents", oneWeekEvents)
      const weekly = calculateTotalRewards(profile, oneWeekEvents)
      console.log("SWEETS weekly", weekly)
      const oneDayEvents = getRecentEvents(events, chaindId, 1)
      console.log("SWEETS oneDayEvents", oneDayEvents)
      const daily = calculateTotalRewards(profile, oneDayEvents)
      console.log("SWEETS daily", daily)

      // CALCULATE 30D REWARDS
      // CALCULATE 7D REWARDS
      // Save to Firebase
    }
    if (events.length === 0) return
    init()
  })

  return { profile, data, events }
}

export default useProfile
