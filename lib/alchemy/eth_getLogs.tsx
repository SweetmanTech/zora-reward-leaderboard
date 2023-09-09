import axios from "axios"
import { zora } from "@wagmi/core/chains"
import getAlchemyBaseUrl from "./getAlchemyBaseUrl"

export const ethGetLogs = async (chainId, contractAddress, topics, numberOfDays = 1) => {
  let endpoint
  if (chainId === zora.id) {
    endpoint = "https://rpc.zora.energy"
  } else {
    endpoint = `${getAlchemyBaseUrl(chainId)}v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  }

  const latestBlockNumberResponse = await axios.post(endpoint, {
    id: 0,
    jsonrpc: "2.0",
    method: "eth_blockNumber",
    params: [],
  })
  const latestBlock = parseInt(latestBlockNumberResponse.data.result, 16)
  const blocksIn24Hours = Math.floor((24 * 60 * 60) / 13.5)
  const range = blocksIn24Hours * numberOfDays
  const fromBlock = latestBlock - range

  const blockRange = 100_000
  const requests = []
  for (let startBlock = fromBlock; startBlock <= latestBlock; startBlock += blockRange) {
    const endBlock = Math.min(startBlock + blockRange - 1, latestBlock)
    requests.push(
      axios.post(endpoint, {
        id: 0,
        jsonrpc: "2.0",
        method: "eth_getLogs",
        params: [
          {
            fromBlock: `0x${startBlock.toString(16)}`,
            toBlock: `0x${endBlock.toString(16)}`,
            address: contractAddress,
            topics,
          },
        ],
      }),
    )
  }

  try {
    const responses = await Promise.all(requests)
    const logs = responses.flatMap((response) => response.data.result).filter(Boolean)
    return logs
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error fetching logs:", err)
    return []
  }
}
