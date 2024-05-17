import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebaseDb from '../config'; // Assurez-vous que cela pointe vers votre configuration Firebase

const db = getFirestore(firebaseDb);

export const updateData = async (id, path, data) => {
    const dataDoc = doc(db, path, id);
    await updateDoc(dataDoc, data);
  };