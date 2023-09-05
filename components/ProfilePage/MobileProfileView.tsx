import Media from "../../shared/Media"
import ProfileInformation from "./Desktop/ProflileInformation"
import TwitterLocation from "./Mobile/TwitterLocation"
import SimilarProfiles from "./Mobile/SimilarProfiles"
import WalletCollection from "./WalletCollection"
import { useUserProvider } from "../../providers/UserProvider"
import { useProfileProvider } from "../../providers/ProfileContext"
import Cre8orPFP from "./Cre8orPFP"
import Skeleton from "./Sketelon"

const MobileProfileView = () => {
  const { userInfo, metaData } = useUserProvider()
  const { isEditable, editedUserName, setEditedUserName, setIsEditable, isHiddenEditable } =
    useProfileProvider()

  return (
    <div
      className="relative 
          w-[300px]
          samsungS8:w-[325px]
          xs:w-[360px]
          rounded-[10px]
          bg-cover
          bg-center
          overflow-hidden"
      style={{
        backgroundImage: `url('/assets/Profile/MOBILE PROFILE BGS/${metaData?.attributes
          .filter((attr) => attr.trait_type === "Environment")[0]
          .value.toUpperCase()
          .replaceAll(" ", "_")}_MOBILE.png')`,
      }}
    >
      <div
        className={`relative z-[3] left-0 top-0 w-full h-full
              flex flex-col items-center
              pt-6`}
      >
        <div
          className="bg-white rounded-[15px]
        py-2 px-4"
        >
          {isEditable ? (
            <div className="flex justify-center">
              <input
                className="relative z-[105] 
            text-[40px] leading-[99.3%] 
            font-eigerdals font-bold
            w-[190px]
            ring-0 outline-none
            border-[lightgray] border-[1px]
            bg-[#D9D9D9]
            px-[10px] py-[2px]
            rounded-[4px]"
                onChange={(e) => setEditedUserName(e.target.value)}
                value={editedUserName}
              />{" "}
            </div>
          ) : (
            <div className="flex justify-center ">
              <div
                className="font-eigerdals text-[27px] samsungS8:text-[30px] xs:text-[33px] text-center
            leading-[100%]"
              >
                {userInfo?.username ? (
                  `${userInfo?.username.slice(0, 15)}${userInfo?.username.length > 15 ? "..." : ""}`
                ) : (
                  <Skeleton className="w-[200px] h-[40px]" />
                )}
              </div>
            </div>
          )}
          <TwitterLocation />
          <div className="w-full flex justify-center items-center px-10 gap-x-[10px] pt-[15px]">
            {!isHiddenEditable && (
              <button
                className="w-[26px] h-[26px] bg-[black]
                              flex items-center justify-center
                              rounded-[2px] cursor-pointer"
                type="button"
                onClick={() => setIsEditable(!isEditable)}
              >
                <Media
                  type="image"
                  link="/assets/Profile/white_edit.svg"
                  blurLink="/assets/Profile/white_edit.png"
                  containerClasses="w-[17px] h-[17px]"
                />
              </button>
            )}
            <div
              className="w-[26px] h-[26px] bg-[black] 
                            flex items-center justify-center
                            rounded-[3px] cursor-pointer"
            >
              <Media
                type="image"
                link="/assets/Profile/white_home.svg"
                blurLink="/assets/Profile/white_home.png"
                containerClasses="w-[17px] h-[17px]"
              />
            </div>
            <div
              className="w-[26px] h-[26px] bg-[black] 
                            flex items-center justify-center
                            rounded-[3px] cursor-pointer"
            >
              <Media
                type="image"
                link="/assets/Profile/white_three_dot.svg"
                blurLink="/assets/Profile/white_three_dot.png"
                containerClasses="w-[17px] h-[17px]"
              />
            </div>
          </div>
        </div>
        <Cre8orPFP />

        <div
          className="bg-white rounded-[15px]
        mt-[30px]
        w-[260px]"
        >
          <ProfileInformation />
          <SimilarProfiles />
        </div>

        <WalletCollection />
      </div>
    </div>
  )
}

export default MobileProfileView
