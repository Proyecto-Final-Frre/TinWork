import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.js";
import Header from "./components/Header";
import FormOffer from "./components/FormOffer";
import OfferList from "./components/OfferList";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/offers" element={
        <ProtectedRoute>
          <OfferList />

        </ProtectedRoute>
        } />
          <Route path="/create-offer" element={<FormOffer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
              

            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
