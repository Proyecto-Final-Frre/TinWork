import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit,
  doc,
  updateDoc
 
} from "firebase/firestore";
import { db } from "../config/firebase.js";
const auth = getAuth();

export const getUserAuthenticated = () => {
  const user = auth.currentUser;
  return user;
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

export const createUser = async (user) => {
  const userSaved = await findUserByUid(user.uid);
  if (!userSaved) {
    return addDoc(collection(db, "Users"), user)
      .then(() => {
        console.log("Successfully created user!");
        return true;
      })
      .catch(() => {
        console.log("Unsuccessfully created user!");
        throw new Error("Unsuccessfully created user!");
      });
  }
};

export const pushNotification = (token, offer) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios
    .post(
      "https://tinwork-back.onrender.com",
      {
        token: token,
        title: "Un reclutador se intereso en ti.",
        body: `El puesto de ${offer.title} puede ser para vos.`,
      },
      headers
    )
    .then((response) => console.log("notificacion enviada"))
    .catch((err) => console.log("error", err));
};

 

export const updateProfile = async (dataProfile,uid) => {
  const q = query(collection(db, "Users"), where("uid", "==", uid), limit(1));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
  const recrutierRef = doc(db, "Users", querySnapshot.docs[0].id);
  await updateDoc(recrutierRef, {description:dataProfile.description,location:dataProfile.location,imageProfile:dataProfile.url});
  } else {
    return null
  }
  
  return true;
};








