import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBobDYmVmRlKjiso-G2OjSkRsMjeaqmo3s',
  authDomain: 'todoapps-e7128.firebaseapp.com',
  projectId: 'todoapps-e7128',
  storageBucket: 'todoapps-e7128.firebasestorage.app',
  messagingSenderId: '325437277177',
  appId: '1:325437277177:web:9fe8e6ba2a561bb2f17328'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore()
