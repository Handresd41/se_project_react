import "./ItemCard.css";

function ItemCard({ item, onCardClick, onLikeClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (item.isLiked) {
      onLikeClick(item._id, false);
    } else {
      onLikeClick(item._id, true);
    }
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <button
        className={`card__like-btn ${
          item.isLiked ? "card__like-btn_active" : ""
        }`}
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
