import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const getUserAuthenticated = () => {
  console.log("usuario autenticado",auth.currentUser)
  return auth.currentUser;
};




export const logout = () => {
  return signOut(auth)
    .then(() => true)
    .catch(() => false);
};
