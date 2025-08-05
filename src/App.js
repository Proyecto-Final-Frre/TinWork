import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FormOffer from "./components/FormOffer";
import OfferList from "./components/OfferList";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Candidates from "./components/Candidates";
import ProfileReclutier from "./components/ProfileReclutier";
import Chats from "./components/Chats";
import EditOfferForm from "./components/EditOfferForm";
import OfferListDisabled from "./components/OfferListDisabled";
import ActivateOfferForm from "./components/ActivateOfferForm";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/offers"
            element={
              <ProtectedRoute>
                <OfferList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-offer"
            element={
              <ProtectedRoute>
                <FormOffer />
              </ProtectedRoute>
            }
          />
          <Route path="/edit-offer/:offerId" 
                  element={ <ProtectedRoute>
                    <EditOfferForm />
                    </ProtectedRoute>} />

        <Route path="/activate-offer/:offerId" 
              element={ 
              <ProtectedRoute>
                <ActivateOfferForm />
              </ProtectedRoute>} />

          <Route
            path="/candidates"
            element={
              <ProtectedRoute>
                <Candidates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/offers" element={<OfferList />} />
          <Route path="/offersDisabled" element={<OfferListDisabled />} />

          <Route path="/profile" element={
          <ProtectedRoute>
            <ProfileReclutier/>
          </ProtectedRoute>
          
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;
