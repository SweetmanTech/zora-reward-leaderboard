import { useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Media from "../../shared/Media"
import TrainModal from "./TrainModal"
import { useProfileProvider } from "../../providers/ProfileContext"
import SmartWalletContents from "./SmartWalletContents"
import OwnerWalletContents from "./OwnerWalletContents"
import { useWalletCollectionProvider } from "../../providers/WalletCollectionProvider"
import SmartWalletButtons from "./SmartWalletButtons"

const WalletCollection = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)")
  const { expandedMore, setExpandedMore, isHiddenEditable } = useProfileProvider()
  const [openTraninModal, setOpenTrainModal] = useState(false)

  const { isViewAll, setIsViewAll } = useWalletCollectionProvider()

  const toggleTraninModal = () => {
    setOpenTrainModal(!openTraninModal)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className={`${
          !expandedMore
            ? `${
                isMobile ? "mobile_un_expand_more" : "un_expand_more"
              } h-[55px] lg:h-[70px] overflow-hidden bg-black`
            : `${isMobile ? "mobile_expand_more" : "expand_more"} h-[220px] lg:h-[415px]
              bg-black`
        } 
          rounded-t-[10px] lg:rounded-t-[20px]
          w-full flex justify-between items-start 
          mt-[20px] pt-[20px]
          samsungS8:gap-x-[10px]
          lg:px-10 lg:pb-10
          px-2 pb-6`}
      >
        <div>
          <div className="flex items-center gap-x-[5px] md:gap-x-[10px]">
            {!isHiddenEditable && <SmartWalletButtons />}
            <p
              className="text-[9px] text-white
              samsungS8:text-[12px] lg:text-[22px] font-quicksand font-bold
              uppercase"
            >
              SMART WALLET
            </p>
            <button type="button" onClick={() => setExpandedMore(!expandedMore)}>
              <Media
                type="image"
                containerClasses="w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]"
                link={`${
                  expandedMore ? "/assets/Profile/arrow_up.svg" : "/assets/Profile/arrow_down.svg"
                }`}
                blurLink={`${
                  expandedMore ? "/assets/Profile/arrow_up.png" : "/assets/Profile/arrow_down.png"
                }`}
              />
            </button>
          </div>
          <SmartWalletContents />
        </div>
        <div>
          <div
            className={`flex items-center ${
              !expandedMore || isMobile ? "justify-end" : "justify-between"
            }
          xl:min-w-[641px]`}
          >
            {!isMobile && expandedMore && (
              <div
                className="flex font-quicksand font-bold
              gap-[15px]"
              >
                <div className="text-white uppercase">Wallet</div>
                <div className="flex justify-center w-16 h-6 cursor-pointer">
                  <button
                    type="button"
                    className="flex items-center bg-[white] rounded-full w-full h-6 pl-2"
                    onClick={() => setIsViewAll(!isViewAll)}
                  >
                    <div
                      className={`${
                        !isViewAll ? "translate-x-[calc(100%+11px)]" : "translate-x-[-5px]"
                      } 
                      bg-[black]
                      w-5 h-5 rounded-full 
                      transition duration-[300ms] ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]`}
                    />
                  </button>
                </div>
                <div className="text-white uppercase">CRE8ORS</div>
              </div>
            )}
            <div className="flex gap-x-[10px] items-center">
              <p
                className="text-[9px] text-white
                samsungS8:text-[12px] lg:text-[22px] font-quicksand font-bold
                uppercase"
              >
                VIEW COLLECTION
              </p>
              <button type="button" onClick={() => setExpandedMore(!expandedMore)}>
                <Media
                  type="image"
                  containerClasses="w-[15px] h-[15px] lg:w-[22px] lg:h-[22px]"
                  link={`${
                    expandedMore ? "/assets/Profile/arrow_up.svg" : "/assets/Profile/arrow_down.svg"
                  }`}
                  blurLink={`${
                    expandedMore ? "/assets/Profile/arrow_up.png" : "/assets/Profile/arrow_down.png"
                  }`}
                />
              </button>
            </div>
          </div>
          <OwnerWalletContents setOpenTrainModal={setOpenTrainModal} />
        </div>
      </div>
      <TrainModal isModalVisible={openTraninModal} toggleIsVisible={toggleTraninModal} />
    </DndProvider>
  )
}

export default WalletCollection
