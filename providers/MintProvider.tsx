import { useContext, createContext, ReactNode, FC, useState, useEffect, useMemo } from "react"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { mainnet, polygon, goerli, polygonMumbai } from "@wagmi/core/chains"
import { toast } from "react-toastify"
import { getAvailableFreeMints } from "../lib/freeMinter"
import { getPassportIds } from "../lib/claimPassport"
import useSaleStatus from "../hooks/mintDay/useSaleStatus"

interface mintProps {
  passportIds: any
  availablePassportIds: any
  hasFriendAndFamily: boolean | null
  hasPassport: boolean | null
  hasUnclaimedFreeMint: boolean | null
  freeMintCount: number | null
  loadingSaleStatus: boolean
  publicSaleActive: boolean | null
  presaleActive: boolean | null
  presaleStart: number
  publicSaleStart: number
  publicSalePrice: string
  checkNetwork: () => boolean
  refetchInformation: () => Promise<void>
  isReloadingChainData: boolean
  isLoadingInitialize: boolean
}

interface Props {
  children: ReactNode
}

const MintContext = createContext<Partial<mintProps> | null>(null)

export const MintProvider: FC<Props> = ({ children }) => {
  const { address } = useAccount()
  const [hasFriendAndFamily, setHasFriendAndFamily] = useState<boolean | null>(null)
  const [hasPassport, setHasPassport] = useState<boolean | null>(null)
  const [hasUnclaimedFreeMint, setHasUnclaimedFreeMint] = useState<boolean | null>(null)
  const [passportIds, setPassportIds] = useState(null)
  const [freeMintClaimedCount, setFreeMintClaimedCount] = useState<number | null>(null)
  const [availablePassportIds, setAvailablePassportIds] = useState([] as any)
  const { chain: activeChain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isReloadingChainData, setIsReloadingChaindData] = useState(false)
  const [isLoadingInitialize, setIsLoadingInitialize] = useState(false)

  const saleStatus = useSaleStatus()

  const getInitialData = async () => {
    if (!address) return

    const passportsArray = await getPassportIds(address)
    const tokenIds = passportsArray?.map((passport: any) => passport?.id?.tokenId)
    if (tokenIds?.length > 0) setPassportIds(tokenIds)
    const results = await getAvailableFreeMints(tokenIds, address)

    setHasPassport(passportsArray?.length > 0)
    setFreeMintClaimedCount(results?.passports?.length)
    setHasUnclaimedFreeMint(results?.passports?.length > 0)
    setHasFriendAndFamily(results?.discount)
    setAvailablePassportIds(results?.passports)
  }

  const freeMintCount = useMemo(() => {
    if (hasFriendAndFamily === null || hasPassport === null || hasUnclaimedFreeMint === null)
      return null
    return (hasFriendAndFamily ? 1 : 0) + (freeMintClaimedCount || 0)
  }, [freeMintClaimedCount, hasFriendAndFamily, hasUnclaimedFreeMint, hasPassport])

  const checkNetwork = () => {
    if (activeChain?.id !== parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10)) {
      switchNetwork(parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10))
      const allChains = [mainnet, goerli, polygon, polygonMumbai]
      const myChain = allChains.find(
        (blockchain) => blockchain.id === parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10),
      )
      toast.error(`Please connect to ${myChain.name} and try again`)

      return false
    }

    return true
  }

  const refetchInformation = async () => {
    setIsReloadingChaindData(true)
    await getInitialData()
    setIsReloadingChaindData(false)
  }

  const initializeInformation = async () => {
    setIsLoadingInitialize(true)
    await saleStatus.initializeStatus()
    setFreeMintClaimedCount(null)
    setHasUnclaimedFreeMint(null)
    setHasFriendAndFamily(null)
    setAvailablePassportIds(null)
    await getInitialData()
    setIsLoadingInitialize(false)
  }

  useEffect(() => {
    if (!address) return
    const init = async () => {
      await initializeInformation()
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address])

  const provider = useMemo(
    () => ({
      ...saleStatus,
      isReloadingChainData,
      isLoadingInitialize,
      availablePassportIds,
      freeMintCount,
      passportIds,
      hasPassport,
      hasUnclaimedFreeMint,
      hasFriendAndFamily,
      checkNetwork,
      refetchInformation,
    }),
    [
      saleStatus,
      isReloadingChainData,
      isLoadingInitialize,
      availablePassportIds,
      freeMintCount,
      passportIds,
      hasPassport,
      hasUnclaimedFreeMint,
      hasFriendAndFamily,
      checkNetwork,
      refetchInformation,
    ],
  )

  return <MintContext.Provider value={provider}>{children}</MintContext.Provider>
}

export const useMintProvider = () => useContext(MintContext)
