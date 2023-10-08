import { writeBatch, doc } from "firebase/firestore"
import { firestore } from "./firebase"

const updateBatchEvents = async (events) => {
  // Get a new write batch
  const batch = writeBatch(firestore)

  for (let i = 0; i < events.length; i += 1) {
    const event = events[i]
    const docName = `${event.transactionHash}-${event.logIndex}`
    const eventRef = doc(firestore, "7777777", docName)
    batch.set(eventRef, event)
  }

  // Commit the batch
  await batch.commit()
}

export default updateBatchEvents
