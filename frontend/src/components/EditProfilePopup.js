import PopupWithForm from "./PopupWithForm";
import { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name="popup_edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        className="popup__input popup__input_type_name"
        type="text"
        id="user-field"
        minLength="2"
        name="user"
        maxLength="40"
        required
        onChange={handleChangeName}
      />
      <span className="popup__input-error user-field-error"></span>
      <input
        value={description || ""}
        className="popup__input popup__input_type_data"
        type="text"
        id="data-field"
        minLength="2"
        name="activity"
        maxLength="200"
        required
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error data-field-error"></span>
    </PopupWithForm>
  );
}
