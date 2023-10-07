import { useProfileProvider } from "../../providers/ProfileProvider"

const ProfilePage = () => {
  const { profile } = useProfileProvider()
  console.log("SWEETS PROFILE", profile)

  return <div className="text-white">hello {profile}</div>
}

export default ProfilePage
