import { useMediaQuery } from "usehooks-ts"
import { useAccount } from "wagmi"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../Layout"
import DesktopProfileView from "./DesktopProfileView"
import MobileProfileView from "./MobileProfileView"
import { Button } from "../../shared/Button"
import { useProfileProvider } from "../../providers/ProfileContext"
import { useUserProvider } from "../../providers/UserProvider"
import { WallectCollectionProvider } from "../../providers/WalletCollectionProvider"

const ProfilePage = () => {
  const routerAddress = useRouter().query.address as string
  const isMobile = useMediaQuery("(max-width: 1024px)")

  const { isEditable, saveProfile, setIsEditable, setIsHiddenEditable } = useProfileProvider()

  const { getUserData, getUserSimilarProfiles } = useUserProvider()

  const { address } = useAccount()

  useEffect(() => {
    getUserData(routerAddress)
    getUserSimilarProfiles(routerAddress)

    if (address?.toLowerCase() !== routerAddress?.toLowerCase() && routerAddress) {
      setIsHiddenEditable(true)
      return
    }

    setIsHiddenEditable(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerAddress, getUserData, getUserSimilarProfiles])

  return (
    <Layout type="contained">
      <div className="flex justify-center">
        <div className="max-w-[1280px]">
          <WallectCollectionProvider>
            <div
              className="relative !z-[11] pt-[8rem] px-2 samsungS8:px-4 lg:px-0
                    w-full flex flex-col justify-center"
            >
              {isMobile ? (
                <>
                  {isEditable && (
                    <div className="flex justify-center mb-[20px]">
                      <div
                        className="w-[280px] h-[40px]
                              rounded-[20px] bg-white
                              flex items-center justify-center
                              gap-x-[10px]"
                      >
                        <div
                          className="text-black text-[12px]
                                  font-quicksand font-medium"
                        >
                          You are in editing mode.
                        </div>
                        <Button
                          id="save-btn"
                          className="!p-0 !w-[70px] !h-[30px] !rounded-[15px] 
                                  !text-[12px] !bg-[black] !text-white
                                  !font-quicksand !font-bold !uppercase"
                          onClick={saveProfile}
                        >
                          Save
                        </Button>
                        <Button
                          id="cancel-btn"
                          className="!p-0 !w-[30px] !h-[30px] !rounded-full 
                                  !text-[12px] !bg-[black] !text-white
                                  !font-quicksand !font-bold !uppercase"
                          onClick={() => setIsEditable(false)}
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  )}
                  <MobileProfileView />
                </>
              ) : (
                <DesktopProfileView />
              )}
            </div>
          </WallectCollectionProvider>
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage
