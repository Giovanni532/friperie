import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import firebaseDb from "../config";

const db = getFirestore(firebaseDb);
const deleteDocument = async (collectionName, documentId) => {
  try {
    const docRef = doc(db, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};

export default deleteDocument;
