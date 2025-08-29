import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteItemModal from "../DeleteItemModal/DeleteItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import { addItem, getItems } from "../../utils/api";
import { checkResponse } from "../../utils/api";
import { baseUrl } from "../../utils/api";
import { addCardLike, removeCardLike } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { login, checkToken } from "../../utils/auth";
import ProtectedRoute from "../../utils/ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleCurrentUserChange = (userData) => {
    setCurrentUser({
      name: userData.name || "",
      avatar: userData.avatar || "",
      email: userData.email || "",
      _id: userData._id || currentUser._id,
    });
    setIsLoggedIn(true);
    closeActiveModal();
  };

  const handleModalOpen = (modalType) => {
    setActiveModal(modalType);
    if (modalType === "edit-profile") {
      setSelectedCard(currentUser);
    } else {
      setSelectedCard({});
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setIsDeleteModalOpen(false);
  };

  const handleAddItemModalSubmit = async (e, { name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    e.preventDefault();

    try {
      const newItem = await addItem({ name, imageUrl, weather }, token);
      setClothingItems([...clothingItems, newItem]);
      closeActiveModal();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItemModal = (selectedCard) => {
    closeActiveModal();
    setIsDeleteModalOpen(true);
    setItemToDelete({
      _id: selectedCard._id,
      name: selectedCard.name,
      weather: selectedCard.weather,
      link: selectedCard.link,
    });
  };

  const handleDeleteSuccess = (deletedItemId) => {
    setClothingItems(
      clothingItems.filter((item) => item._id !== deletedItemId)
    );
  };

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await login({ email, password });
      localStorage.setItem("jwt", response.token);
      const token = await checkToken(response.token);
      const userData = token.data;
      setCurrentUser({
        name: userData.name || "",
        avatar: userData.avatar || "",
        email: userData.email || "",
        _id: userData._id || "",
      });
      setIsLoggedIn(true);
      closeActiveModal();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async (token) => {
    try {
      localStorage.setItem("jwt", token);
      const tokenData = await checkToken(token);
      const userData = tokenData.data || {};
      setCurrentUser({
        name: userData.name || "",
        avatar: userData.avatar || "",
        email: userData.email || "",
        _id: userData._id || "",
      });
      navigate("/profile");
      setIsLoggedIn(true);
      closeActiveModal();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((response) => {
        setClothingItems(Array.isArray(response) ? response : []);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setClothingItems([]);
      });
  }, []);

  useEffect(() => {
    if (!(activeModal || isDeleteModalOpen)) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal, isDeleteModalOpen]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((tokenData) => {
          const userData = tokenData.data || {};
          setCurrentUser({
            name: userData.name || "",
            avatar: userData.avatar || "",
            email: userData.email || "",
            _id: userData._id || "",
          });
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Token validation error:", error);
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ handleCurrentUserChange, currentUser }}
    >
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onLogin={() => setActiveModal("login")}
              onRegister={() => setActiveModal("register")}
              onClose={closeActiveModal}
              navigate={navigate}
              isLoggedIn={isLoggedIn}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              onRegister={() => setActiveModal("register")}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onLogin={() => setActiveModal("login")}
              onClose={closeActiveModal}
              onRegister={handleRegister}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onModalOpen={handleModalOpen}
                      onlikeClick={handleCardLike}
                      onSignOut={handleSignOut}
                      isLoggedIn={isLoggedIn}
                      onEditProfileClick={() => handleModalOpen("edit-profile")}
                      onAddItem={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              title="Edit Profile"
              onSubmit={handleCurrentUserChange}
            />

            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteItemModal}
          />
          <DeleteItemModal
            isOpen={isDeleteModalOpen}
            onClose={closeActiveModal}
            itemToDelete={itemToDelete}
            onDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
