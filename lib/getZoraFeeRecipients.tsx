const getZoraFeeRecipients = async () => {
  try {
    const response = await fetch("https://api.onchainmagic.xyz/api/zora/feeRecipients")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.addresses
  } catch (error) {
    console.error("Error fetching Zora fee recipients:", error)
    throw error
  }
}

export default getZoraFeeRecipients
