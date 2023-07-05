import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

export function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  function handleChangeTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(title, link);
  }

  useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name="popup_add-cards"
      title="Новое место"
      buttonText="Создать"
    >
      <input
        onChange={handleChangeTitle}
        className="popup__input popup__input_type_title"
        type="text"
        id="title-field"
        name="title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={title}
      />
      <span className="popup__input-error title-field-error"></span>
      <input
        onChange={handleChangeLink}
        className="popup__input popup__input_type_link"
        type="url"
        id="link-field"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
      />
      <span className="popup__input-error link-field-error"></span>
    </PopupWithForm>
  );
}
