import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseDb from "../config";
import addDataWithId from "../request/addDataWithId";

const auth = getAuth(firebaseDb);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async (dateToday, formatedDateToday) => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      const data = {
        createdAt: dateToday,
        createdUserAt: formatedDateToday,
        email: user.email,
        username: user.displayName
      };

      addDataWithId("user", user.uid, data);

      return user.uid
      // IdP data available using getAdditionalUserInfo(result)
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}