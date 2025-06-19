import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const username = "Terrence Tegegne";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Header Icon" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <Link to="/profile" className="header__link">
        <div className="header__user-container">
          <p className="header__user-name">{username}</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
