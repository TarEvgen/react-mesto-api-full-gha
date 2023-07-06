function PopupWithForm({
  buttonText,
  children,
  onSubmit,
  title,
  onClose,
  name,
  isOpen,
}) {
  return (
    <div className={`popup ${name}  ${isOpen ? 'popup_opened' : ''}   `}>
      <div className='popup__content'>
        <button
          className='popup__close'
          type='button'
          onClick={onClose}
        ></button>
        <h2 className='popup__title'>{title}</h2>
        <form onSubmit={onSubmit} className='popup__form popup__form_add-cards'>
          {children}
          <button className='popup__save popup__save_create' type='submit'>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
