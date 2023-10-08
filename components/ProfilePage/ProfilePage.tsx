import { useProfileProvider } from "../../providers/ProfileProvider"

const ProfilePage = () => {
  const { profile, data, events } = useProfileProvider()
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
      {events &&
        events.map((e) => (
          <div key={`${e.transactionHash}-${e.logIndex}`}>
            <ol>
              {Object.keys(e).map((attribute, index) => (
                <li key={Object.keys(e)[index]}>
                  {Object.keys(e)[index]}:{e[Object.keys(e)[index]]}
                </li>
              ))}
            </ol>
          </div>
        ))}
    </div>
  )
}

export default ProfilePage
