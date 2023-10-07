import { createContext, useContext, useMemo } from "react"
import useEthPrice from "../hooks/useEthPrice"
import useProfile from "../hooks/useProfile"

const ProfileContext = createContext(null)

const ProfileProvider = ({ children }) => {
  const profile = useProfile()
  const { ethPrice } = useEthPrice() as any

  const value = useMemo(() => ({ ...profile, ethPrice }), [profile, ethPrice])

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

export const useProfileProvider = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfileProvider must be used within a ProfileProvider")
  }
  return context
}

export default ProfileProvider
