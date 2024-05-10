import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseDb from "../config";

const db = getFirestore(firebaseDb)
export default async function addData(path, data) {
    let resultAddData = null;
    let errorAddData = null;

    try {
        // Add a new document with a generated id.
        await addDoc(collection(db, path), {
            data
        });
    } catch (e) {
        errorAddData = e;
    }

    return { resultAddData, errorAddData };
}

/* COMMENT APPELER LA FONCTION */

// await addData(data)