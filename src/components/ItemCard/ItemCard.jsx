import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onlikeClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const { currentUser } = useContext(CurrentUserContext);

  const isLiked =
    item.likes && currentUser && item.likes.includes(currentUser._id);

  const handleLike = () => {
    onlikeClick({ id: item._id, isLiked: isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <button
        className={`card__like-btn ${isLiked ? "card__like-btn_active" : ""}`}
        onClick={handleLike}
      />
      <img
        onClick={() => {
          handleCardClick();
        }}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
