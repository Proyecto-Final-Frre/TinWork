import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const getUserAuthenticated = () => {
  return auth.currentUser;
};

export const logout = () => {
  return signOut(auth)
    .then(() => true)
    .catch(() => false);
};
