import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./ClothesSection.css";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__title">Your Items</p>
        <button className="clothes__add-btn">+ Add new</button>
      </div>
      <ul className="clothes-section__list">
        {defaultClothingItems.map((filteredCard) => (
          <ItemCard
            key={filteredCard._id}
            item={filteredCard}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
