import React from "react";
import "./style.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import {BiBriefcase }from "react-icons/bi"; 
import {BsCalendarDate, BsPeople} from "react-icons/bs";
const Offer = () => {
  return (
    <div className="card-offer">
      <div class="card-header">     
            <AiOutlineFileSearch class="search" type="button"/> 
            <h5 class="card-title "> Web Mobile Developer</h5>
      </div>
      <h7 ><GrLocation /> Buenos aires </h7>
      <h7><BiBriefcase /> Jornada Completa</h7>
      <br></br>
      <h7><BsCalendarDate /> Hace un mes </h7>
      <div class="card text-center ">
          <div class="card-body">
         
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Ver mas
          </a>
        </div>
        
      </div>
      <div>
          <BsPeople class="people" type="button" /> 
      </div>
    </div>
  );
};

export default Offer;
