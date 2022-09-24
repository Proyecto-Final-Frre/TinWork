import { useEffect, useState } from "react";
import Offer from "../Offer";
import "./style.css";
import { findOfferByUserUid } from "../../services/OfferService";
import { useUserContext } from "../../contexts/UserContext";

const OfferList = () => {
  const { userAuth } = useUserContext();

  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const unsubscribe = findOfferByUserUid(
      userAuth ? userAuth.uid : null,
      setOffers
    );
    return () => {
      unsubscribe();
    };
  }, [userAuth]);

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
