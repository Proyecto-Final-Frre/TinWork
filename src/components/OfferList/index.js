import Offer from "../Offer";
import "./style.css";

const OfferList = () => {
  const list = [1, 2, 3, 4, 5];

  return list.map(() => <Offer />);
};

export default OfferList;
