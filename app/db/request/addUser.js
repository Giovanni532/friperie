import firebaseDb from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseDb)
export default async function addUser(colllection, id, data) {
    let resultAddUser = null;
    let errorAddUser = null;

    try {
        resultAddUser = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        errorAddUser = e;
    }

    return { resultAddUser, errorAddUser };
}

/* COMMENT APPELER LA FONCTION */

// await addData('test', id, data)