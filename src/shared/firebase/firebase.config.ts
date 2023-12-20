import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBYbpVo4AsThUTmy0Ua3S8kGKIbNTfpSMY",
  authDomain: "squares-bb4f7.firebaseapp.com",
  databaseURL:
    "https://squares-bb4f7-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "squares-bb4f7",
  storageBucket: "squares-bb4f7.appspot.com",
  messagingSenderId: "108889589824",
  appId: "1:108889589824:web:1bc7e359fb72725a8db7a5",
  measurementId: "G-891XED6300",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export enum dbCollections {
  USERS = "users",
  MAPS = "maps",
}
