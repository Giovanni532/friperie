import firebaseDb from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseDb)
export default async function addData(colllection, id, data) {
    let resultAddData = null;
    let errorAddData = null;

    try {
        resultAddData = await setDoc(doc(db, colllection, id), data, {
            merge: true,
        });
    } catch (e) {
        errorAddData = e;
    }

    return { resultAddData, errorAddData };
}