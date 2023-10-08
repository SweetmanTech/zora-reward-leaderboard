import { mainnet } from "@wagmi/core/chains"

const getSecondsPerBlock = (chainId) => (chainId === mainnet.id ? 13.5 : 2)

export default getSecondsPerBlock
