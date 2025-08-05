import avatar from "../../assets/avatar.svg";
import "./SideBar.css";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onModalOpen, onSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [editProfile, setEditProfile] = useState(false);

  const onEditProfileClick = () => {
    setEditProfile(true);
    onModalOpen("editProfile");
  };

  const closeEditProfile = () => {
    setEditProfile(false);
  };

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser && currentUser.avatar ? currentUser.avatar : avatar}
        alt={currentUser && currentUser.name ? currentUser.name : "User Avatar"}
      />
      <p className="sidebar__username">
        {currentUser && currentUser.name ? currentUser.name : "User Name"}
      </p>
      <div className="sidebar__buttons">
        <button
          className="sidebar__EditProfileBtn"
          onClick={onEditProfileClick}
        >
          Change profile data
        </button>
        <button className="sidebar__logout-btn" onClick={onSignOut}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
