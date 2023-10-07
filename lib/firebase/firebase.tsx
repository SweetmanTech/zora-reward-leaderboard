import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "zora-protocol-rewards.firebaseapp.com",
  projectId: "zora-protocol-rewards",
  storageBucket: "zora-protocol-rewards.appspot.com",
  messagingSenderId: "1036592586587",
  appId: "1:1036592586587:web:b231bbfc8a1b9ec195847e",
  measurementId: "G-PVNY9763QR",
}

const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app)
