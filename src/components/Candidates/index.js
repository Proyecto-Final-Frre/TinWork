import React from "react";
import "./style.css";
import {Card} from "react-bootstrap";
import { BsArrowLeftSquare } from "react-icons/bs";
import {IoIosPeople,IoMdHeartEmpty } from "react-icons/io"
import {TbFileDescription} from "react-icons/tb"
import {AiOutlineStar} from "react-icons/ai"
import { IconContext } from "react-icons";
import {TiDeleteOutline} from "react-icons/ti"
import DataTable from "react-data-table-component";

const tablaCandidatos =[
  { id:1, apynombr:"Lionel Messi Andres",aptcoincidentes:"1", estado:"Matcheado"},
  { id:2, apynombr:"Anibal Dernandez",aptcoincidentes:"2", estado:"En espera"},
  { id:3, apynombr:"Pepe de la Cruz ",aptcoincidentes:"3",estado:"Descartado"}, 
  { id:4, apynombr: "Dimaria Angel",aptcoincidentes:"5",estado:"Matcheado"  } ,
];


const columnas = [
  {name :"ID ",
  selector:"id",
  sortable : true,
  
  } ,
  {name :"Apellidos y nombres",
  selector :"apynombr",
  sortable : true,
  width:'30%',
  
  },
  {name :"Aptitudes coincidentes",
  selector :"aptcoincidentes",
  sortable : true,
  width:'30%'
  },
  {name:"Estado",
  selector: row => row.estado,
  sortable:true,
  
  conditionalCellStyles: [
    {
      when: row => row.estado === "Matcheado",
      style: {
        backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.estado==="En espera",
      style: {
        backgroundColor: 'rgba(248, 148, 6, 0.9)',
        color: 'white',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.estado === "Descartado",
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
  { name:"Acciones",
    grow:1,
		cell: () => (
      <div>
      <TiDeleteOutline size="2em" type="button" />        
      <IoMdHeartEmpty size="2em" type="button" />  
      </div>
              

        
			
		),
		
	}
]

     

const Candidates = () => {
  return (  
   <div>
   <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <a class="elment" href="/Offers"><BsArrowLeftSquare /></a>   
      <Card.Title>Mobile developer</Card.Title>
    </div>
   </nav>
   <div class="container-sidebar" >
   <ul class="nav nav-pills flex-column mb-auto">
      <IconContext.Provider value={{size:"2em"}}>
      <li class="nav-item">
        <a href="#" class="nav-link link-dark" >          
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
    <div class="table" >
    <DataTable 
      columns={columnas}
      data={tablaCandidatos}
      
    />
   </div>
   </div>
   
   </div>
   
   
   
        
    );
};

export default Candidates;
