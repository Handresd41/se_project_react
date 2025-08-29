import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useModalClose from "../../utils/useModalClose/useModalClose";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = currentUser && card.owner && currentUser._id === card.owner;

  useModalClose(activeModal === "preview", onClose);

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isOwn && (
            <button
              onClick={() => onDeleteClick(card)}
              className="modal__delete"
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
