import getSecondsPerBlock from "./getSecondsPerBlock"

const getBlocksPerDay = (chainId) => {
  const secondsPerBlock = getSecondsPerBlock(chainId)
  const blocksPerDay = Math.round((24 * 60 * 60) / secondsPerBlock)
  return blocksPerDay
}

export default getBlocksPerDay
