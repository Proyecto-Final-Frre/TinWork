import React, { useEffect, useState } from "react";
import "./style.css";
import { BsArrowLeftSquare } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { TbFileDescription } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import { BsPersonCircle } from "react-icons/bs";
import DataTable from "react-data-table-component";
import { Link, useLocation } from "react-router-dom";
import {
  findUserByUid,
  getUserAuthenticated,
  pushNotification,
  updateUser,
} from "../../services/UserService";
import { updateOffer } from "../../services/OfferService";
import Modal from "react-bootstrap/Modal";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoSend } from 'react-icons/io5';
import { createMessage, listenForMessages } from "../../services/ChatService.js";
import { useAuth } from "../../context/AuthContext.js";
import { Card } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';


const Chats = () => {
  const location = useLocation(); 
  const state = location.state; 
  const [refresh, setRefresh] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    // Obtener el usuario autenticado
    const getUser = async () => {
      let userAuthenticated = await getUserAuthenticated();
      let user = await findUserByUid(userAuthenticated.uid);
      setUser(user);
    };
    getUser();


  }, []);

  useEffect(() => {
    if (candidate?.uid) { // Asegúrate de que el candidato está seleccionado
      const unsubscribe = listenForMessages(candidate.uid, setMessages); // Escuchar mensajes del chat de este candidato  
      return () => {
        unsubscribe(); // Limpia la suscripción cuando se cierra la modal o cambia de candidato
      };
    }
  }, [candidate]);


  const handleSendMessage = async () => {
    if (message && user.name) {
      await createMessage(message, candidate.uid, user.uid, user.name); // Se usa el UID del candidato  como "chatId"
      setMessage(''); // Limpiar el input del mensaje
    }
  };


  function handleShow(candidateSelected) {
    setShow(true);
    setCandidate(candidateSelected);
  }

  const customStyles = {
    table: {
      style: {
        border: "none",
        borderRadius: "0px",
      },
    },
    headRow: {
      style: {
        background: "linear-gradient(to bottom, rgba(220, 235, 255, 0.9), rgba(100, 160, 255, 0.9))",     
        color: "#2D3748",

        borderBottom: "1px solid #E2E8F0", // Borde sutil para separar el header
        color: "#2D3748", // Color de texto oscuro para mejor legibilidad
        fontSize: "0.969rem",
        fontWeight: "600",
        minHeight: "48px",
      },
    },



  };

  const columnas = [
    {
      center: true,
      cell: (row) => (
        <div>
          <Tooltip title="Conversar" placement="left" arrow>
            <IconButton>
              {row.imageProfile ? (
                <img
                  src={row.imageProfile}
                  alt="Profile"
                  style={{ width: "2em", height: "2em", borderRadius: "50%" }}
                  onClick={() => handleShow(row)}
                />
              ) : (
                <BsPersonCircle
                  size="2em"
                  type="button"
                  onClick={() => handleShow(row)}
                />
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
      width: "25%",
    },
    {
      name: "Estado",
      selector: (row) => {
        switch (row.status) {
          case "wait":
            return "En Espera";
          case "match":
            return "Matcheado";
          case "no-match":
            return "Descartado";
          default:
            return "none";
        }
      },
      sortable: true,
      center: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status === "match",
          style: {
            backgroundColor: "rgba(63, 195, 128, 0.9)",
            color: "white",
          },
        },
        {
          when: (row) => row.status === "wait",

          style: {
            backgroundColor: "#D9D9D9",
            color: "white",
          },
        },
        {
          when: (row) => row.status === "no-match",
          style: {
            backgroundColor: "rgba(242, 38, 19, 0.9)",
            color: "white",
          },
        },
      ],
    },
    {
      name: "Chats",
      grow: 1,
      center: true,

      cell: (row) => (
        <div>
          <Tooltip title="Conversar" placement="top" arrow>
            <IconButton>
              <IoChatbubbleEllipsesOutline
                onClick={() => handleShow(row)}
                size="2em"
                type="button"

              />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleClose=()=>{
    setShow(!show)
  }

  return (
    <div className="main-container-father" >
      <nav className="navbar navbar-expand-lg bg-primary navbar-small py-0">
        <div className="container-fluid">
          <Link to={"/Offers"}>
            <div className="element">
              <BsArrowLeftSquare />
            </div>
          </Link>

          <Card.Title>Chats</Card.Title>
        </div>
      </nav>
      <div className="main-container">

        <aside className="sidebar">
          <ul className="nav  flex-column ">
            <IconContext.Provider value={{ size: "1.5em" }}>
              <li className={`nav-item ${location.pathname === '/candidates' ? 'active' : ''}`}>
                <Link
                  to="/candidates"
                  state={state} // Pasar el estado aquí
                  className="nav-link link-dark d-flex align-items-center flex-row"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', flexDirection: 'row' }}

                >
                  <IoIosPeople />
                  <span>Candidatos</span>

                </Link>
              </li>


              <li className={`nav-item ${location.pathname === '/chats' ? 'active' : ''}`}>
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
          <DataTable
            columns={columnas}
          data={state?.interestedUsers}
            noDataComponent={"No hay candidatos interesados"}
            customStyles={customStyles}

          />
        </section>
      </div>

      <Modal show={show} onHide={handleClose} centered size="lg" dialogClassName="custom-modal">
        <div className="position-absolute top-0 end-0 p-3">
          <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
        </div>

        <Modal.Header  className="d-flex flex-column align-items-center border-bottom">
          <img
            src={candidate?.imageProfile || "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"}
            alt="Foto de perfil"
            className="rounded-circle border"
            width="50"
            height="50"
          />
          <span className="text-muted mt-2">Candidato</span>
          <h5 className="fw-bold">{candidate?.name}</h5>
        </Modal.Header>

        <Modal.Body className="modal-body">
          {/* Zona de mensajes */}
          <div className="chat-messages" style={{ width: '100%', height: '300px', overflowY: 'scroll', padding: '10px', border: '1px solid #ccc' }}>
            {messages.map((msg, index) => (

              <div
                key={index}
                className={`chat-message ${msg.senderUid === user.uid ? 'sent' : 'received'}`}
                style={{ marginBottom: '10px', padding: '5px', backgroundColor: msg.senderUid === user.uid ? '#e0f7fa' : '#f0f0f0' }}
              >
                <strong>{msg.senderName}</strong> {/* Muestra el nombre del remitente */}

                {msg.content}
              </div>
            ))}
          </div>

          {/* Input para escribir el mensaje */}
          <div className="chat-input-container" style={{ display: 'flex', width: '100%', marginTop: '10px' }}>
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button onClick={() => handleSendMessage()} style={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
              <IoSend size={20} />
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );

};
export default Chats;
