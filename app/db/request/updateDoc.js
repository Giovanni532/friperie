import { getFirestore, doc, updateDoc } from "firebase/firestore";
import firebaseDb from '../config'; // Assurez-vous que cela pointe vers votre configuration Firebase

const db = getFirestore(firebaseDb);

export const updateArticle = async (id, path, data) => {
    const articleDoc = doc(db, path, id);
    await updateDoc(articleDoc, data);
  };