import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDNlIRNuaDA_UwQQ2TX9Cwm9KFrd6ifCsU",
  authDomain: "krishimitra-927a9.firebaseapp.com",
  projectId: "krishimitra-927a9",
  storageBucket: "krishimitra-927a9.firebasestorage.app",
  messagingSenderId: "502833231960",
  appId: "1:502833231960:web:22c25f857616887150b22d"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
