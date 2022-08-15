import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";
import { VscWand } from "react-icons/vsc";
import { RiNewspaperLine, RiNewspaperFill } from "react-icons/ri";
import { getUserAuthenticated, logout } from "../../services/UserService";
import { authentication } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [reload, setReload] = useState(false);

  const findUser = async () => {
    const userAuth = await getUserAuthenticated();
    setUser(userAuth);
  };

  useEffect(() => findUser, []);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src="/logo_tinwork.svg"
            width="120"
            height="39"
            className="d-inline-block align-top"
            alt="TinWork"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Ofertas" id="basic-nav-dropdown">
              <NavDropdown.Item href="/create-offer">
                <VscWand /> Crear oferta
              </NavDropdown.Item>
              <NavDropdown.Item href="/offers">
                <RiNewspaperLine /> Ver ofertas activas
              </NavDropdown.Item>
              <NavDropdown.Item href="/offers">
                <RiNewspaperFill /> Ver ofertas inactivas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {user && (
          <Dropdown className="dropdown-cuenta">
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {user.displayName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        {!user ? (
          <Button
            onClick={async () => {
              const result = await authentication();
              console.log(result);
              if (result) {
                setReload(!reload);
              }
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
