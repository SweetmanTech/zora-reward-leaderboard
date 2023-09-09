import axios from "axios"
import { zora } from "@wagmi/core/chains"
import getAlchemyBaseUrl from "./getAlchemyBaseUrl"

export const ethGetLogs = async (chainId, contractAddress, topics) => {
  console.log("SWEETS GETITNG LOGS for ", chainId)

  let endpoint
  // Specify the RPC URL for the Zora chain
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
  console.log("SWEETS LATEST BLOCK", latestBlock)
  const fromBlock = `0x${(latestBlock - 200_000).toString(16)}`
  let toBlock = "latest"

  // Specific block range for chainId 8453
  if (chainId === 8453) {
    toBlock = "0x24b827"
  }

  console.log("SWEETS endpoint", endpoint)

  const payload = {
    id: 0,
    jsonrpc: "2.0",
    method: "eth_getLogs",
    params: [
      {
        fromBlock,
        toBlock,
        address: contractAddress,
        topics,
      },
    ],
  }

  // NEW
  const blockRange = 100_000
  const requests = []
  for (let startBlock = 1; startBlock <= latestBlock; startBlock += blockRange) {
    const endBlock = Math.min(startBlock + blockRange - 1, latestBlock)
    console.log("SWEETS endBlock", endBlock)

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
    const logs = responses.flatMap((response) => response.data.result)
    console.log("SWEETS PROMIS LOGS", logs)

    return logs
  } catch (err) {
    console.error("Error fetching logs:", err)
    return []
  }

  // END

  try {
    const response = await axios.post(endpoint, payload)
    console.log("SWEETS REPSONSE", response)
    const logs = response.data.result
    return logs
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("SWEETS Error fetching logs:", err)
    return []
  }
}
