import { useCallback, useState } from "react"
import { useDrop } from "react-dnd"
import { useAccount } from "wagmi"
import _ from "lodash"
import { useProfileProvider } from "../../providers/ProfileContext"
import Deploy6551AndMintDNAButton from "./Deploy6551AndMintButton"
import ProfileToken from "./ProfileToken"
import { useUserProvider } from "../../providers/UserProvider"
import getIpfsLink from "../../lib/getIpfsLink"
import { ItemTypes } from "./ItemTypes"
import { useWalletCollectionProvider } from "../../providers/WalletCollectionProvider"
import useERC721Transfer from "../../hooks/useERC721Transfer"
import useCheckNetwork from "../../hooks/useCheckNetwork"
import TransferLoadingModal from "./TransferLoadingModal"

const SmartWalletContents = () => {
  const { isHiddenEditable } = useProfileProvider()
  const { metaData, cre8orNumber, smartWalletAddress } = useUserProvider()
  const { toggleProfileFormattedCollection, nftsSmartWallet, getDNABySmartWallet } =
    useWalletCollectionProvider()

  const { address } = useAccount()
  const { checkNetwork } = useCheckNetwork()

  const [isTransferring, setIsTransferring] = useState(false)

  const { transferERC721 } = useERC721Transfer()

  const afterTransfer = async () => {
    await toggleProfileFormattedCollection()
    await getDNABySmartWallet()
  }

  const dropToSmartWallet = useCallback(
    async (item) => {
      if (!smartWalletAddress || isHiddenEditable || !cre8orNumber || item?.inSmartWallet) return
      if (!checkNetwork()) return

      setIsTransferring(true)

      await transferERC721(
        item?.contractAddress,
        address,
        smartWalletAddress,
        item?.tokenId,
        afterTransfer,
      )

      setIsTransferring(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cre8orNumber, transferERC721, checkNetwork, smartWalletAddress],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ERC721,
      drop: async (item: any) => {
        dropToSmartWallet(item)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [dropToSmartWallet],
  )

  return (
    <>
      <div className="border-r-[2px] pr-[20px] lg:pr-[50px] border-r-[white]" ref={drop}>
        <div
          className="mt-[35px]
                      relative
                      flex items-center justify-center
                      lg:px-2 lg:py-3 p-2
                      rounded-[8px] lg:rounded-[15px]
                      overflow-hidden
                      lg:w-[287px] lg:h-[287px]
                      samsungS8:w-[130px] samsungS8:h-[130px]
                      w-[120px] h-[120px]
                      after:content-[''] 
                      after:bg-[black] 
                      after:opacity-[0.2]
                      after:w-full after:h-full
                      after:absolute
                      after:left-0 
                      after:top-0 
                      after:z-[4]"
        >
          {!smartWalletAddress && !_.isNull(smartWalletAddress) && !isHiddenEditable && (
            <Deploy6551AndMintDNAButton />
          )}
          <div
            className="absolute w-full h-full left-0 top-0 z-[2]
                bg-cover"
            style={{
              backgroundImage: `url('${getIpfsLink(metaData?.image)}')`,
            }}
          />
          <div
            className="grid grid-cols-3 
                w-full h-full
                overflow-y-auto
                no-scrollbar
                relative !z-[5]
                gap-[5px]"
          >
            {nftsSmartWallet?.map((nft) => (
              <ProfileToken token={nft} key={nft?.tokenId} inSmartWallet />
            ))}
          </div>
        </div>
      </div>
      {isTransferring && <TransferLoadingModal />}
    </>
  )
}

export default SmartWalletContents
