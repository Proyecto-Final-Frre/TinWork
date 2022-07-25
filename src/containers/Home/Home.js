import React from "react";
import { authentication } from "../../config/firebase";
import { logOut } from "../../config/firebase";
const Home = () => {
  return  <div>
            <button onClick={authentication}>Sign In with Google</button >
            <button onClick={logOut}> Log out </button>
          </div> 

};

export default Home;



