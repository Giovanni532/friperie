import firebaseDb from "../config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore(firebaseDb)
export default async function getMultipleData(col) {
    const resultGetMultipleData = [];
    let errorGetMultipleData = null;

    try {
        const res = await getDocs(collection(db, col));

        res.forEach((doc) => {
            resultGetMultipleData.push(doc.data())
        })
    } catch (e) {
        errorGetMultipleData = e;
    }

    return { resultGetMultipleData, errorGetMultipleData };
}

/* COMMENT APPELER LA FONCTION */

// await getMultipleData('test')