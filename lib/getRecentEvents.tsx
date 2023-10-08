import getBlocksPerDay from "./getBlocksPerDay"

const getRecentEvents = (events, chainId, numberOfDays) => {
  // Calculate the number of blocks for the given number of days
  const blocksPerDay = getBlocksPerDay(chainId)
  const totalBlocks = numberOfDays * blocksPerDay

  // Sort events based on blockNumber in descending order
  const sortedEvents = [...events].sort(
    (a, b) => parseInt(b.blockNumber, 16) - parseInt(a.blockNumber, 16),
  )

  // Get the latest block number
  const latestBlockNumber = parseInt(sortedEvents[0].blockNumber, 16) // Convert hex to decimal

  // Determine the oldest block number that we're interested in
  const oldestBlockNumber = latestBlockNumber - totalBlocks

  // Filter events that are in the range
  return sortedEvents.filter((event) => parseInt(event.blockNumber, 16) >= oldestBlockNumber)
}

export default getRecentEvents
