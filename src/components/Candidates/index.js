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
   <div class="container-sidebar" >
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
    <div>
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre y apellido</th>
      <th scope="col">Aptitudes coincidentes</th>
      <th scope="col">Estado</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>Matcheado</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>En espera</td>
      <td>@twitter</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>Descartado</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
   </div>
   </div>
   
   </div>
   
   
   
        
    );
};

export default Candidates;
