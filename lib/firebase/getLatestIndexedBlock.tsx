import { collection, getDocs, limit, orderBy, query } from "firebase/firestore"
import { firestore } from "./firebase"

const getLatestIndexedBlock = async (chainId) => {
  const ref = collection(firestore, chainId.toString())
  const q = query(ref, orderBy("blockNumber", "desc"), limit(1))
  const querySnapshot = await getDocs(q)
  return parseInt(querySnapshot.docs[0].data().blockNumber, 16)
}

export default getLatestIndexedBlock
