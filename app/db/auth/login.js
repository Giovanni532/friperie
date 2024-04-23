import firebaseDb from "../config";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseDb);

export default async function login(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInWithEmailAndPassword(auth, email, password)
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    } catch (e) {
        error = e;
    }

    return { result, error };
}