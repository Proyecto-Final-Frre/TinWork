import { useEffect, useState } from "react";
import { findOfferByUserUid } from "../../services/OfferService";
import Offer from "../Offer";
import "./style.css";
import { auth } from "../../config/firebase";

const OfferList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    offersFunc();
  }, [auth.currentUser]);

  const offersFunc = async () => {
    const userAuth = auth.currentUser;
    const result = await findOfferByUserUid(userAuth.uid);
    console.log(result);

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
