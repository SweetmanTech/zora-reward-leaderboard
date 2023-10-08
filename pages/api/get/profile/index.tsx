import { mainnet } from "wagmi"
import getCreator from "../../../../lib/firebase/getCreator"
import getDefaultProvider from "../../../../lib/getDefaultProvider"
import { polygon } from "@wagmi/core/dist/chains"
import getAddressByHandle from "../../../../lib/lens/getAddressByHandle"

const getProfile = async (addressOrEns) => {
  let response
  try {
    let address = addressOrEns.toLowerCase()
    const isEns = addressOrEns.includes(".eth")
    const isLens = addressOrEns.includes(".lens")
    // IF ENS, convert to 0x
    if (isEns) {
      const provider = getDefaultProvider(mainnet.id)
      address = (await provider.resolveName(addressOrEns)).toLowerCase()
    } else if (isLens) {
      // IF LENS, convert to 0x
      address = (await getAddressByHandle(addressOrEns)).toLowerCase()
    }

    // LOOKUP USER IN FIREBASE
    const creatorResp = await getCreator(address)

    response = creatorResp
  } catch (ex) {
    response = { data: false }
    console.error(ex)
  }
  return response
}

export default async function handler(req: any, res: any) {
  const data = await getProfile(req?.query?.addressOrEns)
  res.status(200).json(data)
}
