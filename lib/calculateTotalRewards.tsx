const calculateTotalRewards = (creatorAddress, events) =>
  events
    .reduce((accum, event) => {
      let total = accum

      if (event.creator.toLowerCase() === creatorAddress.toLowerCase()) {
        total += BigInt(event.creatorReward)
      }
      if (event.createReferral.toLowerCase() === creatorAddress.toLowerCase()) {
        total += BigInt(event.createReferralReward)
      }
      if (event.mintReferral.toLowerCase() === creatorAddress.toLowerCase()) {
        total += BigInt(event.mintReferralReward)
      }
      if (event.firstMinter.toLowerCase() === creatorAddress.toLowerCase()) {
        total += BigInt(event.firstMinterReward)
      }
      return total
    }, BigInt(0))
    .toString()

export default calculateTotalRewards
