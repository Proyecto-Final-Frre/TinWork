import { collection, getDocs ,addDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

export const findAll = async () => {
  const querySnapshot = await getDocs(collection(db, "Abilities"));

  let results = [];
  querySnapshot.forEach((doc) => results.push(doc.data()));
  return results;
};


export const findAllCategories = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Categories"));
    const results = [];

    querySnapshot.forEach((doc) => {
      results.push({
        id: doc.id,     // Incluye el ID del documento si lo necesitás
        ...doc.data(),
      });
    });

    return results;
  } catch (error) {
    console.error("Error al traer las categorías:", error);
    throw error;
  }
};

export const addSkill = async (skill) => {
  try {
    await addDoc(collection(db, "Abilities"), {
      title: skill.title,
      category: skill.category, // Solo guardamos el nombre
    });
  } catch (error) {
    throw error;
  }
};

// Agrega una categoría nueva
export const addCategory = async (categoryName) => {
  try {
    const docRef = await addDoc(collection(db, "Categories"), {
      name: categoryName,
    });

    return {
      id: docRef.id,
      name: categoryName,
    };
  } catch (error) {
    console.error("Error al guardar la categoría:", error);
    throw error;
  }
};