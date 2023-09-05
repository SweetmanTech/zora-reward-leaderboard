import {
  useContext,
  createContext,
  ReactNode,
  FC,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react"
import getProfileFormattedCollection, {
  ALLNFTS,
  SPECIALNFTS,
} from "../lib/getProfileFormattedCollection"
import { useRouter } from "next/router"
import { useAccount } from "wagmi"
import _ from "lodash"
import { useUserProvider } from "./UserProvider"

interface Props {
  children: ReactNode
}

const WalletCollectionContext = createContext<Partial<any> | null>(null)

export const WallectCollectionProvider: FC<Props> = ({ children }) => {
  const router = useRouter()

  const [selectedTrainTokenData, setSelectedTrainTokenData] = useState<any>(null)
  const { smartWalletAddress } = useUserProvider()
  const [shouldSelectNewPFP, setShouldSelectNewPFP] = useState(false)
  const [isViewAll, setIsViewAll] = useState(null)
  const [walletNfts, setWalletNfts] = useState(null)
  const [cre8ors, setCre8ors] = useState(null)
  const [nftsSmartWallet, setNftsSmartWallet] = useState(null)
  const [ownedNfts, setOwnedNfts] = useState([])
  const { address } = useAccount()

  const routerAddress = router.query.address as string

  const toggleProfileFormattedCollection = useCallback(async () => {
    if (isViewAll) {
      if (walletNfts === null) {
        const response = await getProfileFormattedCollection(routerAddress || address, ALLNFTS)
        setWalletNfts(response)
        setOwnedNfts(response)
        return
      }
      setOwnedNfts([...walletNfts])
    } else {
      if (cre8ors === null) {
        const response = await getProfileFormattedCollection(routerAddress || address, SPECIALNFTS)
        setCre8ors(response)
        setOwnedNfts(response)
        return
      }
      setOwnedNfts([...cre8ors])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isViewAll, address])

  const getDNABySmartWallet = useCallback(async () => {
    const nftResponse = await getProfileFormattedCollection(smartWalletAddress, ALLNFTS)
    setNftsSmartWallet(nftResponse)
  }, [smartWalletAddress])

  const refetchProfileFormattedCollection = async () => {
    const walletResponse = await getProfileFormattedCollection(routerAddress || address, ALLNFTS)
    setWalletNfts(walletResponse)
    const cre8orResponse = await getProfileFormattedCollection(
      routerAddress || address,
      SPECIALNFTS,
    )
    setCre8ors(cre8orResponse)
    setOwnedNfts(isViewAll ? walletResponse : cre8orResponse)
  }

  useEffect(() => {
    toggleProfileFormattedCollection()
  }, [toggleProfileFormattedCollection])

  useEffect(() => {
    getDNABySmartWallet()
  }, [getDNABySmartWallet])

  const provider = useMemo(
    () => ({
      nftsSmartWallet,
      ownedNfts,
      isViewAll,
      shouldSelectNewPFP,
      setIsViewAll,
      setWalletNfts,
      setCre8ors,
      setOwnedNfts,
      setSelectedTrainTokenData,
      selectedTrainTokenData,
      toggleProfileFormattedCollection,
      getDNABySmartWallet,
      refetchProfileFormattedCollection,
      setShouldSelectNewPFP,
    }),
    [
      nftsSmartWallet,
      ownedNfts,
      isViewAll,
      shouldSelectNewPFP,
      setIsViewAll,
      setWalletNfts,
      setCre8ors,
      setOwnedNfts,
      setSelectedTrainTokenData,
      selectedTrainTokenData,
      toggleProfileFormattedCollection,
      getDNABySmartWallet,
      refetchProfileFormattedCollection,
      setShouldSelectNewPFP,
    ],
  )

  return (
    <WalletCollectionContext.Provider value={provider}>{children}</WalletCollectionContext.Provider>
  )
}

export const useWalletCollectionProvider = () => useContext(WalletCollectionContext)
