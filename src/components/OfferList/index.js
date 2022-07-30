import Offer from "../Offer";
import "./style.css";

const OfferList = () => {
  const list = [1];

  return list.map(() => <Offer />);
};

export default OfferList;
