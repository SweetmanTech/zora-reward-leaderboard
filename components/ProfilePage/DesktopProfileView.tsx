import Media from "../../shared/Media"
import Tooltip from "../../shared/Tooltip"
import TwitterLocation from "./Desktop/TwitterLocation"
import PFPInformation from "./Desktop/PFPInformation"
import ProfileInformation from "./Desktop/ProflileInformation"
import SimilarProfiles from "./Desktop/SimilarProfiles"
import WalletCollection from "./WalletCollection"
import Cre8orPFP from "./Cre8orPFP"
import EditPanel from "./EditPanel"
import { useUserProvider } from "../../providers/UserProvider"
import { useProfileProvider } from "../../providers/ProfileContext"
import Skeleton from "./Sketelon"

const DesktopProfileView = () => {
  const { userInfo, metaData } = useUserProvider()

  const { isEditable, editedUserName, setEditedUserName } = useProfileProvider()

  const environment = metaData?.attributes
    .filter((attr) => attr.trait_type === "Environment")[0]
    .value.toUpperCase()
    .trim()
    .replaceAll(" ", "_")

  return (
    <div
      className="relative w-full
        rounded-[10px]
        bg-cover
        bg-center
        overflow-hidden"
      style={{
        backgroundImage: `url("/assets/Profile/DESKTOP PROFILE BGS/${environment}_DESKTOP.png")`,
      }}
    >
      <div
        className={`relative z-[4] left-0 top-0 w-full h-full
            flex flex-col pt-[20px]`}
      >
        <div className="relative z-[1]">
          <div
            className="absolute z-[1]
          h-[calc(100%+60px)] w-full
          flex justify-center items-end"
          >
            <Cre8orPFP />
          </div>
          <div
            className="absolute z-[2]
          top-[-20px]
          bg-gradient-to-r from-[#000000e3] via-[transparent] to-[#000000e3]
          h-[calc(100%+60px)] w-full"
          />
          <div className="w-full flex justify-between items-center px-6 relative z-[3]">
            {isEditable ? (
              <>
                <input
                  className="relative z-[105] 
              font-eigerdals text-[75px] w-[320px]
              ring-0 outline-none
              border-[lightgray] border-[1px]
              mb-[20px] bg-[#D9D9D9]
              px-[10px] py-[2px]
              leading-[110.3%]
              rounded-[4px]"
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                  type="text"
                />

                <EditPanel />
              </>
            ) : (
              <div
                className="font-eigerdals text-[75px]
              pb-[30px] py-[10px]
              text-white
              leading-[90.3%]
              drop-shadow-[0_4px_4px_rgba(0,0,0,0.55)]"
              >
                {userInfo?.username ? (
                  `${userInfo?.username.slice(0, 15)}${userInfo?.username.length > 15 ? "..." : ""}`
                ) : (
                  <Skeleton className="w-[258px] h-[67.5px]" />
                )}
              </div>
            )}
            <div className="flex items-center gap-x-[10px]">
              <button
                type="button"
                className="w-[26px] h-[26px] bg-[white] 
                          hover:scale-[1.3] scale-[1] transition duration-[300ms]
                          flex items-center justify-center
                          drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                          rounded-[3px] cursor-pointer"
              >
                <Media
                  type="image"
                  link="/assets/Profile/home.svg"
                  blurLink="/assets/Profile/home.png"
                  containerClasses="w-[17px] h-[17px]"
                />
              </button>
              <Tooltip
                id="comming_soon_btn"
                message="BADGES,<br />EMBLEMS, &<br />AWARDS<br />COMING SOON"
                place="top"
                style={{
                  backgroundColor: "#DADADA",
                  color: "black",
                  fontFamily: "quicksand",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                <button
                  type="button"
                  className="w-[26px] h-[26px] bg-[white] 
                              flex items-center justify-center
                              hover:scale-[1.3] scale-[1] transition duration-[300ms]
                              drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                              rounded-[3px] cursor-pointer"
                >
                  <Media
                    type="image"
                    link="/assets/Profile/three_dot.svg"
                    blurLink="/assets/Profile/three_dot.png"
                    containerClasses="w-[17px] h-[17px]"
                  />
                </button>
              </Tooltip>
            </div>
          </div>
          <div className="px-6">
            <div className="relative flex justify-between w-full">
              <div className="flex flex-col relative z-[2]">
                <TwitterLocation />
                <div className="flex items-center gap-x-[15px] pt-[70px]">
                  <PFPInformation />
                </div>
              </div>
              <div className="flex flex-col gap-y-[40px] relative z-[2]">
                <ProfileInformation />
                <SimilarProfiles />
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-[3]">
          <WalletCollection />
        </div>
      </div>
    </div>
  )
}

export default DesktopProfileView
