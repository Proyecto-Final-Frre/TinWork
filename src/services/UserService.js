import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase.js";
const auth = getAuth();

export const getUserAuthenticated = () => {
  return auth.currentUser;
};

export const logout = () => {
  return signOut(auth)
    .then(() => true)
    .catch(() => false);
};

export const findUserByUid = async (uid) => {
  const q = query(collection(db, "Users"), where("uid", "==", uid), limit(1));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const queryDocumentSnapshot = querySnapshot.docs[0].data();
    return queryDocumentSnapshot;
  } else {
    console.log("No document corresponding to the query!");
    return null;
  }
};

export const pushNotification = (token, titleOffer) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios
    .post(
      "https://tinwork-back.onrender.com",
      {
        token: token,
        title: "Un reclutador se intereso en ti.",
        body: `El puesto de ${titleOffer} puede ser para vos.`,
      },
      headers
    )
    .then((response) => console.log("notificacion enviada"))
    .catch((err) => console.log("error", err));
};
