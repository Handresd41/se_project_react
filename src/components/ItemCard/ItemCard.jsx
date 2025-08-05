import "./ItemCard.css";

function ItemCard({ item, onCardClick, onlikeClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    if (item.isLiked) {
      onlikeClick(item._id, "remove");
    } else {
      onlikeClick(item._id, "add");
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
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
