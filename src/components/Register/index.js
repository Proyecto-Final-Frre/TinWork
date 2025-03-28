import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Form } from "react-bootstrap";
import "./style.css";
import logoRecrutier from "../../logos/Reclutier.png";
import { createUser } from "../../services/UserService";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [password2, setPassword2] = useState(""); //Para validar campo repetir contraseña
  const [loadingButton, setLoadingButton] = useState(false);

  const expresionNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Para validar campo apynombre
  const [name, setName] = useState("");

  const [error, setError] = useState("");
  const [showPassword, setShowPassword ] = useState("");
  const [showPassword2, setShowPassword2 ] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    if (!expresionNombre.test(name) || name.length < 6) {
      setError("El nombre no es valido por favor ingreselo nuevamente");
    } else {
      if (user.password !== password2) {
        setError("Las contraseñas no coinciden, vuelva a intentar");
      } else {
        setLoadingButton(true)
        try {
          const auth = await signup(name, user.email, user.password);
          const userSave = {
            name: name,
            email: user.email,
            uid: auth.currentUser.uid,
          };
          const userCreated = await createUser(userSave); // Espera el resultado de createUser
          if (userCreated) {
            navigate("/offers"); // Navega solo si se creó el usuario
          } else {
            setError("El usuario ya existe, intente con otro correo.");
          }
        } catch (error) {
          if (error.code === "auth/invalid-email") {
            setError(
              "Email invalido por favor verifique e ingreselo nuevamente"
            );
          }
          if (error.code === "auth/weak-password") {
            setError("Su contraseña debe tener al menos 6 caracteres");
          }
          if (error.code === "auth/email-already-in-use") {
            setError("El email ingresado ya esta en uso");
          }
        }
        finally {
          setLoadingButton(false)
        }
      }
    }
  };

  return (
    <div className="principal-register">
      <div className="register">
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
            Registrate y accede a una red de talento calificado.
          </p>

          <Form onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre y Apellido
              </label>
              <Form.Group className="mb-2" controlId="name">
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre completo"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </div>

            <div className="space-y-1">
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
                    setUser({ ...user, password: e.target.value })
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

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Repetir contraseña
              </label>
              <Form.Group className="mb-2 password-container">
                <Form.Control
                  type={showPassword2 ? "text" : "password"}
                  placeholder="******"
                  autoComplete="current-password"
                  onChange={(e) =>
                    setPassword2(e.target.value)
                  }
                  className="password-input"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword2(!showPassword2)}
                >
                  {showPassword2 ? <FaRegEye /> : <FaRegEyeSlash />
                  }
                </button>
              </Form.Group>
            
            </div>



            <Button variant="primary" type="submit" style={{ width: '100' }}>
              {loadingButton ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Registrando...
                </>
              ) : (
                "Registrar"
              )}
            </Button>


            <p className="my-2 text-sm flex justify-between px-3">
              Ya tienes una cuenta?&nbsp;&nbsp;
              <Link to="/login" className="text-blue-700 hover:text-blue-900">
                Inciar sesión
              </Link>
            </p>
          </Form>
        </Card.Body>


      </div>
    </div>
  );
}

export default Register;
