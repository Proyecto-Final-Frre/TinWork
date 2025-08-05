import React, { useState } from "react";
import { Button, Dropdown, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdWorkOutline } from "react-icons/md"

import "./style.css";
import { VscWand } from "react-icons/vsc";
import { RiNewspaperLine } from "react-icons/ri";
import { RiNewspaperFill } from "react-icons/ri";

import { logout } from "../../services/UserService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { styled } from "@mui/material/styles"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reload, setReload] = useState(false);
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: "40px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#0d6efd",
    height: "3px",
  },
  "& .MuiTab-root": {
    minHeight: "40px",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    color: "#6c757d",
    "&.Mui-selected": {
      color: "#0d6efd",
    },
  },
}))

  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    console.log("🚀 ~ handleChange ~ newValue:", newValue)
    setValue(newValue)

    // Navegación automática basada en el tab seleccionado
    switch (newValue) {
      case 0:
        navigate("/create-offer")
        break
      case 1:
        navigate("/offers")
        break
      case 2:
        navigate("/offersDisabled")
        break
      default:
        break
    }
  }
  return (
    <Navbar >
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
        {/* {user && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Ofertas" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/create-offer">
                <VscWand /> Crear oferta
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/offers">
                <RiNewspaperLine /> Ver ofertas activas
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
        )} */}
           {/* Tabs integrados en lugar del dropdown */}
              <div className="mx-3">
                <StyledTabs
                  value={value}
                  onChange={handleChange}
                  aria-label="ofertas laborales tabs"
                  variant="standard"
                >
                  <Tab
                    icon={<VscWand size={16} />}
                    label="Crear Oferta Laboral"
                    iconPosition="start"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      minWidth: "auto",
                      padding: "6px 12px",
                    }}
                  />
                  <Tab
                    icon={<MdWorkOutline size={16} />}
                    label="Activas"
                    iconPosition="start"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      minWidth: "auto",
                      padding: "6px 12px",
                    }}
                  />
                  <Tab
                    icon={<MdWorkOutline size={16} />}
                    label="Inactivas"
                    iconPosition="start"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      minWidth: "auto",
                      padding: "6px 12px",
                    }}
                  />
                </StyledTabs>
              </div>
        {user && (
          <Dropdown className="dropdown-cuenta">
            <Dropdown.Toggle className="dropdown-toggle" variant="light" id="dropdown-basic">
              <Image
                src={user.photoUrl ?? user.photoURL ?? "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"} 
                roundedCircle
                width="30" 
                height="30"
                alt="User Avatar"
                className="me-2" 
              />
              {user.displayName}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu" >
              <Dropdown.Item href="/profile">Mi perfil</Dropdown.Item>

            </Dropdown.Menu>
          </Dropdown>
        )}
        {!user ?
       
          null
          : (
            <Button
              onClick={async () => {
                const result = await logout();
                if (result) {
                  navigate("/login");
                  setReload(!reload);
                }
              }}
              variant="primary"
            >
              Cerrar sesión
            </Button>
          )}
      </Container>
    </Navbar>
  );
};

export default Header;
