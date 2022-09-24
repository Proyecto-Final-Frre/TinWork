import { useEffect, useState } from "react";
import Offer from "../Offer";
import "./style.css";
import { auth } from "../../config/firebase";
import { findOfferByUserUid } from "../../services/OfferService";

const OfferList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const unsubscribe = findOfferByUserUid(user.uid, setOffers);
      return () => {
        unsubscribe();
      };
    }
  }, []);

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
