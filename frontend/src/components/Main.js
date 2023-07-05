import React from "react";
import { Card } from "../components/Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__button-edit" onClick={props.onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="фото профиля"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__login">{currentUser.name}</h1>
          <p className="profile__activity">{currentUser.about}</p>
          <button
            className="profile__edit"
            onClick={props.onEditProfile}
            type="button"
          ></button>
        </div>
        <button
          className="profile__add"
          onClick={props.onAddPlace}
          type="button"
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              cardData={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
