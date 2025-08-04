import avatar from "../../assets/avatar.svg";
import "./SideBar.css";
import { useContext, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ isOpen, onClose, onModalOpen }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [editProfile, setEditProfile] = useState(false);

  const onEditProfileClick = () => {
    setEditProfile(true);
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
          onClick={() => onModalOpen("edit-profile")}
        >
          Change profile data
        </button>
        <button className="sidebar__logout-btn" onClick={closeEditProfile}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
