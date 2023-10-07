const getProfile = async (addressOrEns) => {
  let response
  try {
    response = { addressOrEns }
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
