import getCreator from "../../../../lib/firebase/getCreator"
import getAddressForHandle from "../../../../lib/getAddressForHandle"

const getProfile = async (addressOrEns) => {
  let response
  try {
    const address = await getAddressForHandle(addressOrEns)
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
