import React from "react";
import "./style.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { BiBriefcase } from "react-icons/bi";
import { BsCalendarDate, BsPeople } from "react-icons/bs";
const Offer = ({ title, description }) => {
  return (
    <div className="card-offer">
      <div className="offer-header">
        <AiOutlineFileSearch className="search" type="button" />
        <h5>{title}</h5>
      </div>
      <div className="card-location">
        <h6>
          <GrLocation /> Buenos aires{" "}
        </h6>
        <h6>
          <BiBriefcase /> Jornada Completa
        </h6>
        <h6>
          <BsCalendarDate /> Hace un mes{" "}
        </h6>
      </div>
      <p className="offer-description">{description}</p>
      <a href="#" className="btn">
        Ver mas
      </a>
      <div>
        <BsPeople className="people" type="button" />
      </div>
    </div>
  );
};

export default Offer;
