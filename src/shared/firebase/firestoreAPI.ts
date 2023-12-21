import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore"
import { IGameDataNumericForStore } from "@types"
import { db, dbCollections } from "./firebase.config"

interface Value {
  id: string
}

export const FirestoreAPI = {
  pushDoc: async function (
    collectionName: string,
    value: IGameDataNumericForStore
  ) {
    try {
      const docRef = await addDoc(collection(db, collectionName), value)
      console.log("Document written with ID: ", docRef.id)
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  },

  getDocs: async function (collectionName: string) {
    const docRef = doc(db, `${collectionName}/lol`)
    console.log(docRef)

    const docSnap = await getDoc(docRef)
    console.log(docSnap)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      return docSnap.data()
    }
    console.log("No such document!")
    return null
  },

  setDocDB: async function (
    collectionName: dbCollections,
    name: string,
    value: IGameDataNumericForStore
  ) {
    const citiesRef = collection(db, collectionName)
    await setDoc(doc(citiesRef, name), value)
  },

  getAllDocs: async function (collectionName: string) {
    const collectionRef = collection(db, collectionName)
    const docsSnap = await getDocs(collectionRef)
    const res: any[] = []
    docsSnap.forEach((doc) => {
      res.push({ ...doc.data(), id: doc.id })
    })
    return res
  },

  getDocById: async function (collectionName: string, id: string) {
    const docRef = doc(db, collectionName, id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
      return docSnap.data()
    } else {
      console.log("No such document!")
    }
  },

  // public static updateDocById() {}
  //
  // public static deleteDocById() {}
}
