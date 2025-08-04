import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    onSubmit(formData);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Profile"
      onSubmit={handleSubmit}
    >
      <label>
        Name:
        <input
          type="text"
          name="name"
          defaultValue={currentUser && currentUser.name}
          required
        />
      </label>
      <label>
        Avatar:
        <input
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
