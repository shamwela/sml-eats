import axios from 'axios'
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

export const signIn = async () => {
  const googleAuthProvider = new GoogleAuthProvider()
  try {
    const { user } = await signInWithPopup(auth, googleAuthProvider)
    const userId = user.uid

    // This is because Firebase is only used for authentication
    await axios.post('/api/user', { userId })
  } catch (error: any) {
    alert(
      'Sorry. There was an error while you sign in. Please try again later.'
    )
    console.error(error)
  }
}

export const signOut = () => firebaseSignOut(auth)
