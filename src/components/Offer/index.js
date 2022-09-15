import { React, useState } from "react";
import "./style.css";
import { AiOutlineFileSearch } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { BiBriefcase } from "react-icons/bi";
import { BsCalendarDate, BsPeople } from "react-icons/bs";
import { intlFormatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";

const Offer = ({
  title,
  offerObj,
  description,
  province,
  workDay,
  country,
  dateOffer,
  interestedUsers,
}) => {
  const [isReadMoreShown, setReadMoreShown] = useState(false);
  const toggleBtn = () => {
    setReadMoreShown((prevState) => !prevState);
  };

  //Obtener hace cuanto se publico la oferta, resta fecha de creación - fecha actual
  const dataOffer = intlFormatDistance(
    dateOffer.toDate(),
    new Date(),

    { locale: "es" }
  );
  const navigate = useNavigate();

  const obtnInteresed = () => {
    navigate("/candidates", { state: offerObj });
  };

  return (
    <div className="card-offer">
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
          <BsCalendarDate /> {dataOffer}
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
        <button type="button" class="btn btn-link" onClick={obtnInteresed}>
          <span>{interestedUsers?.length}</span> interesados
        </button>
      </div>
    </div>
  );
};

export default Offer;
