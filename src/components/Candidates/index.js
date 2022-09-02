import React from "react";
import "./style.css";
import { Button, Card, Form } from "react-bootstrap";
import { BsArrowLeftSquare } from "react-icons/bs";
//
//<Card.Title>Mobile developer</Card.Title>
const Candidates = () => {
  return (  
   <div>
   <nav class="navbar navbar-expand-lg bg-primary">
    <div class="container-fluid">
      <a class="elment" href="/Offers"><BsArrowLeftSquare /></a>   
      <Card.Title>Mobile developer</Card.Title>
    </div>
   </nav>
   <div >
   <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link link-dark" >
          Candidatos
          
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          
          Descripción
        </a>
      </li>
      <li>
        <a href="#" class="nav-link link-dark">
          Aptitudes requeridas
        </a>
      </li>
      
      
     
    </ul>
   </div>
   </div>
   
   
   
        
    );
};

export default Candidates;
