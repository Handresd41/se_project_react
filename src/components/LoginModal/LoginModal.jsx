import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { useState } from "react";
import { login } from "../../utils/auth";

export default function LoginModal({ onClose, isOpen, onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    login({ email, password }).then((res) => {
      if (res.token) {
        onLogin({ email, password, token: res.token });
        onClose();
      }
    });
  };

  return (
    <ModalWithForm
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Log In"
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <button
        type="button"
        className="modal__login-button"
        disabled={!email || !password}
        onClick={() => {
          onRegister();
        }}
      >
        or sign up
      </button>
    </ModalWithForm>
  );
}
