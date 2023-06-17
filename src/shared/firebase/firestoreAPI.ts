import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase.config";

export class FirestoreAPI {
  public static async getDocs(collectionName: string) {
    const docRef = doc(db, collectionName);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  // public static getDocById() {}
  //
  // public static updateDocById() {}
  //
  // public static deleteDocById() {}
}
