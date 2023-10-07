import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"

const ProfilePage = () => {
  const { query } = useRouter()
  const { profile } = query

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get("/api/get/profile", {
        params: {
          addressOrEns: profile,
        },
      })
      console.log("SWEETS RESPONSE", data)
    }
    init()
  })

  return <div className="text-white">hello world</div>
}

export default ProfilePage
