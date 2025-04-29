import { React, useState } from "react";
import { Image } from "react-bootstrap";

import "./style.css";
import { GrLocation } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { intlFormatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";

const Offer = ({
  title,
  offerObj,
  description,
  province,
  workDay,
  workModality,
  country,
  dateOffer,
  interestedUsers,
  companyName,
  companyLogo
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
      <div className="company-header">
        <Image
          src={companyLogo || "/placeholder.svg"}
          alt={companyName ? `${companyName} logo` : "Company logo"}
          width={50}
          height={50}
          className="logo-image"
        />
      <h4 className="company-name">{companyName}</h4>
      </div>
      <div className="offer-header">
        <h5 className="offer-name" >{title}</h5>
      </div>
      <div className="card-location">
        <h6 >       
          <GrLocation style={{ marginRight: '2px' }}  color={"red"} size={17} />
          {country}, {province}
        </h6>
        <h6 className="work">          
          💼 {workDay}          
        </h6>         
        <h6 >          
        📅 {dataOffer}
        </h6>
        <h6 className="work">          
        💼 Modalidad, {workModality}    
        </h6>   
      </div>
      <p className={`offer-description ${isReadMoreShown ? "expanded" : ""}`}>
        {isReadMoreShown ? description : description.substr(0, 270)}
      </p>

      {description?.length > 269 && (
        <button className="btn btn-ver" onClick={toggleBtn}>
          {isReadMoreShown ? "Ver menos" : "Ver más"}{" "}
        </button>
      )}

      <div className="footer">
        <BsPeople className="people" type="button" />
        <button type="button" className="btn btn-link" onClick={obtnInteresed}>
          <span>{interestedUsers?.length}</span> interesados
        </button>
      </div>
    </div>
  );
};

export default Offer;
