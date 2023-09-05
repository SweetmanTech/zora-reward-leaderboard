import Image from "next/image"
import { useMemo } from "react"
import { zorbImageDataURI } from "@zoralabs/zorb"

const SWEETS = "0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38"

const Zorb = ({ address }) => {
  const zorbImage = useMemo(() => zorbImageDataURI(address || SWEETS), [address])

  return <Image src={zorbImage} alt="zorb" width={50} height={50} className="cursor-pointer" />
}

export default Zorb
