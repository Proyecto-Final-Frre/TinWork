import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

export const createOffer = async (offer) => {
  return await addDoc(collection(db, "Offers"), {
    title: offer.title,
    description: offer.description,
    requiredAbilities: offer.requiredAbilities,
    desiredAbilities: offer.desiredAbilities,
    workDay: offer.workDay,
    province: offer.province,
    country: offer.country,
    dateOffer: offer.dateOffer,
    uid: offer.uid,
    interestedUsers: [],
  });
};

export const updateOffer = async (offer) => {
  const offerRef = doc(db, "Offers", offer.id);

  await updateDoc(offerRef, {
    interestedUsers: offer.interestedUsers,
  });

  return true;
};

export const findAll = async () => {
  const querySnapshot = await getDocs(collection(db, "Offers"));

  let results = [];
  querySnapshot.forEach((doc) => results.push(doc.data()));
  return results;
};

export const findOfferByUserUid = async (uid) => {
  const q = query(collection(db, "Offers"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
  } else {
    console.log("No document corresponding to the query!");
    return [];
  }
};
