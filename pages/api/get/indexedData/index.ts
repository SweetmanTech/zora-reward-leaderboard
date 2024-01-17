import { Get, Query, createHandler } from "next-api-decorators"

const getIndexedData = async (timestamp: number) => {
  const graphQLQuery = {
    query: `query($timestamp: BigInt!) {
                  rewardsDeposits(first: 1000, orderBy: "timestamp", orderDirection: "asc", where: {timestamp_gt: $timestamp}) {
                      id
                      creator
                      createReferral
                      mintReferral
                      firstMinter
                      zora
                      creatorReward
                      createReferralReward
                      firstMinterReward
                      mintReferralReward
                      zoraReward
                      timestamp
                      chain
                  }
              }`,
    variables: {
      timestamp,
    },
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graphQLQuery),
  }
  const results = []
  const response = await fetch("https://ponderer.quickindexer.xyz", options)

  const data = await response.json()
  const rewards: Array<any> = data?.data?.rewardsDeposits
  results.push(...rewards)
  return results
}
class IndexedData {
  @Get()
  async index(@Query("days") days: number) {
    const now = new Date()
    const millisecondsInADay = 24 * 60 * 60 * 1000
    const initialTimestamp = now.getTime() - millisecondsInADay * days
    const results = await getIndexedData(Math.floor(initialTimestamp / 1000))
    let hasMoreResults = results.length > 0
    while (hasMoreResults) {
      const lastTimestamp = results[results.length - 1].timestamp
      // eslint-disable-next-line no-await-in-loop
      const newResults = await getIndexedData(lastTimestamp)
      hasMoreResults = newResults.length > 0
      results.push(...newResults)
    }

    return results
  }
}

export default createHandler(IndexedData)
