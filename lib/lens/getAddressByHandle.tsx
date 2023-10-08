import getLensHub from "./getLensHub"

const getAddressByHandle = async (handle) => {
  try {
    const contract = getLensHub()
    const tokenId = await contract.getProfileIdByHandle(handle)
    const ownerOf = await contract.ownerOf(tokenId)
    return ownerOf
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err)
    return false
  }
}

export default getAddressByHandle
