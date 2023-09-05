import Image from "next/image"
import { useMemo } from "react"
import { zorbImageDataURI } from "@zoralabs/zorb"
import { useAccount } from "wagmi"

const SWEETS = "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38"

const Zorb = ({ address = "" }) => {
  const { address: wagmiAddress } = useAccount()
  const zorbImage = useMemo(
    () => zorbImageDataURI(address || wagmiAddress || SWEETS),
    [address, wagmiAddress],
  )

  return <Image src={zorbImage} alt="zorb" width={50} height={50} className="cursor-pointer" />
}

export default Zorb
