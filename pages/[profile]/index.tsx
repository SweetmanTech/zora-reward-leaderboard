import ProfilePage from "../../components/ProfilePage"
import ProfileProvider from "../../providers/ProfileProvider"

const Profile = () => (
  <ProfileProvider>
    <ProfilePage />
  </ProfileProvider>
)

export default Profile
