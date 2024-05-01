import firebaseDb from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseDb)
export default async function getData(collection, id) {
    let docRef = doc(db, collection, id);

    let resultGetData = null;
    let errorGetData = null;

    try {
        resultGetData = await getDoc(docRef);
    } catch (e) {
        errorGetData = e;
    }

    return { resultGetData, errorGetData };
}

/* COMMENT APPELER LA FONCTION */

// await getData('tests', id)