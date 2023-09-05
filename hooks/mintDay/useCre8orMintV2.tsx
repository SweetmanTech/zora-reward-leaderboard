import { BigNumber, Contract } from "ethers"
import { useCallback, useEffect, useState } from "react"
import cre8orAbi from "../../lib/abi-cre8ors.json"
import { useEthersSigner } from "../useEthersSigner"
import handleTxError from "../../lib/handleTxError"
import useCheckNetwork from "../useCheckNetwork"
import useSaleStatus from "./useSaleStatus"
import getDefaultProvider from "../../lib/getDefaultProvider"

const useCre8orMintV2 = () => {
  const signer = useEthersSigner({ chainId: process.env.NEXT_PUBLIC_TESTNET ? 5 : 1 })
  const { publicSalePrice } = useSaleStatus()
  const [totalSupply, setTotalSupply] = useState()
  const { checkNetwork } = useCheckNetwork()

  const getTotalSupply = useCallback(async () => {
    const contract = new Contract(
      process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS,
      cre8orAbi,
      getDefaultProvider(process.env.NEXT_PUBLIC_TESTNET ? 5 : 1),
    )
    const response = await contract.totalSupply()

    setTotalSupply(response.toString())
  }, [])

  const mint = async (quantity) => {
    try {
      if (!checkNetwork()) {
        throw new Error("switch your network")
      }

      const contract = new Contract(process.env.NEXT_PUBLIC_CRE8ORS_ADDRESS, cre8orAbi, signer)

      const tx = await contract.purchase(quantity, {
        value: BigNumber.from(publicSalePrice).mul(quantity).toString(),
        gasLimit: 300293 * quantity,
      })
      const receipt = await tx.wait()
      return receipt
    } catch (err) {
      handleTxError(err)
      return { err }
    }
  }

  useEffect(() => {
    getTotalSupply()
  }, [getTotalSupply])

  return {
    totalSupply,
    getTotalSupply,
    mint,
  }
}
export default useCre8orMintV2
