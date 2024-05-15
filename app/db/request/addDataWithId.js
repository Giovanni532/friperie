import firebaseDb from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseDb)
export default async function addDataWithId(colllection, id, data) {
    let resultAddDataWithId = null;
    let errorAddDataWithId = null;

    try {
        resultAddDataWithId = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        errorAddDataWithId = e;
    }

    return { resultAddDataWithId, errorAddDataWithId };
}

/* COMMENT APPELER LA FONCTION */

// await addData('test', id, data)