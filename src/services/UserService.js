import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const getUserAuthenticated = () => {
  const user = auth.currentUser;
  return user;
};

export const logout = () => {
  return signOut(auth)
    .then(() => true)
    .catch(() => false);
};
