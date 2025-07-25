import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  doc as docFirebase,
  updateDoc,
  onSnapshot,
  getDoc
} from "firebase/firestore";
import { db } from "../config/firebase.js";

export const createOffer = async (offer) => {
  return await addDoc(collection(db, "Offers"), {
    companyName: offer.companyName,
    title: offer.title,
    description: offer.description,
    requiredAbilities: offer.requiredAbilities,
    desiredAbilities: offer.desiredAbilities,
    workDay: offer.workDay,
    province: offer.province,
    country: offer.country,
    dateOffer: offer.dateOffer,
    workModality:offer.workModality,
    expirationDate:offer.expirationDate,
    logoURL:offer.logoURL,
    uid: offer.uid,
    interestedUsers: [],
  });
};

export const updateOffer = async (offer) => {
  const offerRef = docFirebase(db, "Offers", offer.id);
  await updateDoc(offerRef, offer);
  return true;
};

export const findAll = async () => {
  const querySnapshot = await getDocs(collection(db, "Offers"));

  let results = [];
  querySnapshot.forEach((doc) => results.push(doc.data()));
  return results;
};

export const findOfferByUserUid = (uid, setOffers) => {
  const q = query(collection(db, "Offers"), where("uid", "==", uid));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const offers = [];
    querySnapshot.forEach((doc) => {
      offers.push({ ...doc.data(), id: doc.id });
    });
    setOffers(offers);
  });

  return unsubscribe;
};


export const findByOfferUid = async (offerId) => {
  try {
    const offerRef = docFirebase(db, "Offers", offerId);
    const offerSnap = await getDoc(offerRef);
    
    if (offerSnap.exists()) {
      return { ...offerSnap.data(), id: offerSnap.id };
    } else {
      console.log("No se encontró la oferta con ID:", offerId);
      return null;
    }
  } catch (error) {
    console.error("Error al buscar la oferta:", error);
    throw error;
  }
};
