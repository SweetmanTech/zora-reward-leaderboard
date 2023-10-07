import { doc, getDoc } from "firebase/firestore"
import { firestore } from "./firebase"

const getCreator = async (address) => {
  const ref = doc(firestore, "zorbs", address)
  const myDoc = await getDoc(ref)
  return myDoc.data()
}

export default getCreator
