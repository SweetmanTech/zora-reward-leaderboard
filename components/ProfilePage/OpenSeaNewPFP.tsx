/* eslint-disable no-nested-ternary */
import { FC } from "react"
import Modal from "../../shared/Modal"
import { Button } from "../../shared/Button"
import { useWalletCollectionProvider } from "../../providers/WalletCollectionProvider"

interface OpenSeaNewPFPProps {
  isModalVisible: boolean
  toggleIsVisible: () => void
}
const OpenSeaNewPFP: FC<OpenSeaNewPFPProps> = ({ isModalVisible, toggleIsVisible }) => {
  const { setIsViewAll, setShouldSelectNewPFP } = useWalletCollectionProvider()

  return (
    <Modal
      id="help_smart_wallet"
      isVisible={isModalVisible}
      onClose={toggleIsVisible}
      containerClassName="!rounded-[20px] md:!rounded-[30px] overflow-hidden bg-white
        drop-shadow-[2px_3px_2px_rgba(0,0,0,0.25)]"
      modalClassName="!z-[110]"
    >
      <div
        className="px-4 py-8 samsungS8:p-6 xs:p-8 xl:p-6 rounded-lg
            flex-col flex justify-center items-center
            gap-y-[20px] md:gap-y-[30px]
            md:w-[620px] md:h-[320px]
            bg-white"
      >
        <Button
          id="opensea_via_smart_wallet"
          className="!w-[250px] !h-[50px]
              md:!w-[513px] md:!h-[103px]
              !p-0
              !bg-black
              !text-white !text-[12px] md:!text-[23px]"
          onClick={() => {
            setIsViewAll(false)
            setShouldSelectNewPFP(true)
            toggleIsVisible()
          }}
        >
          SELECT NEW SMART WALLET PFP
        </Button>
      </div>
    </Modal>
  )
}

export default OpenSeaNewPFP
