import { mainnet } from "@wagmi/core/chains"
import getDefaultProvider from "./getDefaultProvider"
import getAddressByHandle from "./lens/getAddressByHandle"

const getAddressForHandle = async (handle) => {
  const isEns = handle.includes(".eth")
  const isLens = handle.includes(".lens")
  let address = handle.toLowerCase()

  if (isEns) {
    const provider = getDefaultProvider(mainnet.id)
    address = (await provider.resolveName(handle)).toLowerCase()
  } else if (isLens) {
    address = (await getAddressByHandle(handle)).toLowerCase()
  }
  return address
}

export default getAddressForHandle
