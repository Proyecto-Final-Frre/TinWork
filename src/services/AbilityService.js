import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const findAll = async () => {
  const querySnapshot = await getDocs(collection(db, "Abilities"));

  let results = [];
  querySnapshot.forEach((doc) => results.push(doc.data()));
  return results;
};
