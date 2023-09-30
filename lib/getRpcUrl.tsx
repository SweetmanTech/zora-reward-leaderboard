import { zora } from "@wagmi/core/chains"
import getAlchemyBaseUrl from "./alchemy/getAlchemyBaseUrl"

const getRpcUrl = (chainId) => {
  let endpoint
  if (chainId === zora.id) {
    endpoint = "https://rpc.zora.energy"
  } else {
    endpoint = `${getAlchemyBaseUrl(chainId)}v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  }
  return endpoint
}

export default getRpcUrl
