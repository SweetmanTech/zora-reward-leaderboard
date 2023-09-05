import { useState } from "react"
import Media from "../../shared/Media"
import HelpModal from "./HelpModal"
import OpenSeaNewPFP from "./OpenSeaNewPFP"

const SmartWalletButtons = () => {
  const [openHelpModal, setOpenHelpModal] = useState(false)
  const [openSeaNewPFP, setOpenSeaNewPFP] = useState(false)
  return (
    <>
      <button
        type="button"
        className="hover:scale-[1.2] scale-[1] transition duration-[300ms]"
        onClick={() => setOpenSeaNewPFP(true)}
      >
        <Media
          type="image"
          containerClasses="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"
          link="/assets/Profile/smart_wallet_setting.svg"
          blurLink="/assets/Profile/smart_wallet_setting.svg"
        />
      </button>
      <button
        type="button"
        className="hover:scale-[1.2] scale-[1] transition duration-[300ms]"
        onClick={() => setOpenHelpModal(true)}
      >
        <Media
          type="image"
          containerClasses="w-[15px] h-[15px] lg:w-[25px] lg:h-[25px]"
          link="/assets/Profile/help.svg"
          blurLink="/assets/Profile/help.svg"
        />
      </button>
      <HelpModal
        isModalVisible={openHelpModal}
        toggleIsVisible={() => setOpenHelpModal(!openHelpModal)}
      />
      <OpenSeaNewPFP
        isModalVisible={openSeaNewPFP}
        toggleIsVisible={() => setOpenSeaNewPFP(!openSeaNewPFP)}
      />
    </>
  )
}

export default SmartWalletButtons
