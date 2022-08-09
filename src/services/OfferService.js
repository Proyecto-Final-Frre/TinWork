import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";
const offerCollection = collection(db, "Offers");

export const createOffer = async (offer) => {
  return await addDoc(offerCollection, {
    title: offer.title,
    description: offer.description,
    requiredAbilities: offer.requiredAbilities,
    desiredAbilities: offer.desiredAbilities,
    workDay: offer.workDay,
    province: offer.province,
  });
};

export const findAll = async () => {
  const querySnapshot = await getDocs(offerCollection);

  let results = [];
  querySnapshot.forEach((doc) => results.push(doc.data()));
  return results;
};
