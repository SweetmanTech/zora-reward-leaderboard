import { useProfileProvider } from "../../providers/ProfileProvider"

const ProfilePage = () => {
  const { profile, data } = useProfileProvider()
  console.log("SWEETS PROFILE", profile)
  const keys = data && Object.keys(data)

  return (
    <div className="text-white">
      hello {profile}
      {keys &&
        keys.map((key) => (
          <div key={key}>
            {key}: {data[key]}
          </div>
        ))}
    </div>
  )
}

export default ProfilePage
