import { useEffect, useState } from "react";
import { findAll } from "../../services/OfferService";
import Offer from "../Offer";
import "./style.css";
/*abilitiesUser.forEach(ability => {if(abilitiesOffer.includes(ability)){count++; return true} return false})*/ 
//Para sacar la cantidad de aptitudes coincidentes
const OfferList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    offersFunc();
  }, []);

  const offersFunc = async () => {
    const result = await findAll();
    setOffers(result);
  };

  return (
    <div className="offer-list-container">
      {offers.map((offer) => (
        <Offer
          key={offer.title}
          title={offer.title}
          description={offer.description}
          province={offer.province}
          workDay={offer.workDay}
          country={offer.country}
          dateOffer={offer.dateOffer}
          interestedUsers={offer.interestedUsers}
          offerObj={offer}
        />
      ))}
    </div>
  );
};

export default OfferList;
