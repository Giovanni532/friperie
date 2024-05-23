import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebaseDb from "../config";
import addDataWithId from "../request/addDataWithId";
import getDataWithId from "../request/getDataWithId";

const auth = getAuth(firebaseDb);
const provider = new GoogleAuthProvider();

export const loginWithGoogle = async (dateToday, formatedDateToday) => {
  let user = null
  const res = await signInWithPopup(auth, provider)

  const dataToSend = {
    createdAt: dateToday,
    createdUserAt: formatedDateToday,
    email: res.user.email,
    username: res.user.displayName,
    uid: res.user.uid
  }

  await addDataWithId("user", res.user.uid, dataToSend)

  user = (await getDataWithId("user", res.user.uid)).resultGetData.data()

  return user
}