import React from "react";
import "./style.css";
import { AiOutlineFileSearch } from "react-icons/ai";
const Offer = () => {
  return (
    <div className="card-offer">
      <div class="card text-center ">
        <AiOutlineFileSearch />
        <div class="card-body">
          <h5 class="card-title ">Web Mobile Developer</h5>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="btn btn-primary">
            Ver mas
          </a>
        </div>
      </div>
    </div>
  );
};

export default Offer;
