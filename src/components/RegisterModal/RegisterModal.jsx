import { register } from "../../utils/auth";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useState } from "react";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegister,
  onLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrl = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, name, avatar });

    register({ name, avatar, email, password })
      .then((res) => {
        if (res.data) {
          onRegister(res.data);
          onClose();
        }
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  return (
    <ModalWithForm
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Next"
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar Url"
          onChange={handleImageUrl}
          value={avatar}
        />
      </label>
      <button
        type="button"
        className="modal__button"
        disabled={!email || !password}
        onClick={() => {
          onLogin();
        }}
      >
        or log in
      </button>
    </ModalWithForm>
  );
}
