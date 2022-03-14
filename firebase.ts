import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
// import {
//   getFirestore,
//   query,
//   getDocs,
//   collection,
//   where,
//   addDoc,
// } from 'firebase/firestore'

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
// const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    // const { user } = await signInWithPopup(auth, googleProvider)
    signInWithPopup(auth, googleProvider)

    // const q = query(collection(db, 'users'), where('uid', '==', user.uid))
    // const docs = await getDocs(q)
    // if (docs.docs.length === 0) {
    //   await addDoc(collection(db, 'users'), {
    //     uid: user.uid,
    //     name: user.displayName,
    //     authProvider: 'google',
    //     email: user.email,
    //   })
    // }
  } catch (error: any) {
    console.error(error)
    alert(error.message)
  }
}

const logout = () => {
  signOut(auth)
}

export {
  auth,
  // db,
  signInWithGoogle,
  logout,
}
