import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Form } from "react-bootstrap";
import "./style.css";
import logoRecrutier from "../../logos/Reclutier.png";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/offers");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("La contraseña es incorrecta ingrese nuevamente");
      }
      if (error.code === "auth/user-not-found") {
        setError("El usuario aún no esta registrado");
      }
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/offers");
    } catch (error) {
      console.log("Error", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="principal-login">
      <div className="login">
        <img src={logoRecrutier} alt="logo" />

        <Card.Body>
          {error && (
            <div id="error" className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Card.Title className="mb-4">Login Reclutador</Card.Title>
          <Form onSubmit={handleSubmit}>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>

            <Form.Group className="mb-2" controlId="email">
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo"
                autoComplete="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="form-control"
                required
              />
            </Form.Group>

            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <Form.Group className="mb-2" controlId="password">
              <Form.Control
                type="password"
                placeholder="******"
                autoComplete="current-password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="form-control"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
           
            <p className="my-4 text-sm flex justify-between px-3">
              No tiene una cuenta?&nbsp;&nbsp;
              <Link
                to="/register"
                className="text-blue-700 hover:text-blue-900"
              >
                Registrate
              </Link>
            </p>
          </Form>
        </Card.Body>
      </div>
    </div>
  );
}

export default Login;
