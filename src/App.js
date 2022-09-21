import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.js";
import Header from "./components/Header";
import FormOffer from "./components/FormOffer";
import OfferList from "./components/OfferList";
import Candidates from "./components/Candidates";
import UserContextProvider from "./contexts/UserContext";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/offers" element={<OfferList />} />
          <Route path="/create-offer" element={<FormOffer />} />
          <Route path="/" element={<Home />} />
          <Route path="/candidates" element={<Candidates />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
