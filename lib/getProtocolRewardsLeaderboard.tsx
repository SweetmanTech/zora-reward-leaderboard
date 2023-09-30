import { base, mainnet, optimism, zora } from "@wagmi/core/chains"
import { getRewardsDepositEvents } from "./getRewardsDepositEvents"

const getProtocolRewardsLeaderboard = async (numberOfDays) => {
  const chains = [
    { id: mainnet.id, key: "ethereumReward" },
    { id: optimism.id, key: "optimismReward" },
    { id: base.id, key: "baseReward" },
    { id: zora.id, key: "zoraReward" },
  ]

  let allData = []

  for (const chain of chains) {
    const data = await getRewardsDepositEvents(chain.id, numberOfDays)
    allData = allData.concat(data.map((item) => ({ ...item, rewardType: chain.key })))
  }

  const groupedData = allData.reduce((acc, curr) => {
    const recipients = [curr.creator, curr.createReferral, curr.firstMinter, curr.mintReferral]
    const fees = [
      curr.creatorReward,
      curr.createReferralReward,
      curr.firstMinterReward,
      curr.mintReferralReward,
    ]

    for (let i = 0; i < recipients.length; i += 1) {
      if (!acc[recipients[i]]) {
        acc[recipients[i]] = {
          totalCreatorReward: BigInt(0),
          baseReward: BigInt(0),
          optimismReward: BigInt(0),
          ethereumReward: BigInt(0),
          zoraReward: BigInt(0),
        }
      }
      acc[recipients[i]][curr.rewardType] += BigInt(fees[i])
      acc[recipients[i]].totalCreatorReward += BigInt(fees[i])
    }

    return acc
  }, {})

  const results = Object.entries(groupedData)
    .map(([creator, rewards]: any) => ({
      creator,
      totalCreatorReward: rewards.totalCreatorReward.toString(),
      baseReward: rewards.baseReward.toString(),
      optimismReward: rewards.optimismReward.toString(),
      ethereumReward: rewards.ethereumReward.toString(),
    }))
    .sort((a, b) => {
      if (BigInt(a.totalCreatorReward) < BigInt(b.totalCreatorReward)) {
        return 1
      }
      if (BigInt(a.totalCreatorReward) > BigInt(b.totalCreatorReward)) {
        return -1
      }
      return 0
    })

  console.log("SWEETS RESULTS", results)
  return results
}

export default getProtocolRewardsLeaderboard
