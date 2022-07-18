import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.js";
import Header from "./components/Header";
import FormOffer from "./components/FormOffer";
import OfferList from "./components/OfferList";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/offers" element={<OfferList />} />
        <Route path="/create-offer" element={<FormOffer />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
