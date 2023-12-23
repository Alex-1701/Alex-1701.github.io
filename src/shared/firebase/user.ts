import { signInWithEmailAndPassword, User } from "firebase/auth"
import { signOut } from "@firebase/auth"
import { auth } from "./firebase.config"

export const UserActions = {
  login: async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user: User = userCredential.user
        console.log("Login success")
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log("Login failed")
        console.log(errorCode)
        console.log(errorMessage)
      })
  },

  logout: async () => {
    await signOut(auth)
  },
}
