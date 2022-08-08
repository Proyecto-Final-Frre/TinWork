import { useEffect, useState } from "react";
import { findAll } from "../../services/OfferService";
import Offer from "../Offer";
import "./style.css";

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
        />
      ))}
    </div>
  );
};

export default OfferList;
