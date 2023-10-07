import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import getProfile from "../lib/getProfile"

const useProfile = () => {
  const { query } = useRouter()
  const { profile } = query
  const [data, setData] = useState(null as any)

  useEffect(() => {
    const init = async () => {
      const { data: profileData } = await getProfile(profile)
      console.log("SWEETS RESPONSE", profileData)
      setData(profileData)
    }
    init()
  }, [profile])

  return { profile, data }
}

export default useProfile
