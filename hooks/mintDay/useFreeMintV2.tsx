import { useAccount } from "wagmi"
import { useMintProvider } from "../../providers/MintProvider"
import { useEthersSigner } from "../useEthersSigner"
import { mintByFreeMintV2 } from "../../lib/freeMinter"

const useFreeMintV2 = () => {
  const { availablePassportIds } = useMintProvider()
  const signer = useEthersSigner()
  const { address } = useAccount()

  const freeMintV2 = async () => {
    if (!signer) return null

    const response = await mintByFreeMintV2(signer, availablePassportIds, address)
    return response
  }

  return {
    freeMintV2,
  }
}

export default useFreeMintV2
