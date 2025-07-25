import { React, useState } from "react";
import { Image } from "react-bootstrap";

import "./style.css";
import { GrLocation } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { intlFormatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Tooltip, IconButton, Button } from "@mui/material"
import { BiSolidEdit } from "react-icons/bi";
import { MdExpandLess, MdOutlineWorkOff } from "react-icons/md";
import Swal from "sweetalert2";

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
  desiredAbilities
}) => {
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
    console.log("🚀 ~ onDeactivate ~ offerObj:", offerObj)
    const result = await Swal.fire({
      title: `¿Estás seguro que querés desactivar la oferta ${offerObj.title} publicada por ${offerObj.companyName} ?`,
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
      title: "Descartando...",
      text: "Por favor, espere",
      // imageUrl: noLike, 
      imageWidth: 150,
      imageHeight: 150,
      background: "#e3f2fd", 
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
//     try {
//       const user = await findUserByUid(element.uid);
  
//       // Cambiar el estado del interesado a "no-match"
//       state.interestedUsers.forEach((interestedUser) => {
//         if (interestedUser.uid === element.uid) {
//           interestedUser.status = "no-match";
//         }
//       });
  
//       // Actualizar la oferta con el nuevo estado
//       await updateOffer({
//         id: state.id,
//         interestedUsers: state.interestedUsers,
//       });
  
//       // Remover la oferta del array offersMatch del usuario
//       const updatedOffersMatch = user.offersMatch.filter(
//         (offer) => offer.id !== state.id
//       );
  
//       await updateUser({
//         id: user.id,
//         offersMatch: updatedOffersMatch,
//       });
//       Swal.fire({
//         title: "Descartado",
//         text: `Se descartó correctamente a ${element.name} de la oferta.`,
//         icon: "success",
//         confirmButtonText: "Aceptar", 
//         background: "#e3f2fd",       
//         confirmButtonColor: "#1976d2" 
//       });
  
//       setRefresh(!refresh);
//       setRows(prevRows =>
//   prevRows.map(row =>
//     row.uid === element.uid ? { ...row, status: 'no-match' } : row
//   )
// );
//     } catch (error) {
//       console.error("Error al descartar candidato:", error);
//     }
  };
  const onEdit = () => {
    console.log("ir a editar", offerId)
    navigate(`/edit-offer/${offerId}`,{ state: offerObj })

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
    console.log("🚀 ~ getExpirationInfo ~ diffDays:", diffDays)

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
            <BiSolidEdit size={20} color="#1976d2" />

          </IconButton>
        </Tooltip>
        <Tooltip title="Desactivar oferta" placement="top" arrow>
          <IconButton
            size="small"
            onClick={onDeactivate(offerObj)}
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
            <MdOutlineWorkOff size={20} color="#1976d2" />

          </IconButton>
        </Tooltip>

        </div>
     
      </div>
      <div className="offer-header">
        <h5 className="offer-name" >{title} </h5>
        <div className="expiration-info">

          <span>{expirationInfo?.icon}</span>
          <span>{expirationInfo?.message}</span>

        </div>
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
