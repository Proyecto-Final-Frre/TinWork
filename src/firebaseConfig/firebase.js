// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyC2aQ_0j8tjXN5mgbD6JXk-RWytQ47jMVE",
  authDomain: "crud-fire-react-e3af0.firebaseapp.com",
  projectId: "crud-fire-react-e3af0",
  storageBucket: "crud-fire-react-e3af0.appspot.com",
  messagingSenderId: "636217934589",
  appId: "1:636217934589:web:8403616adfe2e76d727494"
};

const app = initializeApp(firebaseConfig);
//para conectarnos a la base de datos firestore
export const db = getFirestore(app)