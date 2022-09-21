import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
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
    country: offer.country,
    dateOffer: offer.dateOffer,
    uid:offer.uid,
    interestedUsers: [],
  });
};

export const findAll = async () => {
  const querySnapshot = await getDocs(offerCollection);

  let results = [];
  querySnapshot.forEach((doc) => results.push(doc.data()));
  return results;
};


export const findOfferByUserUid = async (uid) => {
  const q = query(collection(db,"Offers"), where("uid", "==", uid))
  const querySnapshot = await getDocs(q)
  if (!querySnapshot.empty) {
    return querySnapshot.docs.map(doc => doc.data()) 
  } else {
    console.log("No document corresponding to the query!");
    return [];
  }
}