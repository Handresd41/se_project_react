import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onModalOpen,
  onLikeClick,
  onSignOut,
  isLoggedIn,
  onAddItem,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onModalOpen={onModalOpen}
          isLoggedIn={isLoggedIn}
          onSignOut={onSignOut}
        />
      </section>
      <section className="profile__clothing-item">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddItem={onAddItem}
          onLikeClick={onLikeClick}
        />
      </section>
    </div>
  );
}

export default Profile;
