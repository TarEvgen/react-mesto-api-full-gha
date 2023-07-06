import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name='popup_updata-avatar'
      title='Обновить аватар'
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarInputRef}
        className='popup__input'
        type='url'
        id='avatar-field'
        name='avatar'
        placeholder='Ссылка на картинку'
        required
      />
      <span className='popup__input-error avatar-field-error'></span>
    </PopupWithForm>
  );
}
