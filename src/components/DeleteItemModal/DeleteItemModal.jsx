import "./DeleteItemModal.css";
import { deleteItem } from "../../utils/api";

function DeleteItemModal({ onClose, isOpen, itemToDelete, onDeleteSuccess }) {
  const handleDelete = () => {
    const token = localStorage.getItem("jwt");
    deleteItem(itemToDelete._id, token)
      .then(() => {
        onDeleteSuccess(itemToDelete._id);
        onClose();
      })
      .catch((error) => {
        console.error("Delete failed:", error);
      });
  };

  return (
    <div className={`modal ${isOpen === true && "modal_opened"}`}>
      <div className="modal__popup">
        <p className="modal__popup_title">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <button onClick={handleDelete} className="modal__delete-btn">
          Yes, delete item
        </button>
        <br />
        <button className="modal__cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteItemModal;
