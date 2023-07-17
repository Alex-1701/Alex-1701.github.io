import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { IGameDataNumericForStore } from "@types";
import { db, dbCollections } from "./firebase.config";

export class FirestoreAPI {
  public static async pushDoc(
    collectionName: string,
    value: IGameDataNumericForStore
  ) {
    try {
      const docRef = await addDoc(collection(db, collectionName), value);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  public static async getDocs(collectionName: string) {
    const docRef = doc(db, `${collectionName}/lol`);
    console.log(docRef);

    const docSnap = await getDoc(docRef);
    console.log(docSnap);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    }
    console.log("No such document!");
    return null;
  }

  public static async setDocDB(
    collectionName: dbCollections,
    name: string,
    value: IGameDataNumericForStore
  ) {
    const citiesRef = collection(db, collectionName);
    await setDoc(doc(citiesRef, name), value);
  }

  public static async getAllDocs(collectionName: string) {
    const collectionRef = collection(db, collectionName);
    console.log(collectionRef);

    await collectionGroup(db, "lol");
  }

  // public static getDocById() {}
  //
  // public static updateDocById() {}
  //
  // public static deleteDocById() {}
}
