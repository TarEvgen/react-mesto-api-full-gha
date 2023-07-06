import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from '../components/InfoTooltip';
import { useState, useEffect } from 'react';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from '../components/EditProfilePopup';
import { EditAvatarPopup } from '../components/EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import * as mestoAuth from '../utils/mestoAuth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCard] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    mestoAuth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/');
      })
      .catch(() => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  };

  const handelRegister = (email, password) => {
    return mestoAuth
      .register(email, password)
      .then((res) => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
        navigate('/sign-in');
      })
      .catch(() => {
        setIsInfoTooltipOpen(true);
        setIsSuccess(false);
      });
  };

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  function handleAddPlaceSubmit(title, link) {
    api
      .addCard(title, link)
      .then((newCard) => {
        setCard([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  function handleUpdateAvatar(dataAvatar) {
    api
      .updateAvatar(dataAvatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  function handleUpdateUser(dataUser) {
    api
      .editProfile(dataUser)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getAllCards(), api.loadDataUser()])
        .then(([dataCards, dataUser]) => {
          setCard(dataCards);
          setCurrentUser(dataUser);
        })
        .catch((err) => alert(err));
    }
  }, [isLoggedIn]);

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCard((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => alert(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCard((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => alert(err));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleResultAuthClick() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mestoAuth
        .getCheckToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            navigate('/');
          } else {
            setLoggedIn(false);
          }
        })
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='body'>
        <div className='page'>
          <Header userEmail={userEmail} onClick={signOut} />
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path='/sign-up'
              element={
                <Register
                  handelRegister={handelRegister}
                  isOpen={isInfoTooltipOpen}
                  oncl={handleResultAuthClick}
                />
              }
            />
            <Route
              path='/sign-in'
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path='*'
              element={
                <Link to='/sign-in' className='form__login-link'>
                  Страница не найдена, перейти на главную.
                </Link>
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            onClose={closeAllPopups}
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            onClose={closeAllPopups}
            name='popup_delete-cards'
            title='Вы уверены?'
            buttonText='Да'
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isInfoTooltipOpen}
            isSuccess={isSuccess}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
