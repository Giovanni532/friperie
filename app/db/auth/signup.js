import firebaseDb from "../config";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseDb);

export default async function signup(email, password) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
        error = e;
    }

    return { result, error };
}