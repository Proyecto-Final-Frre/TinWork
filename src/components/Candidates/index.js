import React, { useEffect, useState } from "react";
import "./style.css";
import { Card } from "react-bootstrap";
import { BsArrowLeftSquare } from "react-icons/bs";
import { IoIosPeople, IoMdEye } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

import { IconContext } from "react-icons";
import { TiDeleteOutline } from "react-icons/ti";
import { BsPersonCircle } from "react-icons/bs";
import DataTable from "react-data-table-component";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link, useLocation } from "react-router-dom";
import {
  findUserByUid,
  pushNotification,
  updateUser,
} from "../../services/UserService";
import { updateOffer } from "../../services/OfferService";
import Modal from "react-bootstrap/Modal";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GrDocumentPdf } from "react-icons/gr";
import Swal from "sweetalert2";
import matchBadoo from "../../logos/match-badoo.gif"
import noLike from "../../logos/noLike.gif"
import searchCandidate from "../../logos/search_candidate.gif"
const Candidates = () => {
  const { state } = useLocation();
  const currentLocation = useLocation();
  const [refresh, setRefresh] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [show, setShow] = useState(false);
  const [cvUrl, setCvUrl] = useState(candidate?.cv);
  const [certifications, setCertifications] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certifications.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === certifications.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    setCvUrl(candidate?.cv);
  }, [candidate]);


  const handleShow = async (candidateSelected) => {
    const user = await findUserByUid(candidateSelected.uid);
    setShow(true);
    setCertifications(user.certifications);
    setCandidate(candidateSelected);
  }

  const handleMatch = async (element) => {
    Swal.fire({
      title: 'Realizando match...',
      text:`Estamos conectando a ${element.name} con la oferta.`,
      imageUrl: matchBadoo, 
      imageWidth: 150,
      imageHeight: 150,
      showConfirmButton: false,
      allowOutsideClick: false,
      background: "#e3f2fd",
    });
    try {
      const user = await findUserByUid(element.uid);
      await pushNotification(user.token, state);

      state.interestedUsers.forEach((interestedUser) => {
        if (interestedUser.uid === element.uid) {
          interestedUser.status = "match";
        }
      });

      const offerUpdate = {
        id: state.id,
        interestedUsers: state.interestedUsers,
      };

      await updateOffer(offerUpdate);

      const userUpdate = {
        id: user.id,
        offersMatch: [...user.offersMatch, state],
      };

      await updateUser(userUpdate);
      Swal.fire({
        title: "¡Match realizado!",
        text: `Se conectó exitosamente a ${user.name} con la oferta.`,
        icon: "success",
        confirmButtonText: "Aceptar",
        background: "#e3f2fd",
        confirmButtonColor: "#1976d2",
        customClass: {
          popup: 'winork-popup',
          confirmButton: 'winork-button'
        }
      });
      setRefresh(!refresh);
    } catch (error) {
        Swal.fire({
        title: "Error al hacer match",
        text: "Ocurrió un problema al conectar con el candidato. Intenta nuevamente.",
        icon: "error",
        // background: "#fce4ec",
        confirmButtonColor: "#d32f2f",
      });
    } 
  };
 


  const handleNoMatch = async (element) => {
    const result = await Swal.fire({
      title: `¿Estás seguro que querés descartar a ${element.name}?`,
      icon: "warning",
      showCancelButton: true,
      background: "#e3f2fd", 
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, descartar",
      cancelButtonText: "Cancelar"
    });
  
    if (!result.isConfirmed) return;
  
    Swal.fire({
      title: "Descartando...",
      text: "Por favor, espere",
      imageUrl: noLike, 
      imageWidth: 150,
      imageHeight: 150,
      background: "#e3f2fd", 
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    try {
      const user = await findUserByUid(element.uid);
  
      // Cambiar el estado del interesado a "no-match"
      state.interestedUsers.forEach((interestedUser) => {
        if (interestedUser.uid === element.uid) {
          interestedUser.status = "no-match";
        }
      });
  
      // Actualizar la oferta con el nuevo estado
      await updateOffer({
        id: state.id,
        interestedUsers: state.interestedUsers,
      });
  
      // Remover la oferta del array offersMatch del usuario
      const updatedOffersMatch = user.offersMatch.filter(
        (offer) => offer.id !== state.id
      );
  
      await updateUser({
        id: user.id,
        offersMatch: updatedOffersMatch,
      });
      Swal.fire({
        title: "Descartado",
        text: `Se descartó correctamente a ${element.name} de la oferta.`,
        icon: "success",
        confirmButtonText: "Aceptar", 
        background: "#e3f2fd",       
        confirmButtonColor: "#1976d2" 
      });
  
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error al descartar candidato:", error);
    }
  };

 

  const customStyles = {
    table: {
      style: {
        border: "none",
        borderRadius: "0px",
      },
    },
    headRow: {
      style: {
        background: "linear-gradient(to bottom, #F0F7FF, #C2DEFF)",
        borderBottom: "1px solid #E2E8F0",
        color: "#2D3748",
        fontSize: "0.969rem",
        fontWeight: "600",
        minHeight: "48px",
      },
    },
    rows: {
      style: {
        backgroundColor: '#F0F7FF', 
      },

    },


  };


  const columnas = [
    {
      center: true,
      cell: (row) => (
        <div>
          <Tooltip title="Ver perfil" placement="left" arrow>
            <IconButton>
              {row.imageProfile ? (
                <img
                  src={row.imageProfile || "/placeholder.svg"}
                  alt="Profile"
                  style={{ width: "2.0em", height: "2.0em", borderRadius: "50%" }}
                  onClick={() => handleShow(row)}
                />
              ) : (
                <BsPersonCircle size="1.8em" type="button" onClick={() => handleShow(row)} />
              )}
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
    {
      name: "Apellidos y nombres",
      selector: (row) => row.name,
      sortable: true,
      width: "15%",
    },
    {
      name: "Aptitudes coincidentes",
      selector: (row) => row.aptcoincidentes,
      sortable: true,
      width: "30%",
      center: true,
    },
    {
      name: "Estado",
      cell: (row) => {  
        switch (row.status) {
          case "wait":
            return (
              <div
                style={{
                  backgroundColor: "#cce0f4",
                  color:"#1a3e5f",
                  borderRadius: "16px",
                  padding: "8px 24px",
                  fontWeight: "500",
                  display: "inline-block",
                  width: "auto",
                  maxWidth: "120px",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  margin: "0 auto",
                }}
              >
                En Espera
              </div>
            )
          case "match":
            return (
              <div
                style={{
                  backgroundColor: "rgba(63, 195, 128, 0.9)",
                  color: "white",
                  borderRadius: "16px",
                  padding: "8px 24px",
                  fontWeight: "500",
                  display: "inline-block",
                  width: "auto",
                  maxWidth: "120px",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  margin: "0 auto",
                }}
              >
                Matcheado
              </div>
            )
          case "no-match":
            return (
              <div
                style={{
                  backgroundColor: "rgba(242, 38, 19, 0.9)",
                  color: "white",
                  borderRadius: "16px",
                  padding: "8px 24px",
                  fontWeight: "500",
                  display: "inline-block",
                  width: "auto",
                  maxWidth: "120px",
                  textAlign: "center",
                  fontSize: "0.85rem",
                  margin: "0 auto",
                }}
              >
                Descartado
              </div>
            )
          default:
            return "none"
        }
      },
      sortable: true,
      center: true,
      conditionalCellStyles: [],
    },
    {
      name: "Acciones",
      grow: 1,
      center: true,
      cell: (row) => (
        <div className="flex items-center justify-center gap-2">
          <Tooltip title="Descartar" placement="top" arrow>
            <IconButton
              className="transition-transform hover:scale-110 hover:bg-red-100 rounded-full p-1"
              disabled={row.status === "no-match" /*|| processingCandidateId === row.uid*/}
            >
              <TiDeleteOutline
                size="1.8em"
                type="button"
                onClick={() => handleNoMatch(row)}
                style={{
                  cursor: row.status === "no-match" ? "default" : "pointer",
                  color: row.status === "no-match" ? "#f22613" : "#666",
                  opacity: row.status === "no-match" ? 1 : 0.8,
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title={row.status === "match" ? "Ya matcheado" : "Matchear"} placement="top" arrow>
            <IconButton
              className="transition-transform hover:scale-110 hover:bg-green-100 rounded-full p-1"
              disabled={row.status === "match" }
            >
              <FaHeart
                onClick={() => row.status !== "match" && handleMatch(row)}
                size="1.8em"
                type="button"
                style={{
                  cursor: row.status === "match" ? "default" : "pointer",
                  color: row.status === "match" ? "#3fc380" : "#666",
                  opacity: row.status === "match" ? 1 : 0.8,
                  transition: "color 0.3s ease, transform 0.2s ease",
                }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Ver perfil" placement="top" arrow>
            <IconButton className="transition-transform hover:scale-110 hover:bg-blue-100 rounded-full p-1">
              <IoMdEye
                onClick={() => handleShow(row)}
                size="2em"
                type="button"
                style={{
                  color: "#2980b9",
                  transition: "transform 0.2s ease",
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ]

  let count = 0;
  const abilitiesOffer = state?.requiredAbilities;
  state?.interestedUsers.map((e) => {
    const abilitiesUser = e.abilities;
    abilitiesUser.forEach((ability) => {
      if (abilitiesOffer.includes(ability)) {
        count++;
      }
    });
    const apt = {
      aptcoincidentes: count,
    };

    Object.assign(e, apt);
    count = 0;
    return true
  });

  const handleClose = () => {
    setShow(!show)
  }

  const NoDataComponent = () => (
    <div style={{ textAlign: 'center', padding: '80px',width:"100%",}}>
      <img
        src={searchCandidate}
        alt="No hay candidatos"
        style={{ width: '150px', opacity: 0.6 }}
      />
      <p style={{ marginTop: '20px', fontSize: '20px', color: '#555' }}>
        No hay candidatos interesados en esta oferta aún.
      </p>
    </div>
  );

  return (
    <div className="main-container-father">
      <nav className="navbar navbar-expand-lg bg-primary navbar-small py-0">
        <div className="container-fluid">
          <Link to={"/Offers"}>
            <div className="element">
              <BsArrowLeftSquare />
            </div>
          </Link>

          <Card.Title>{state?.title}</Card.Title>
        </div>
      </nav>
      <div className="main-container">
        <aside className="sidebar">
          <ul className="nav  flex-column ">
            <IconContext.Provider value={{ size: "1.5em" }}>
              <li className={`nav-item ${currentLocation.pathname === '/candidates' ? 'active' : ''}`}>
                <a
                  href="/candidates"
                  className="nav-link link-dark d-flex align-items-center flex-row"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}
                >
                  <IoIosPeople />
                  <span>Candidatos</span>
                </a>
              </li>

              <li className={`nav-item ${currentLocation.pathname === '/chats' ? 'active' : ''}`}>
                <Link
                  to="/chats"
                  state={state}
                  className="nav-link link-dark d-flex align-items-center flex-row"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}
                >
                  <IoChatbubbleEllipsesOutline />
                  <span>Chat</span>
                </Link>
              </li>
            </IconContext.Provider>



          </ul>
        </aside>
        <section className="table-candidates">
        {state?.interestedUsers?.length === 0 ? (
          
            <NoDataComponent />
          
        ) : (
          <DataTable
            columns={columnas}
            data={state?.interestedUsers}
            customStyles={customStyles}
            
          />
        )}
        </section>
      </div>
      <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="custom-modal">
        <div className="position-absolute top-0 end-0 p-3">
          <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
        </div>

        <Modal.Header className="d-flex flex-column align-items-center border-bottom justify-content-center pt-4">
          <img
            src={
              candidate?.imageProfile ||
              "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
            }
            alt="Foto de perfil"
            className="rounded-circle border"
            width="80"
            height="80"
          />
          <span className="text-muted mt-2">Candidato a oferta laboral 💼</span>
          <h5 className="fw-bold">{candidate?.name}</h5>
          <h5 className="candidate-modal__field-value">{candidate?.email}</h5>
        </Modal.Header>

        <Modal.Body style={{ padding: 5 }}>
           <div className="d-flex align-items-center" style={{ gap: "8px", width: "100%", padding: "5px 10px", display: "flex" }}>
             <span className="section-icon" style={{ fontSize: "18px" }}>📍</span> 
            <div className="d-flex align-items-center" style={{ gap: "5px", flexWrap: "wrap" }}>
              <div className="section-title" style={{ fontWeight: "bold" }}>Ubicación</div>
              <h5 className="candidate-modal__field-value" style={{ margin: 0, fontWeight: "normal" }}>
                {candidate?.location?.name|| "ubicación no registrada."}
              </h5>
            </div>  
          </div> 

          <div
            className="d-flex align-items-center"
            style={{ gap: "8px", width: "100%", padding: "5px 10px", display: "flex" }}
          >
            <span className="section-icon" style={{ fontSize: "18px" }}>🧠</span>
            <div className="d-flex align-items-center" style={{ gap: "5px", flexWrap: "wrap" }}>
              <div className="section-title" style={{ fontWeight: "bold" }}>Habilidades</div>

            </div>

          </div>
          <div className="candidate-modal__abilities">
            {console.log("abilitesss",candidate?.abilities)}
            {candidate?.abilities?.map((ability, index) => (
              <div key={index} className="candidate-modal__ability">
                {ability}
              </div>
            ))}
          </div>

           <div className="d-flex align-items-start" style={{ gap: "10px", width: "100%", padding: "10px" }}>
            <span className="section-icon" style={{ fontSize: "18px" }}>📝</span>
            <div style={{ width: "100%" }}>
              <div className="section-title" style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>
                Descripción:
              </div>
              <section
                className="modal-body-description"
                style={{
                  background: "rgba(235, 245, 255, 0.6)",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  maxHeight: "150px",
                  overflowY: "auto",
                  whiteSpace: "pre-wrap",
                  border: "1px solid rgba(200, 220, 255, 0.8)",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.05)"
                }}
              >
                <p style={{ margin: 0 }}>
                  {candidate?.description || "El candidato no cargó una descripción en su perfil."}
                </p>
              </section>
            </div>

          </div>
          <div
            className="d-flex align-items-center"
            style={{ width: "100%", padding: "5px 10px", display: "flex" }}
          >

            {cvUrl ? (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: '#fff',
                  fontWeight: 'bold',
                  display: 'inline-block',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  backgroundColor: '#007bff',
                  transition: 'background-color 0.3s ease',
                  textAlign: 'center'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
              >

                <span
                  className="section-icon"
                  style={{
                    fontSize: "18px",
                    marginRight: "8px", 
                    color: "#D32F2F", 
                  }}
                >
                  <GrDocumentPdf />
                </span>
                Visualizar Currículum
              </a>
            ) : (
              <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
                El candidato no ha subido su currículum.
              </p>
            )}
          </div>


          <div className="section-title" style={{ fontWeight: "bold", fontSize: "16px", marginBottom: "5px" }}>
            <span className="section-icon" style={{ fontSize: "18px" }}>🎓</span>Certificaciones
          </div>
          {certifications?.length > 0 ?

            <div className="carrusel-container">
              <button className="carrusel-button" onClick={handlePrev}>
                ◀
              </button>
              <div className="carrusel-slide">
                <img
                  src={certifications[currentIndex]}
                  alt="Certificados del usuario" 
                />
              </div>
              <button className="carrusel-button" onClick={handleNext}>
                ▶
              </button>
            </div>

            : <section className="modal-body-description">
              <p>El candidato/a no cargo certificaciones en su perfil.</p>
            </section>

          } 

        </Modal.Body>   
      </Modal>



    </div>


  );
};
export default Candidates;
