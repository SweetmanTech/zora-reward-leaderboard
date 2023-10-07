import { addDoc, collection, getDocs, query, updateDoc, where, doc } from "firebase/firestore"
import { firestore } from "./firebase"
import updateCreator from "./updateCreator"

const updateRewardLog = async (eventLog) => {
  const collectionName = eventLog.chainId.toString()
  const ref = collection(firestore, collectionName)
  const q = query(ref, where("transactionHash", "==", eventLog.transactionHash))
  const querySnapshot = await getDocs(q)

  let docRef
  if (querySnapshot.empty) {
    docRef = await addDoc(ref, eventLog)
  } else {
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data()
      if (
        data.logIndex === eventLog.logIndex &&
        data.transactionHash === eventLog.transactionHash
      ) {
        docRef = doc(firestore, collectionName, docSnap.id)
        updateDoc(docRef, eventLog)
      }
    })
  }

  const feeNames = ["creator", "createReferral", "firstMinter", "mintReferral", "zora"]
  const creatorFees = {}
  for (let i = 0; i < feeNames.length; i += 1) {
    const fee = eventLog[`${feeNames[i]}Reward`]
    const creator = eventLog[feeNames[i]].toLowerCase()
    creatorFees[creator] = creatorFees[creator]
      ? (BigInt(creatorFees[creator]) + BigInt(fee)).toString()
      : fee
  }
  const creatorAddresses = Object.keys(creatorFees)
  for (let i = 0; i < creatorAddresses.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await updateCreator(
      collectionName,
      creatorAddresses[i],
      creatorFees[creatorAddresses[i]],
      docRef.id,
    )
  }
}

export default updateRewardLog
