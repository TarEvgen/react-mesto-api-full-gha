import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card({ cardData, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = cardData.owner._id === currentUser._id;
  const isLiked = cardData.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(cardData);
  }

  function handleLikeClick() {
    onCardLike(cardData);
  }

  function handleDeleteClick() {
    onCardDelete(cardData);
  }

  return (
    <li className="element">
      <img
        className="element__img"
        src={cardData.link}
        alt={cardData.name}
        onClick={handleClick}
      />
      <button
        className={`element__delete ${isOwn && "element__delete_active"}`}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <h2 className="element__title">{cardData.name}</h2>
      <div className="element__like">
        <button
          className={`element__like-button ${
            isLiked && "element__button_active"
          }`}
          onClick={handleLikeClick}
          type="button"
        ></button>
        <p className="element__like-counter">{cardData.likes.length}</p>
      </div>
    </li>
  );
}
