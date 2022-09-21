import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.js";
import Header from "./components/Header";
import FormOffer from "./components/FormOffer";
import OfferList from "./components/OfferList";
import Candidates from "./components/Candidates";
import { createContext } from "react";


export const UserContext = createContext()




function App() {
  return (
    <UserContext.Provider>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/offers" element={<OfferList />} />
        <Route path="/create-offer" element={<FormOffer />} />
        <Route path="/" element={<Home />} />
        <Route path="/candidates" element={<Candidates />} />
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
    
  );
}

export default App;
