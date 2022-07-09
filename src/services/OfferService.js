import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const createOffer = async (offer) => {
  const offerCollection = collection(db, "Offers");
  return await addDoc(offerCollection, {
    title: offer.title,
    description: offer.description,
  });
};
