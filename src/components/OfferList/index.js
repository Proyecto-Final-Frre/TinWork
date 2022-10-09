import { useEffect, useState } from "react";
import Offer from "../Offer";
import "./style.css";
import { findOfferByUserUid } from "../../services/OfferService";
import { useAuth } from "../../context/AuthContext";

const OfferList = () => {
  const { user } = useAuth();

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const unsubscribe = findOfferByUserUid(user ? user.uid : null, setOffers);
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="offer-list-container">
      {offers.length > 0 &&
        offers.map((offer) => (
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
