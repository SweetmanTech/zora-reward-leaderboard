import { utils } from "ethers"
import { REWARD_DEPOSIT_EVENT_SIGNATURE } from "../consts"

export const getCreatorTopic = (address) => [
  utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE),
  utils.hexZeroPad(address, 32),
  null,
  null,
]

export const getCreateReferralTopic = (address) => [
  utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE),
  null,
  utils.hexZeroPad(address, 32),
  null,
]

export const getMintReferralTopic = (address) => [
  utils.id(REWARD_DEPOSIT_EVENT_SIGNATURE),
  null,
  null,
  utils.hexZeroPad(address, 32),
]

export const getCreatorRewardTopics = (address) => [
  getCreatorTopic(address),
  getCreateReferralTopic(address),
  getMintReferralTopic(address),
]
