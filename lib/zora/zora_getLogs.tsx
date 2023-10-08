import axios from "axios"

export const zoraGetLogs = async (requests) => {
  const endpoint = "https://rpc.zora.energy"

  const apiRequests = []
  for (let i = 0; i < requests.length; i += 1) {
    apiRequests.push(
      axios.post(endpoint, {
        id: 0,
        jsonrpc: "2.0",
        method: "eth_getLogs",
        params: [
          {
            fromBlock: requests[i].fromBlock,
            toBlock: requests[i].toBlock,
            address: requests[i].address,
            topics: requests[i].topic,
          },
        ],
      }),
    )
  }

  try {
    const responses = await Promise.all(apiRequests)
    const logs = responses.flatMap((response) => response.data.result).filter(Boolean)

    return logs
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Error fetching logs:", err)
    return []
  }
}
