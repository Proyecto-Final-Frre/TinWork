import Offer from "../Offer";
import "./style.css";

const OfferList = () => {
  const list = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="offer-list-container">
      {list.map((index) => (
        <Offer key={index} />
      ))}
    </div>
  );
};

export default OfferList;
