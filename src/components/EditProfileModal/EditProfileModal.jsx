import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { updateProfile } from "../../utils/api";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const avatar = event.target.avatar.value;
    try {
      await updateProfile({ name, avatar }, localStorage.getItem("jwt"));
      onSubmit({ name, avatar });
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Change profile data"
      onSubmit={handleSubmit}
      buttonText="Save changes"
    >
      <label htmlFor="edit-name" className="modal__label">
        Name*
        <input
          id="edit-name"
          className="modal__input"
          type="text"
          name="name"
          defaultValue={currentUser && currentUser.name}
          required
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar*
        <input
          id="edit-avatar"
          className="modal__input"
          type="url"
          name="avatar"
          defaultValue={currentUser && currentUser.avatar}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
