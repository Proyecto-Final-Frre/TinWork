import React, { Suspense } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SplashScreen from '../Splash/SplashScreen';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <SplashScreen />
          {/* <p>Cargando...</p> */}
        </div>
      </Suspense>
    );
  }

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}

export default ProtectedRoute;