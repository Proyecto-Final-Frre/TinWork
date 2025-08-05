import { React, useState } from "react";
import { Image } from "react-bootstrap";

import "./style.css";
import { GrLocation } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { intlFormatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton, Button } from "@mui/material"
import { BiSolidEdit ,BiPowerOff ,BiSolidAlarmOff ,BiRepost   } from "react-icons/bi";
import { MdExpandLess, MdOutlineWorkOff } from "react-icons/md";
import Swal from "sweetalert2";
import clockTime from "../../logos/clock-time.gif"
import { updateOffer } from "../../services/OfferService";
import { FaToggleOff } from "react-icons/fa";

const Offer = ({
  offerId,
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
  expirationDate,
  requiredAbilities,
  desiredAbilities,
  disabled
}) => {
  console.log("🚀 ~ Offer ~ offerObj:", offerObj)
  const [isReadMoreShown, setReadMoreShown] = useState(false);
  const [showAllAbilities, setShowAllAbilities] = useState(false)

  const toggleBtn = () => {
    setReadMoreShown((prevState) => !prevState);
  };

  const toggleAbilities = () => {
    setShowAllAbilities((prevState) => !prevState)
  }



  const dataOffer = intlFormatDistance(
    dateOffer.toDate(),
    new Date(),

    { locale: "es" }
  );
  const navigate = useNavigate();

  const obtnInteresed = () => {
    navigate("/candidates", { state: offerObj });
  };
  // const onDeactivate = () => {
  //   const confirmed = window.confirm("¿Estás seguro de desactivar esta oferta?");
  //   if (confirmed) {
  //     console.log("Oferta desactivada:", offerId);
  //     // Aquí podés llamar a tu lógica para actualizar el estado de la oferta en Firebase o backend
  //   }
  // };

    const onDeactivate = async (offerObj) => {
    const result = await Swal.fire({
        title: "Confirmar desactivación",
  html: `
    <p style="font-size: 18px;">
      ¿Estás seguro que querés desactivar la oferta 
      <strong style="color:#2E81FB; font-size: 18px;">${offerObj.title}</strong> en 
      <strong style="color:#2E81FB; font-size: 18px;">${offerObj.companyName}</strong>?
    </p>
  `,
      icon: "warning",
      showCancelButton: true,
      background: "#e3f2fd", 
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar"
    });
  
    if (!result.isConfirmed) return;
  
    Swal.fire({
      title: "Desactivando oferta...",
       html: `
    <p style="font-size: 18px;">
   
      <strong style="color:#2E81FB; font-size: 18px;">Por favor espere...</strong> 
    
    </p>
  `,
      imageUrl: clockTime,
      imageWidth: 150,
      imageHeight: 150,
      background: "#e3f2fd", 
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      timer: 15000,
    });
  
    try {
     
  
        // Fecha de ayer (un día antes de hoy)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    console.log("🚀 ~ onDeactivate ~     yesterday.setDate(yesterday.getDate() - 1);:",     yesterday.setDate(yesterday.getDate() - 1))
    console.log(`🚀 ~ onDeactivate ~  yesterday.toISOString().split("T")[0]:`,  yesterday.toISOString().split("T")[0])
    // yesterday.setHours(0, 0, 0, 0); // Normaliza la hora a medianoche
  
    await updateOffer({
      id: offerObj.id, // Asegurate de tener el id correcto
      expirationDate: yesterday.toISOString().split("T")[0], // O el formato que uses en tu BD
    });

    Swal.fire({
      title: "Oferta desactivada",
      html: `
        <p style="font-size: 17px; margin-top: 10px;">
          La oferta <strong style="color:#1e88e5; font-weight: 600;">${offerObj.title}</strong> en 
          <strong style="color:#1e88e5; font-weight: 600;">${offerObj.companyName}</strong> se desactivó correctamente.
        </p>
      `,
      icon: "success",
      confirmButtonText: "Aceptar",
      background: "#e3f2fd",
      confirmButtonColor: "#1976d2"
    });
      // setRefresh(!refresh);
      
    } catch (error) {
      console.error("Error al descartar candidato:", error);
    }
  };
  const onEdit = () => {
    navigate(`/edit-offer/${offerId}`,{ state: offerObj })

  }

   const onActivate = () => {
    navigate(`/activate-offer/${offerId}`,{ state: offerObj })

  }


  // Función para calcular días restantes y obtener el mensaje de vencimiento
  const getExpirationInfo = () => {
    if (!expirationDate) return null

    const todayStr = new Date().toISOString().split('T')[0]
    const expStr = new Date(expirationDate).toISOString().split('T')[0]

    const today = new Date(todayStr)
    const expDate = new Date(expStr)

    const diffTime = expDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 0) {
      return { message: "Vence hoy", icon: "⏰" }
    } else if (diffDays === 1) {
      return { message: "Vence mañana", icon: "⏰" }
    } else if (diffDays <= 3) {
      return { message: `Vence en ${diffDays} días`, icon: "⏰" }
    } else if (diffDays <= 7) {
      return { message: `Vence en ${diffDays} días`, icon: "📅" }
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
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {!disabled ?
          <>
            <Tooltip title="Editar oferta" placement="top" arrow>
          <IconButton
            size="small"
            onClick={onEdit}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(8px)",
              border: "1px solid #e0e0e0",
              width: 42,
              height: 42,
              "&:hover": {
                backgroundColor: "#e3f2fd",
                borderColor: "#1976d2",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease-in-out",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <BiSolidEdit size={25} color="#1976d2" />

          </IconButton>
        </Tooltip>
        <Tooltip title="Desactivar oferta" placement="top" arrow>
          <IconButton
            size="small"
            onClick={()=> onDeactivate(offerObj) }
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(8px)",
              border: "1px solid #e0e0e0",
              width: 42,
              height: 42,
              "&:hover": {
                backgroundColor: "#e3f2fd",
                borderColor: "#1976d2",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease-in-out",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {/* <MdOutlineWorkOff size={20} color="#1976d2" /> */}
            <BiPowerOff size={25} color="#1976d2" />

          </IconButton>
        </Tooltip>

          </>
        : 
        
          <Tooltip title="Activar oferta" placement="top" arrow>
          <IconButton
            size="small"
            onClick={()=> onActivate(offerObj) }
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(8px)",
              border: "1px solid #e0e0e0",
              width: 42,
              height: 42,
              "&:hover": {
                backgroundColor: "#e3f2fd",
                borderColor: "#1976d2",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease-in-out",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <BiRepost size={25} color="#1976d2" />

          </IconButton>
        </Tooltip>
        


          }
          
        </div>
     
      </div>
      <div className="offer-header">
        <h5 className="offer-name" >{title} </h5>
       
     {!disabled  && 
        <div className="expiration-info">

          <span>{expirationInfo?.icon}</span>
          <span>{expirationInfo?.message}</span>

        </div>

     }  
      </div>
      <div className="card-location">
        <h6 >
          <GrLocation style={{ marginRight: '2px' }} color={"red"} size={17} />
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

      {requiredAbilities && requiredAbilities.length > 0 && (
        <div className="required-abilities">
          <h6 className="font-semibold text-gray-800 text-sm">Habilidades Requeridas</h6>

          <div className="abilities-container">
            {showAllAbilities ? requiredAbilities.map((ability, index) => (
              <span key={index} className="ability-tag">
                {ability}
              </span>

            )) :

              requiredAbilities.slice(0, 3).map((ability, index) => (
                <span key={index} className="ability-tag">
                  {ability}
                </span>
              ))
            }

            {showAllAbilities && <button className="ability-tag remaining-count" title="Ver menos habilidades" onClick={toggleAbilities}> <MdExpandLess size={16} /></button>}

            {!showAllAbilities && requiredAbilities.length > 3 && (
              <button className="ability-tag remaining-count" title="Ver mas habilidades" onClick={toggleAbilities}> +{requiredAbilities.length - 3}</button>

            )}

          </div>
        </div>
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
