export const getChainBreakdowns = (protocolRewards) => {
  const chains = []
  if (protocolRewards.ethereumReward !== "0.0") {
    chains.push({
      chainSymbol: "ETH",
      amount: protocolRewards.ethereumReward,
    })
  }
  if (protocolRewards.optimismReward !== "0.0") {
    chains.push({
      chainSymbol: "OP",
      amount: protocolRewards.optimismReward,
    })
  }
  if (protocolRewards.baseReward !== "0.0") {
    chains.push({
      chainSymbol: "BASE",
      amount: protocolRewards.baseReward,
    })
  }
  if (protocolRewards.zoraReward !== "0.0") {
    chains.push({
      chainSymbol: "ZORA",
      amount: protocolRewards.zoraReward,
    })
  }
  return chains
}
