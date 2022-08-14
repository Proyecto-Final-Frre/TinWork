import {React, useState} from "react";
import "./style.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { BiBriefcase } from "react-icons/bi";
import { BsCalendarDate, BsPeople } from "react-icons/bs";
import { getCurrentDate } from "../../services/Date";

const Offer = ({ title, description, province, workDay, country, dateOffer }) => {

  const[isReadMoreShown,setReadMoreShown]=  useState(false)
  const toggleBtn =()=>{
    setReadMoreShown(prevState => !prevState) }
  
  let calculateDate = "";
  const calculateDateOffer = (dateOffer) => {
    calculateDate = getCurrentDate("") - dateOffer;
    return calculateDate;
  }

  calculateDateOffer(dateOffer);

  return (
    <div className="card-offer">
      <div className="offer-header">
        <AiOutlineFileSearch className="search" type="button" />
        <h5>{title}</h5>
      </div>
      <div className="card-location">

        <h6>
          <GrLocation />{country} {province}
        </h6>
        <h6>
          <BiBriefcase /> {workDay}
        </h6>
        <h6>
          <BsCalendarDate /> {calculateDate} días
        </h6>
      </div>
            
      <p className="offer-description">{isReadMoreShown ? description : description.substr(0,145) }</p>
      
      <a href="#" className="btn btn-ver"  onClick={toggleBtn}>{isReadMoreShown ?  "Ver menos" : "Ver más"}        </a>
      
      <div class="footer">
        <BsPeople className="people" type="button" />
        <button type="button" class="btn btn-link" ><span>+5</span> interesados</button>
      </div>
      
    </div>
  );
};



export default Offer;
