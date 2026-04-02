import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyANmgHkophB8DlLOVONTO54q-6Cio3WTg8",
  authDomain: "end-zone-98910.firebaseapp.com",
  projectId: "end-zone-98910",
  storageBucket: "end-zone-98910.firebasestorage.app",
  messagingSenderId: "1042663023924",
  appId: "1:1042663023924:web:ddb5d7b01fb22b8d313161"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)