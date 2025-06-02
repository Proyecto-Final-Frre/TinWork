import React, { useEffect, useState } from "react";
import "./style.css";
import { BsArrowLeftSquare } from "react-icons/bs";
import { IoIosPeople } from "react-icons/io";
import { IconContext } from "react-icons";
import { BsPersonCircle } from "react-icons/bs";
import DataTable from "react-data-table-component";
import { Link, useLocation } from "react-router-dom";
import {
  findUserByUid,
  getUserAuthenticated
} from "../../services/UserService";
import Modal from "react-bootstrap/Modal";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { IoSend } from 'react-icons/io5';
import { createMessage, listenForMessages } from "../../services/ChatService.js";
import { Card } from "react-bootstrap";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import searchCandidate from "../../logos/search_candidate.gif"


const Chats = () => {
  const location = useLocation(); 
  const state = location.state; 
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
    if (candidate?.uid) { 
        const chatId = 
        candidate.uid < user.uid
        ? `${candidate.uid}_${user.uid}`
        : `${user.uid}_${candidate.uid}`;
      const unsubscribe = listenForMessages(chatId, setMessages);  
            return () => {
        unsubscribe(); 
      };
    }
  }, [candidate,user.uid]);


  const handleSendMessage = async () => {
    if (message && user.name) {
         const chatId = 
        candidate.uid < user.uid
        ? `${candidate.uid}_${user.uid}`
        : `${user.uid}_${candidate.uid}`;
      await createMessage(message, chatId, user.uid, user.name); // Se usa el UID del candidato  como "chatId"
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

  const urlRegex = /(https?:\/\/[^\s]+)/g;

  const renderMessageWithLinks = (text) => {
    const parts = text.split(urlRegex);

    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            {part}
          </a>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });
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
                       src={row.imageProfile || "/placeholder.svg"}
                       alt="Profile"
                       style={{ width: "2em", height: "2em", borderRadius: "50%" }}
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
      }
      ,
      sortable: true,
      center: true,
      conditionalCellStyles: [
       
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
                color="#2980b9"
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
                  state={state} 
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

        <Modal.Header  className="d-flex flex-column align-items-center border-bottom">
          <img
            src={candidate?.imageProfile || "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"}
            alt="Foto de perfil"
            className="rounded-circle border"
            width="50"
            height="50"
          />
          <span className="text-muted mt-2">Candidato a oferta laboral 💼</span>
          <h5 className="fw-bold">{candidate?.name}</h5>
          <h5 className="candidate-modal__field-value">{candidate?.email}</h5>

        </Modal.Header>

        <Modal.Body className="modal-body">
          {/* Zona de mensajes */}
          <div className="chat-messages" style={{ width: '100%', height: '300px', overflowY: 'scroll', padding: '10px', border: '1px solid #ccc' }}>
            {
            
            messages.map((msg, index) => (
              <div
              key={index}              
              style={{ marginBottom: '10px', padding: '5px', backgroundColor: msg.senderId === user.uid ? 'rgba(225, 240, 255, 0.9)' : '#f0f0f0' }}
              >
                  <img
            src={msg.senderId === user.uid ? user?.imageProfile : candidate?.imageProfile  }
            alt="avatar"
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              marginRight: '8px'
            }}
          />
                <strong>{msg.senderName}</strong> {/* Muestra el nombre del remitente */}

             {renderMessageWithLinks(msg.content)}
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
