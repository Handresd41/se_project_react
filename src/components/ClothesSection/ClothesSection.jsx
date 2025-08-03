import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, clothingItems }) {
  const { currentUser } = useContext(CurrentUserContext);

  const filterItems = clothingItems.filter((item) => {
    return item.owner && currentUser && item.owner._id === currentUser._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__title">Your Items</p>
        <button className="clothes__add-btn">+ Add new</button>
      </div>
      <ul className="clothes-section__list">
        {filterItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
