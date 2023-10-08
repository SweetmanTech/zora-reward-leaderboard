import { useRouter } from "next/router"
import { base, mainnet, optimism, zora } from "@wagmi/core/chains"
import { useEffect, useState } from "react"
import getProfile from "../lib/getProfile"
import getCreatorRewards from "../lib/zora/getCreatorRewards"
import calculateTotalRewards from "../lib/calculateTotalRewards"
import getRecentEvents from "../lib/getRecentEvents"
import updateCreatorTotals from "../lib/firebase/updateCreatorTotals"

const useProfile = () => {
  const { query } = useRouter()
  const { profile } = query
  const [data, setData] = useState(null as any)
  const [events, setEvents] = useState([])
  const chaindId = zora.id
  const [reload, setReload] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: profileData } = await getProfile(profile)
      setData(profileData)
      const response = await getCreatorRewards(chaindId, profile)
      const opResponse = await getCreatorRewards(optimism.id, profile)
      const baseResponse = await getCreatorRewards(base.id, profile)
      const ethResponse = await getCreatorRewards(mainnet.id, profile)

      setEvents([...response, ...opResponse, ...baseResponse, ...ethResponse])
      setReload(false)
    }
    if (!profile || !reload) return
    init()
  }, [profile])

  useEffect(() => {
    const init = async () => {
      const total = calculateTotalRewards(profile, events)
      const oneMonthEvents = getRecentEvents(events, chaindId, 30)
      const monthly = calculateTotalRewards(profile, oneMonthEvents)
      const oneWeekEvents = getRecentEvents(events, chaindId, 7)
      const weekly = calculateTotalRewards(profile, oneWeekEvents)
      updateCreatorTotals(profile, total, monthly, weekly)
      setReload(true)
    }
    if (events.length === 0) return
    init()
  })

  return { profile, data, events }
}

export default useProfile
