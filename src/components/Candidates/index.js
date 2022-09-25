import React, { useEffect, useState } from "react";
import "./style.css";
import { Card } from "react-bootstrap";
import { BsArrowLeftSquare } from "react-icons/bs";
import { IoIosPeople, IoMdHeartEmpty } from "react-icons/io";
import { TbFileDescription } from "react-icons/tb";
import { AiOutlineStar } from "react-icons/ai";
import { IconContext } from "react-icons";
import { TiDeleteOutline } from "react-icons/ti";
import { BsPersonCircle } from "react-icons/bs";
import DataTable from "react-data-table-component";
import { Link, useLocation } from "react-router-dom";
import { findUserByUid, pushNotification } from "../../services/UserService";
import { updateOffer } from "../../services/OfferService";
import Modal from "react-bootstrap/Modal";

const Candidates = () => {
  const { state } = useLocation();
  const [refresh, setRefresh] = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {}, [refresh]);

  function handleShow(candidateSelected) {
    setShow(true);
    setCandidate(candidateSelected);
  }

  const handleMatch = async (element) => {
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
    setRefresh(!refresh);
  };

  const handleNoMatch = async (element) => {
    state.interestedUsers.forEach((interestedUser) => {
      if (interestedUser.uid === element.uid) {
        interestedUser.status = "no-match";
      }
    });

    const offerUpdate = {
      id: state.id,
      interestedUsers: state.interestedUsers,
    };

    await updateOffer(offerUpdate);
    setRefresh(!refresh);
  };

  const columnas = [
    {
      center: true,
      cell: (row) => (
        <div>
          <BsPersonCircle
            size="2em"
            type="button"
            onClick={() => handleShow(row)}
          />
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
      name: "Aptitudes coincidentes",
      selector: "aptcoincidentes",
      sortable: true,
      width: "30%",
      center: true,
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
      name: "Acciones",
      grow: 1,
      center: true,

      cell: (row) => (
        <div>
          <TiDeleteOutline
            size="2em"
            type="button"
            onClick={() => handleNoMatch(row)}
          />
          <IoMdHeartEmpty
            onClick={() => handleMatch(row)}
            size="2em"
            type="button"
          />
        </div>
      ),
    },
  ];

  //Para sacar la cantidad de aptitudes coincidentes
  let count = 0;
  const abilitiesOffer = state.requiredAbilities;
  state.interestedUsers.map((e) => {
    const abilitiesUser = e.abilities;
    abilitiesUser.forEach((ability) => {
      if (abilitiesOffer.includes(ability)) {
        count++;
        return true;
      }
      return false;
    });
    const apt = {
      aptcoincidentes: count,
    };

    Object.assign(e, apt);
    count = 0;
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link to={"/Offers"}>
            <div className="element">
              <BsArrowLeftSquare />
            </div>
          </Link>

          <Card.Title>{state.title}</Card.Title>
        </div>
      </nav>

      <aside className="sidebar">
        <ul className="nav  flex-column ">
          <IconContext.Provider value={{ size: "3em" }}>
            <li className="nav-item ">
              <a href="/candidates" className="nav-link link-dark">
                <IoIosPeople />
                Candidatos
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-dark">
                <TbFileDescription />
                Descripción
              </a>
            </li>
            <li>
              <a href="#" className="nav-link link-dark">
                <AiOutlineStar />
                Aptitudes requeridas
              </a>
            </li>
          </IconContext.Provider>
        </ul>
      </aside>

      <section className="table-candidates">
        <DataTable columns={columnas} data={state.interestedUsers} />
      </section>

      <Modal
        show={show}
        size="xl"
        centered={true}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{candidate?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>
    </div>
  );
};
export default Candidates;
