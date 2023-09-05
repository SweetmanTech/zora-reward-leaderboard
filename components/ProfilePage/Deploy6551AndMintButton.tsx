import { useState } from "react"
import { Button } from "../../shared/Button"
import SettingSmartWalletModal from "./SettingSmartWalletModal"
import useCheckNetwork from "../../hooks/useCheckNetwork"
import useCreateTBA from "../../hooks/useCreateTBA"
import { useUserProvider } from "../../providers/UserProvider"

const Deploy6551AndMintDNAButton = () => {
  const { cre8orNumber, getSmartWalletAddress } = useUserProvider()
  const { checkNetwork } = useCheckNetwork()
  const { createTbaAndMintDna } = useCreateTBA()
  const [openLoadingModal, setOpenLoadingModal] = useState(false)

  const onClick = async () => {
    if (!checkNetwork()) return

    setOpenLoadingModal(true)
    await createTbaAndMintDna(cre8orNumber)
    await getSmartWalletAddress()
    setOpenLoadingModal(false)
  }

  return (
    <>
      <div
        className="absolute left-0 top-0 z-[6]
      w-full h-full
      flex items-center justify-center"
      >
        <Button
          onClick={onClick}
          id="deploy-wallet"
          className="w-[100px] h-[30px]
          !p-0
          md:w-[240px] md:h-[60px]
          !bg-[white] !text-[black]
          !text-[8px] md:!text-[18px]"
        >
          setup smart wallet
        </Button>
      </div>
      <SettingSmartWalletModal
        isModalVisible={openLoadingModal}
        toggleIsVisible={() => setOpenLoadingModal(!openLoadingModal)}
      />
    </>
  )
}

export default Deploy6551AndMintDNAButton
