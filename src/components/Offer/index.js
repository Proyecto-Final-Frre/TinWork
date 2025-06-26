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
  companyLogo,
  expirationDate
}) => {
  console.log("🚀 ~ expirationDate:", expirationDate)
  const [isReadMoreShown, setReadMoreShown] = useState(false);
  const toggleBtn = () => {
    setReadMoreShown((prevState) => !prevState);
  };

  const dataOffer = intlFormatDistance(
    dateOffer.toDate(),
    new Date(),

    { locale: "es" }
  );
  const navigate = useNavigate();

  const obtnInteresed = () => {
    navigate("/candidates", { state: offerObj });
  };
    // Función para calcular días restantes y obtener el mensaje de vencimiento
  const getExpirationInfo = () => {
  if (!expirationDate) return null

  const todayStr = new Date().toISOString().split('T')[0]
  const expStr = new Date(expirationDate).toISOString().split('T')[0]

  const today = new Date(todayStr)
  const expDate = new Date(expStr)

  const diffTime = expDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  console.log("🚀 ~ getExpirationInfo ~ diffDays:", diffDays)

  if (diffDays <= 0) {
    return { message: "Vence hoy", icon: "⏰" }
  } else if (diffDays === 1) {
    return { message: "Vence mañana", icon: "⏰" }
  } else if (diffDays <= 3) {
    return { message: `Vence en ${diffDays} días`,  icon: "⏰" }
  } else if (diffDays <= 7) {
    return { message: `Vence en ${diffDays} días`,  icon: "📅" }
  } else {
    return { message: `Vence en ${diffDays} días`, icon: "📅" }
  }
}
    const expirationInfo = getExpirationInfo()


  return (
    <div className="card-offer">
      <div className="company-header">
       <div className="company-info">
    <Image
      src={companyLogo || "/placeholder.svg"}
      alt={companyName ? `${companyName} logo` : "Company logo"}
      width={50}
      height={50}
      className="logo-image"
    />
    <h4 className="company-name">{companyName}</h4>
  </div>
            <div className="expiration-info">
    <span>{expirationInfo?.icon}</span>
    <span>{expirationInfo?.message}</span>
  </div>
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

      {description?.length > 233 && (
        <button className="btn btn-ver" onClick={toggleBtn}>
          {isReadMoreShown ? "Ver menos" : "Ver más"}{" "}
        </button>
      )}

        <div className="footer">
          <button type="button" className="btn-link" onClick={obtnInteresed}>
            <BsPeople className="people" />
            <span>{interestedUsers?.length} interesados</span>
          </button>
        </div>
    </div>
  );
};

export default Offer;
