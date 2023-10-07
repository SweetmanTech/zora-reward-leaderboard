import { useRouter } from "next/router"
import { zora } from "@wagmi/core/chains"
import { useEffect, useState } from "react"
import getProfile from "../lib/getProfile"
import getCreatorRewards from "../lib/zora/getCreatorRewards"

const useProfile = () => {
  const { query } = useRouter()
  const { profile } = query
  const [data, setData] = useState(null as any)

  useEffect(() => {
    const init = async () => {
      const { data: profileData } = await getProfile(profile)
      setData(profileData)
      const response = await getCreatorRewards(zora.id, profile)
      console.log("SWEETS getCreatorRewards", response)
      console.log("SWEETS RESPONSE", profileData)
    }
    if (!profile) return
    init()
  }, [profile])

  return { profile, data }
}

export default useProfile
