import getCreator from "../../../../lib/firebase/getCreator"

const getProfile = async (addressOrEns) => {
  let response
  try {
    // IF ENS, convert to 0x

    // IF LENS, convert to 0x
    const address = addressOrEns.toLowerCase()
    // LOOKUP USER IN FIREBASE
    console.log("SWEETS getCreator", address)

    const creatorResp = await getCreator(address)
    console.log("SWEETS CREATOR RESPONSE", creatorResp)
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
