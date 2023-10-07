import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore"
import { firestore } from "./firebase"

const updateCreator = async (chainId, address, fee, eventDocId) => {
  const eventKey = `events-${chainId}`
  const bigFee = BigInt(fee)
  const ref = doc(firestore, "zorbs", address)
  const docSnap = await getDoc(ref)
  if (docSnap.exists()) {
    const data = docSnap.data()
    const docData = {
      total: (BigInt(data.total) + bigFee).toString(),
    }
    docData[eventKey] = [...data[eventKey], eventDocId]
    docData[chainId] = (BigInt(data[chainId]) + bigFee).toString()

    const events = data[eventKey]
    if (!events?.includes?.(eventDocId)) {
      updateDoc(ref, docData)
    }
  } else {
    const docData = {
      total: fee,
    }
    docData[eventKey] = [eventDocId]
    docData[chainId] = fee
    await setDoc(ref, docData)
  }
}

export default updateCreator
