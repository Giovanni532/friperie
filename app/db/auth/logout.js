import { setCookie } from "cookies-next";
import firebaseDb from "../config";
import { getAuth } from "firebase/auth";

const auth = getAuth(firebaseDb);

export default async function logout() {
    try {
        await auth.signOut()
        setCookie("admin", false)
    } catch (e) {
        console.log(e);
    }
}

/* COMMENT APPELER LA FONCTION */

//await logout()