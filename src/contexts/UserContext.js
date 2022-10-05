import React, { createContext, useContext, useState } from "react";

const userContext = createContext([]);

export const useUserContext = () => useContext(userContext);

const UserContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);

  const addOn = (user) => {
    setUserAuth(user);
  };

  return (
    <userContext.Provider
      value={{
        userAuth,
        addOn,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
