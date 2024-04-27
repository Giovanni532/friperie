import firebaseDb from "../config";

import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebaseDb);

export default async function signup(email, password) {
    let resultSignup = null,
        errorSignup = null;
    try {
        resultSignup = await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
        errorSignup = e;
    }

    return { resultSignup, errorSignup };
}