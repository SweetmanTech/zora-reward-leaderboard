import { parseEther } from "viem"

const getFilteredTotals = (creatorFees, zoraFees, zoraData) => {
  const zoraFalseFees = zoraData.reduce((total, item) => {
    const baseReward = parseFloat(item.baseReward)
    const ethereumReward = parseFloat(item.ethereumReward)
    const optimismReward = parseFloat(item.optimismReward)
    const zoraReward = parseFloat(item.zoraReward)
    return total + baseReward + ethereumReward + optimismReward + zoraReward
  }, 0)
  const zoraFalseFeeNumber = parseFloat(parseEther(zoraFalseFees.toString()).toString())
  const creatorFilteredFees = parseFloat(creatorFees) - zoraFalseFeeNumber
  const zoraFilteredFees = parseFloat(zoraFees) + zoraFalseFeeNumber
  return { zoraFilteredFees, creatorFilteredFees }
}

export default getFilteredTotals
