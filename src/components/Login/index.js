import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Form, Alert } from "react-bootstrap";
import "./style.css";
import logoRecrutier from "../../logos/Reclutier.png";
import SplashScreen from "../Splash/SplashScreen";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Icono de Google

function Login() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, user, loading, resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false); // Estado para botón de Google
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Estados para la recuperación de contraseña
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loadingReset, setLoadingReset] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoadingButton(true);
      await login(userForm.email, userForm.password);
    } catch (error) {
      setLoadingButton(false);

      if (error.code === "auth/wrong-password") {
        setError("La contraseña es incorrecta ingrese nuevamente");
      }
      if (error.code === "auth/user-not-found") {
        setError("El usuario aún no esta registrado");
      }
    }
  };

  // Función mejorada para Google Sign-in
  const handleGoogleSignin = async () => {
    setError("");
    try {
      setLoadingGoogle(true);
      await loginWithGoogle();
      navigate("/offers");
    } catch (error) {
      setError("Error al iniciar sesión con Google. Intenta nuevamente.");
      console.error("Google login error:", error);
    } finally {
      setLoadingGoogle(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/offers");
      setLoadingButton(false);
    }
  }, [user]);

  // Nueva función para manejar la recuperación de contraseña
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!resetEmail) {
      setError("Por favor ingresa tu email");
      return;
    }

    try {
      setLoadingReset(true);
      await resetPassword(resetEmail);
      setSuccessMessage("Se ha enviado un email para restablecer tu contraseña. Revisa tu bandeja de entrada.");
      setShowForgotPassword(false);
      setResetEmail("");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No existe una cuenta con este email");
      } else {
        setError("Error al enviar el email de recuperación");
      }
    } finally {
      setLoadingReset(false);
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <div className="principal-login">
      <div className="login">
        <div className="illustration-container">
          <img src={logoRecrutier} alt="logo" />
          <div className="text-center mt-6 text-gray-700">
            <p style={{ fontSize: "18px" }}>
              Impulsa tu empresa y encuentra al talento ideal con{" "}
              <span style={{ color: "#2E81FB" }}>TinWork</span> 🚀
            </p>
          </div>
        </div>

        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          {successMessage && (
            <Alert variant="success" className="mb-3">
              {successMessage}
            </Alert>
          )}

          {!showForgotPassword ? (
            <>
              <h2 style={{ color: "#2E81FB", fontWeight: "bold" }}>Bienvenido</h2>
              <p style={{ fontSize: "20px" }}>Inicia sesión y descubre candidatos excepcionales.</p>

              {/* Botón de Google - Lo pongo arriba para mejor UX */}
              {/* <Button
                variant="outline-dark"
                className="w-100 mb-3 google-signin-btn"
                onClick={handleGoogleSignin}
                disabled={loadingGoogle || loadingButton}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "12px",
                  border: "1px solid #dadce0",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  color: "#3c4043",
                  fontWeight: "500",
                  fontSize: "16px",
                  transition: "all 0.2s ease",
                }}
              >
                {loadingGoogle ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Iniciando con Google...
                  </>
                ) : (
                  <>
                    <FcGoogle size={20} />
                    Continuar con Google
                  </>
                )}
              </Button> */}

              {/* Separador */}
              {/* <div className="divider-container mb-4">
                <hr style={{ flex: 1, border: "none", borderTop: "1px solid #e0e0e0" }} />
                <span style={{ 
                  padding: "0 16px", 
                  color: "#666", 
                  fontSize: "14px",
                  backgroundColor: "#fff"
                }}>
                  o continúa con email
                </span>
                <hr style={{ flex: 1, border: "none", borderTop: "1px solid #e0e0e0" }} />
              </div> */}

              <Form onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">
                    Email
                  </label>
                  <Form.Group className="mb-1" controlId="email">
                    <Form.Control
                      type="email"
                      placeholder="Ingresa tu correo"
                      autoComplete="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      className="form-control"
                      required
                    />
                  </Form.Group>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Contraseña
                  </label>
                  <Form.Group className="mb-2 password-container">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="******"
                      autoComplete="current-password"
                      value={userForm.password}
                      onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                      className="password-input"
                      required
                    />
                    <button 
                      type="button" 
                      className="toggle-password" 
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                    </button>
                  </Form.Group>
                </div>

                {/* Enlace para recuperar contraseña */}
                <div className="text-end mb-3">
                  <button
                    type="button"
                    className="btn btn-link p-0 text-decoration-none"
                    style={{ color: "#2E81FB", fontSize: "15px" }}
                    onClick={() => {
                      setShowForgotPassword(true);
                      setError("");
                      setSuccessMessage("");
                    }}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  style={{ transition: "background-color 0.2s ease" }}
                  disabled={loadingButton || loadingGoogle}
                >
                  {loadingButton ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Iniciando...
                    </>
                  ) : (
                    "Iniciar sesión"
                  )}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <p className="text-gray-600">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Regístrate
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ color: "#2E81FB", fontWeight: "bold" }}>Recuperar Contraseña</h2>
              <p style={{ fontSize: "16px", color: "#666" }}>
                Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
              </p>

              <Form onSubmit={handlePasswordReset}>
                <div className="space-y-1">
                  <label htmlFor="resetEmail" className="block text-gray-700 text-sm font-bold mb-1">
                    Email
                  </label>
                  <Form.Group className="mb-3" controlId="resetEmail">
                    <Form.Control
                      type="email"
                      placeholder="Ingresa tu correo"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="form-control"
                      required
                    />
                  </Form.Group>
                </div>

                <Button variant="primary" type="submit" className="w-100 mb-3" disabled={loadingReset}>
                  {loadingReset ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Enviando...
                    </>
                  ) : (
                    "Enviar email de recuperación"
                  )}
                </Button>

                <Button
                  variant="outline-secondary"
                  type="button"
                  className="w-100"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setError("");
                    setSuccessMessage("");
                    setResetEmail("");
                  }}
                >
                  Volver al login
                </Button>
              </Form>
            </>
          )}
        </Card.Body>
      </div>
    </div>
  );
}

export default Login;
