import { createHandler, Get, Query } from "next-api-decorators"
import { Contract } from "ethers"
import getMetadata from "../../../../../lib/getMetadata"
import isSmartWalletRegistered from "../../../../../lib/isSmartWalletRegistered"
import getDefaultProvider from "../../../../../lib/getDefaultProvider"
import cre8orsAbi from "../../../../../lib/abi-cre8ors.json"

class GetMetadata {
  @Get()
  async metadata(@Query("tokenId") tokenId: string) {
    const contract = new Contract(
      process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      cre8orsAbi,
      getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
    )
    const response = await contract.totalSupply()
    const totalSupply = response.toString()

    if (parseInt(tokenId, 10) > parseInt(totalSupply, 10)) {
      return {
        error: "Token not Minted Yet",
      }
    }
    const hasTBA = await isSmartWalletRegistered(tokenId)
    return getMetadata(tokenId, hasTBA)
  }
}

export default createHandler(GetMetadata)
