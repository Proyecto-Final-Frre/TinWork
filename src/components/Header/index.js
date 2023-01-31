import React, { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";
import { VscWand } from "react-icons/vsc";
import { RiNewspaperLine, RiNewspaperFill } from "react-icons/ri";
import { logout } from "../../services/UserService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reload, setReload] = useState(false);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to={"/"}>
          <Navbar.Brand>
            <img
              src="/logo_tinwork.svg"
              width="120"
              height="39"
              className="d-inline-block align-top"
              alt="TinWork"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Ofertas" id="basic-nav-dropdown">
                <NavDropdown.Item>
                  <VscWand />{" "}
                  <Link
                    to={"/create-offer"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Crear oferta
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <RiNewspaperLine />{" "}
                  <Link
                    to={"/offers"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Ver ofertas activas
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <RiNewspaperFill />{" "}
                  <Link
                    to={"/offers"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Ver ofertas inactivas
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        )}
        {user && (
          <Dropdown className="dropdown-cuenta">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {user.displayName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/profile">Mi perfil</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {!user ? (
          <Button
            onClick={async () => {
              navigate("/login");
            }}
            variant="primary"
          >
            log in
          </Button>
        ) : (
          <Button
            onClick={async () => {
              const result = await logout();
              if (result) {
                navigate("/");
                setReload(!reload);
              }
            }}
            variant="primary"
          >
            log out
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
