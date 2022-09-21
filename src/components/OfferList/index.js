import { useEffect, useState } from "react";
import { findAll, findOfferByUserUid } from "../../services/OfferService";
import Offer from "../Offer";
import "./style.css";
import { app, auth } from "../../config/firebase"
import { getUserAuthenticated } from "../../services/UserService";




const OfferList = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    offersFunc();
  }, []);

  const offersFunc = async () => {
    const userAuth = getUserAuthenticated()
    console.log("User auth", userAuth)
    const result = await findOfferByUserUid(userAuth.uid);
    setOffers(result)
  };




  return (

    <div className="offer-list-container">

      {

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
