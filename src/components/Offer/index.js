import React from "react";
import "./style.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { BiBriefcase } from "react-icons/bi";
import { BsCalendarDate, BsPeople } from "react-icons/bs";
const Offer = () => {
  return (
    <div className="card-offer">
      <div class="offer-header">
        <AiOutlineFileSearch class="search" type="button" />
        <h5> Web Mobile Developer</h5>
      </div>
      <div className="card-location">
        <h7>
          <GrLocation /> Buenos aires{" "}
        </h7>
        <h7>
          <BiBriefcase /> Jornada Completa
        </h7>
        <h7>
          <BsCalendarDate /> Hace un mes{" "}
        </h7>
      </div>
      <p class="offer-description">
        With supporting text below as a natural lead-in to additional content.
      </p>
      <a href="#" class="btn">
        Ver mas
      </a>
      <div>
        <BsPeople class="people" type="button" />
      </div>
    </div>
  );
};

export default Offer;
