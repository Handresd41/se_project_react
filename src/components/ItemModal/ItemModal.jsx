import "./ItemModal.css";
function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_image"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button onClick={() => onDeleteClick(card)} className="modal__delete">
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
