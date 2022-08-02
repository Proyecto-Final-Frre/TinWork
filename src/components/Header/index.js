import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./style.css";

const Header = () => {
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
                Crear oferta
              </NavDropdown.Item>
              <NavDropdown.Item href="/offers">
                Ver ofertas activas
              </NavDropdown.Item>
              <NavDropdown.Item href="/offers">
                Ver ofertas inactivas
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Dropdown className="dropdown-cuenta">
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Mi Cuenta
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary">log out</Button>
      </Container>
    </Navbar>
  );
};

export default Header;
