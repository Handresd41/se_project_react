import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import Profile from "../Profile/Profile";

function Header({ handleAddClick, weatherData, onLogin, onRegister, onClose }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Header Icon" />
      </Link>
      <Profile />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {!currentUser && (
        <div className="header__user-actions">
          <div className="header__buttons">
            <button className="header__register-btn" onClick={onRegister}>
              Sign Up
            </button>
            <button className="header__login-btn" onClick={onLogin}>
              Log In
            </button>
          </div>
        </div>
      )}
      {currentUser && (
        <div className="header__user-info">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <div className="header__user-container">
            <p className="header__user-name">{currentUser.name || "Guest"}</p>
            <div className="header__avatar-container">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name || "User Avatar"}
                  className="header__avatar"
                />
              ) : (
                <p className="header__avatar-placeholder">
                  {currentUser.name ? currentUser.name[0].toUpperCase() : "U"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
