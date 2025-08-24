import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({
  onCardClick,
  clothingItems,
  onLikeClick,
  isLoggedIn,
  onAddItem,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const filterItems = clothingItems.filter((item) => {
    return item.owner && currentUser && item.owner === currentUser._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes__header">
        <p className="clothes__title">Your Items</p>
        <button className="clothes__add-btn" onClick={onAddItem}>
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {filterItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onLikeClick={onLikeClick}
            isLiked={item.isLiked}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
