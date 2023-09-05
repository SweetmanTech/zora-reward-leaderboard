import { ProfileProvider } from "../../providers/ProfileContext"
import ProfileView from "./ProfilePage"

const ProfilePage = () => (
  <ProfileProvider>
    <ProfileView />
  </ProfileProvider>
)

export default ProfilePage
