import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home/Home.js";
import Header from "./components/Header";
import FormOffer from "./components/FormOffer";
import OfferList from "./components/OfferList";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register"
function App() {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>

  );
}
export default App