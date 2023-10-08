import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { firestore } from "./firebase"

const updateCreatorTotals = async (address, total, oneMonth, oneWeek) => {
  const ref = doc(firestore, "zorbs", address.toLowerCase())
  const docSnap = await getDoc(ref)
  if (docSnap.exists()) {
    const docData = {
      total,
      oneMonth,
      oneWeek,
    }

    updateDoc(ref, docData)
  } else {
    const docData = {
      total,
      oneMonth,
      oneWeek,
    }
    await setDoc(ref, docData)
  }
}

export default updateCreatorTotals
