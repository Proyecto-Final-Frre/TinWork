import { React, useState } from "react";
import "./style.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { BiBriefcase } from "react-icons/bi";
import { BsCalendarDate, BsPeople } from "react-icons/bs";
import { getCurrentDate } from "../../services/Date";
import { storage } from "../../config/firebase";

const Offer = ({
  title,
  description,
  province,
  workDay,
  country,
  dateOffer,
  interestedUsers,
  image,
}) => {
  const [isReadMoreShown, setReadMoreShown] = useState(false);
  const toggleBtn = () => {
    setReadMoreShown((prevState) => !prevState);
  };

  let calculateDate = "";
  const calculateDateOffer = (dateOffer) => {
    calculateDate = getCurrentDate("") - dateOffer;
    return calculateDate;
  };

  calculateDateOffer(dateOffer);

  return (
    <div className="card-offer">
      <img src={"image/"+image}></img>
      <div className="offer-header">
        <AiOutlineFileSearch className="search" type="button" />
        <h5>{title}</h5>
      </div>
      <div className="card-location">
        <h6>
          <GrLocation />
          {country}, {province}
        </h6>
        <h6>
          <div className="work">
            <BiBriefcase /> {workDay}
          </div>
        </h6>
        <h6>
          <BsCalendarDate /> {calculateDate} días
        </h6>
      </div>

      <p className="offer-description">
        {isReadMoreShown ? description : description.substr(0, 145)}
      </p>

      {description?.length > 300 && (
        <button className="btn btn-ver" onClick={toggleBtn}>
          {isReadMoreShown ? "Ver menos" : "Ver más"}{" "}
        </button>
      )}

      <div className="footer">
        <BsPeople className="people" type="button" />
        <button type="button" class="btn btn-link">
          <span>{interestedUsers?.length}</span> interesados
        </button>
      </div>
    </div>
  );
};

export default Offer;
