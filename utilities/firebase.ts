import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCRRRJB5Vt8PJQPmSOuJ63hBN_aStZZRRM',
  authDomain: 'sml-eats.firebaseapp.com',
  projectId: 'sml-eats',
  storageBucket: 'sml-eats.appspot.com',
  messagingSenderId: '1014670590407',
  appId: '1:1014670590407:web:98bb9d582797f1eaf9d9e2',
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export const useAuthenticationState = () => useAuthState(auth)

const googleAuthProvider = new GoogleAuthProvider()
export const signInWithGoogle = () => {
  try {
    signInWithPopup(auth, googleAuthProvider)
  } catch (error: any) {
    alert(error.message)
  }
}

export const signOut = () => firebaseSignOut(auth)
