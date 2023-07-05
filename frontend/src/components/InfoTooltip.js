import iconSuccess from "../images/icon-success.svg";
import iconFail from "../images/icon-fail.svg";

function InfoTooltip({ onClose, isOpen, isSuccess }) {
  return (
    <div className={`popup  ${isOpen ? "popup_opened" : ""}   `}>
      <div className="popup__content popup__result-auth">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon-result"
          src={isSuccess ? iconSuccess : iconFail}
          alt="icon-result"
        ></img>
        <h2 className="popup__title popup__title_auth">
          {isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
