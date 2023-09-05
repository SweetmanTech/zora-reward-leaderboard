/* eslint-disable no-nested-ternary */
import { FC } from "react"
import Modal from "../../shared/Modal"
import Media from "../../shared/Media"

interface HelpModalProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
}
const HelpModal: FC<HelpModalProps> = ({ isModalVisible, toggleIsVisible }) => (
  <Modal
    id="help_snart_wallet"
    isVisible={isModalVisible}
    onClose={toggleIsVisible}
    containerClassName="!rounded-[20px] md:!rounded-[30px] overflow-hidden !bg-white
      drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]"
    modalClassName="!z-[110]"
  >
    <div
      className="px-4 py-8 samsungS8:p-6 xs:p-8 xl:p-6 rounded-lg
          flex-col flex justify-center items-center
          gap-y-[20px] md:gap-y-[30px]
          md:w-[620px] md:h-[320px]
          !bg-white"
    >
      <Media
        type="image"
        containerClasses="w-[25px] h-[25px] lg:w-[44px] lg:h-[44px]"
        link="/assets/Profile/black_help.svg"
        blurLink="/assets/Profile/black_help.svg"
      />
      <pre
        className="font-bold font-quicksand 
        text-[17px] md:text-[31px] 
        text-black text-center
        leading-[120.3%]"
      >
        {`To use the smart wallet, simply\ndrag and drop your NFTs from\nyour collection over to your\nsmart wallet.`}
      </pre>
    </div>
  </Modal>
)

export default HelpModal
