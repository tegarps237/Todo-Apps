/* eslint-disable no-async-promise-executor */
import { defineStore } from 'pinia'
import { doc, setDoc } from 'firebase/firestore'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth'
import { auth, db } from '../lib/firebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    isButtonAuthLoading: false,
    user: null,
    error: null
  }),
  actions: {
    initAuth () {
      return new Promise(async (resolve, reject) => {
        try {
          await setPersistence(auth, browserLocalPersistence)

          onAuthStateChanged(auth, (user) => {
            if (user) {
              this.user = user
            } else {
              this.user = null
            }
          })
          resolve()
        } catch (error) {
          reject(error)
          throw new Error('Error initializing authentication.', error)
        }
      })
    },
    register (email, password, fullName) {
      this.isButtonAuthLoading = true
      return new Promise(async (resolve, reject) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)

          await setDoc(doc(db, 'users', userCredential.user.uid), {
            email,
            fullName,
            id: userCredential.user.uid
          })
          this.user = userCredential.user
          resolve()
        } catch (error) {
          let errorMessage

          switch (error.code) {
            case 'auth/invalid-email':
              errorMessage = 'Please enter a valid email.'
              break
            case 'auth/missing-password':
              errorMessage = 'Please enter a password.'
              break
            case 'auth/email-already-in-use':
              errorMessage = 'This email is already in use. Try another email.'
              break
            default:
              errorMessage = 'An error occurred. Please try again.'
          }

          this.error = errorMessage
          reject(error)
        } finally {
          this.isButtonAuthLoading = false
        }
      })
    },
    login (email, password) {
      this.isButtonAuthLoading = true
      return new Promise(async (resolve, reject) => {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          this.user = userCredential.user
          this.error = null
          resolve()
        } catch (error) {
          switch (error.code) {
            case 'auth/user-not-found':
              this.error = 'No user found with this email.'
              break
            case 'auth/wrong-password':
              this.error = 'Incorrect password. Please try again.'
              break
            case 'auth/missing-password':
              this.error = 'Please fill password.'
              break
            case 'auth/too-many-requests':
              this.error = 'Too many unsuccessful login attempts. Please try again later.'
              break
            case 'auth/invalid-email':
              this.error = 'The email address is not valid.'
              break
            case 'auth/missing-email':
              this.error = 'Please fill an email.'
              break
            case 'auth/invalid-credential':
              this.error = 'Account not found.'
              break
            default:
              this.error = 'Login failed. Please try again later.'
          }
          console.error('Login error:', error)
          reject(error)
        } finally {
          this.isButtonAuthLoading = false
        }
      })
    },
    logout () {
      return new Promise(async (resolve, reject) => {
        try {
          await signOut(auth)
          this.user = null
          resolve()
        } catch (error) {
          this.error = error
          reject(error)
        }
      })
    }
  }
})
