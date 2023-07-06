function ImagePopup({ onClose, card }) {
  return (
    <div className={`popup popup_open-img  ${card.link ? 'popup_opened' : ''}`}>
      <div className='popup__data'>
        <img className='popup__img' src={card.link} alt={card.name} />
        <h2 className='popup__description'>{card.name}</h2>
        <button
          className='popup__close'
          type='button'
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
