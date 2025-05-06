import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Form } from "react-bootstrap";
import "./style.css";
import logoRecrutier from "../../logos/Reclutier.png";
import SplashScreen from "../Splash/SplashScreen";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


function Login() {
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, user, loading } = useAuth();
  const [error, setError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoadingButton(true);
      await login(userForm.email, userForm.password);
      //navigate("/offers");
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

  useEffect(() => {
    if (user) {
      navigate("/offers");
      setLoadingButton(false);
    }
  }, [user]);

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/offers");
    } catch (error) {
      console.log("Error", error.message);
      setError(error.message);
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
            <div id="error" className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <h2 style={{ color: "#2E81FB", fontWeight: "bold" }}>Bienvenido</h2>
          <p style={{ fontSize: '20px', }}>
            Inicia sesión y descubre candidatos excepcionales.
          </p>
          <Form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-1"
              >
                Email
              </label>
              <Form.Group className="mb-1" controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Ingresa tu correo"
                  autoComplete="email"
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  className="form-control"
                  required
                />
              </Form.Group>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contraseña
              </label>
              <Form.Group className="mb-2 password-container">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
                  className="password-input"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                </button>
              </Form.Group>

            </div>
            <Button variant="primary" type="submit" style={{ transition: "background-color 0.2s ease" }}>
              {loadingButton ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{" "}
                  Iniciando...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
            <div className="text-center mt-6">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                  Regístrate
                </Link>
              </p>
            </div>


          </Form>
        </Card.Body>
      </div>
    </div>
  );
}

export default Login;
