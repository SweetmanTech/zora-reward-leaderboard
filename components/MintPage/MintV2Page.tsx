import { useEffect, useMemo, useRef, useState } from "react"
import { useAccount } from "wagmi"
import { Button } from "../../shared/Button"
import Media from "../../shared/Media"
import Layout from "../Layout"
import useShakeEffect from "../../hooks/useShakeEffect"
import MintingModal from "./MintV2/MintingModal"
import SuccessModal from "./MintV2/SuccessModal"
import useCre8orMintV2 from "../../hooks/mintDay/useCre8orMintV2"
import WalletConnectButton from "../WalletConnectButton"
import SoldoutModal from "./MintV2/SoldoutModal"
import CTAButtons from "./MintV2/CTAButtons"
import AmountButton from "./MintV2/AmountButton"
import useCre8orNumber from "../../hooks/mintDay/useCre8orNumber"
import { updateUserCre8orNumber } from "../../lib/userInfo"

const MintV2Page = () => {
  const MAX_SUPPLY = 4444
  const [mintQuantity, setMintQuantity] = useState(1)
  const { isConnected, address } = useAccount()

  const { getCre8orNumber } = useCre8orNumber({ address })
  const minusRef = useRef()
  const mintRef = useRef()
  const [isMintLoading, setIsMintLoading] = useState(false)

  const [openSuccessModal, setOpenSuccessModal] = useState(false)
  const [openSoldOutModal, setOpenSoldOutModal] = useState(false)

  const { mint, totalSupply, getTotalSupply } = useCre8orMintV2()

  const isSoldout = useMemo(() => parseInt(totalSupply, 10) === MAX_SUPPLY, [totalSupply])

  const increateAmount = () => {
    setMintQuantity(mintQuantity + 1)
  }

  const decreaseAmount = () => {
    if (mintQuantity === 1) return
    setMintQuantity(mintQuantity - 1)
  }

  const mintNFT = async () => {
    if (!mintQuantity) return

    setIsMintLoading(true)
    const response = await mint(mintQuantity)
    if (!response.err) {
      await getTotalSupply()
      const cre8orNumber = await getCre8orNumber()
      await updateUserCre8orNumber({
        walletAddress: address,
        cre8orNumber,
      })
      setOpenSuccessModal(true)
    }

    setIsMintLoading(false)
  }

  useShakeEffect({
    ref: minusRef,
    isEnabled: mintQuantity === 1,
  })

  useShakeEffect({
    ref: mintRef,
    isEnabled: isSoldout,
  })

  useEffect(() => {
    setOpenSoldOutModal(isSoldout)
  }, [isSoldout])

  return (
    <>
      <Layout type="contained">
        <div
          className="relative w-[100%] h-[100vh]
                            flex flex-col items-center justify-center
                            pt-[60px] md:pt-0
                            fade_in_text"
        >
          <Media
            type="image"
            link="/assets/MintV2/mint-here.svg"
            blurLink="/assets/MintV2/mint-here.png"
            containerClasses="md:w-[500px] md:h-[172px]
                        w-[300px] h-[103px]"
          />
          <pre
            className="fade_in_text text-[15px] md:text-[20px] font-quicksand font-medium
                    text-center leading-[99.3%]"
          >
            {`No lockup. No allowlist.\nFirst come, first serve.\nPrice: 0.05 ETH`}
          </pre>
          <div
            className="flex justify-center items-center
                    gap-x-[30px]
                    pt-[10px] md:pt-[30px]
                    fade_in_text"
          >
            <div ref={minusRef}>
              <AmountButton onClick={decreaseAmount}> - </AmountButton>
            </div>
            <div
              className="font-bold font-eigerdals 
                            uppercase text-black rounded bg-[white] 
                            shadow-[0px_4px_4px_rgb(0,0,0,0.25)]
                            flex items-center justify-center gap-[10px]
                            text-[35px] md:text-[50px] 
                            md:w-[120px] md:h-[120px]
                            w-[70px] h-[70px]
                            rounded-[16px]"
            >
              {mintQuantity}
            </div>
            <AmountButton onClick={increateAmount}>+</AmountButton>
          </div>
          <pre
            className="text-[16px] md:text-[21px] font-quicksand font-medium
                    pt-[15px] md:pt-[20px]"
          >
            {totalSupply || "---"} / {MAX_SUPPLY}
          </pre>
          {isConnected ? (
            <div ref={mintRef}>
              <Button
                id="mint_btn"
                className="my-[15px] md:my-[20px] !p-0 md:w-[150px] md:h-[55px]
                          h-[40px] w-[130px] fade_in_text
                          !text-white
                          !shadow-[0px_4px_4px_rgb(0,0,0,0.25)]
                          !bg-[black]"
                onClick={mintNFT}
              >
                Mint Now
              </Button>
            </div>
          ) : (
            <WalletConnectButton>
              <div
                className="uppercase
            text-[16px] text-white
            rounded-[5px]
            hover:scale-[1.1] scale-[1] transition duration-[300ms]
            bg-[black] 
            shadow-[0px_4px_4px_rgb(0,0,0,0.25)]
            flex items-center justify-center gap-[10px]
            font-quicksand font-bold
            my-[15px] md:my-[20px] 
            !p-0 
            md:w-[200px] md:h-[50px]
            h-[40px] w-[130px] fade_in_text"
              >
                Connect Wallet
              </div>
            </WalletConnectButton>
          )}
          <CTAButtons />
        </div>
      </Layout>
      {isMintLoading && <MintingModal />}
      <SuccessModal
        isModalVisible={openSuccessModal}
        toggleIsVisible={() => setOpenSuccessModal(!openSuccessModal)}
        quantity={mintQuantity}
      />
      <SoldoutModal
        isModalVisible={openSoldOutModal}
        toggleIsVisible={() => setOpenSoldOutModal(!openSoldOutModal)}
      />
    </>
  )
}

export default MintV2Page
