import React from "react";
import "./style.css";
import { Card } from "react-bootstrap";
import { BsArrowLeftSquare } from "react-icons/bs";
import { IoIosPeople, IoMdHeartEmpty } from "react-icons/io"
import { TbFileDescription } from "react-icons/tb"
import { AiOutlineStar } from "react-icons/ai"
import { IconContext } from "react-icons";
import { TiDeleteOutline } from "react-icons/ti"
import { BsPersonCircle } from "react-icons/bs"
import DataTable from "react-data-table-component";
import { useLocation } from "react-router-dom";


const columnas = [
  {

    center: true,
    cell: () => (
      <div>
        <BsPersonCircle size="2em" type="button" />
      </div>)

  },
  {

    name: "Apellidos y nombres",
    selector: row => row.name,
    sortable: true,
    width: '25%',

  },
  {
    name: "Aptitudes coincidentes",
    selector: "aptcoincidentes",
    sortable: true,
    width: '30%',
    center: true,


  },
  {
    name: "Estado",
    selector: row => row.status,
    sortable: true,
    center: true,
    conditionalCellStyles: [
      {
        when: row => row.status === "Matcheado",
        style: {
          backgroundColor: 'rgba(63, 195, 128, 0.9)',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: row => row.status === "wait",

        style: {
          backgroundColor: '#D9D9D9',
          color: 'white',
          '&:hover': {
            cursor: 'pointer',
          },
        },
      },
      {
        when: row => row.status === "Descartado",
        style: {
          backgroundColor: 'rgba(242, 38, 19, 0.9)',
          color: 'white',
          '&:hover': {
            cursor: 'not-allowed',
          },
        },
      },
    ],

  },
  {
    name: "Acciones",
    grow: 1,
    center: true,

    cell: row => (

      <div>
        <TiDeleteOutline size="2em" type="button" />
        <IoMdHeartEmpty onClick={e => console.log("haciendo click devolves?", e, row.name)} size="2em" type="button" />
      </div>
    ),


  }
]



const Candidates = () => {

  const { state } = useLocation();


  //Para sacar la cantidad de aptitudes coincidentes
  let count = 0
  const abilitiesOffer = state.requiredAbilities
  state.interestedUsers.map((e) => {

    const abilitiesUser = e.abilities
    abilitiesUser.forEach(ability => { if (abilitiesOffer.includes(ability)) { count++; return true } return false })
    const apt = {
      aptcoincidentes: count
    }

    Object.assign(e, apt);
    count = 0
  })






  return (
    <div >

      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <a className="element" href="/Offers"><BsArrowLeftSquare /></a>
          <Card.Title>{state.title}</Card.Title>
        </div>
      </nav>
      
        <aside className="sidebar">
        
          <ul className="nav  flex-column ">
            <IconContext.Provider value={{ size: "3em" }}>
              <li className="nav-item ">
                <a href="/candidates" className="nav-link link-dark"   >
                  <IoIosPeople />Candidatos
                </a>

              </li>
              <li>
                <a href="#" className="nav-link link-dark">
                  <TbFileDescription />Descripción
                </a>
              </li>
              <li>
                <a href="#" className="nav-link link-dark">
                  <AiOutlineStar />Aptitudes requeridas
                </a>
              </li>
            </IconContext.Provider>


          </ul>

        
       
        </aside>

        <section className="table-candidates">
          <DataTable
            columns={columnas}
            data={state.interestedUsers}
          />
        </section>



      
    </div>




  );
};


/*<nav class="navbar navbar-expand-lg bg-primary">
        <div class="container-fluid">
          <a class="elment" href="/Offers"><BsArrowLeftSquare /></a>
          <Card.Title>{state.title}</Card.Title>
        </div>
      </nav>
      <div class="container-sidebar-table">
        <div class="container-sidebar" >
          <ul class="nav  flex-column ">
            <IconContext.Provider value={{ size: "2em" }}>
              <li class="nav-item">
                <a href="#" class="nav-link link-dark"  >
                  <IoIosPeople />Candidatos
                </a>

              </li>
              <li>
                <a href="#" class="nav-link link-dark">
                  <TbFileDescription />Descripción
                </a>
              </li>
              <li>
                <a href="#" class="nav-link link-dark">
                  <AiOutlineStar />Aptitudes requeridas
                </a>
              </li>
            </IconContext.Provider>


          </ul>

        </div>
        <div class="table" >
          <DataTable
            columns={columnas}
            data={state.interestedUsers}

          />
        </div>

      </div>*/
export default Candidates;
