import './InfoPopup.css';
import reqSuccess from '../../images/reqSuccess.svg';
import reqFail from '../../images/reqFail.svg';
function InfoPopup({ isOpen, onClose, reqStatus, message }) {
  return (
    <div
      className={`popup popup_type_reqResult ${isOpen ? "popup_opened" : ""}`}
    >
      <figure className="popup__reqResult-container">
        <img
          className="popup__reqResult-image"
          src={reqStatus ? reqSuccess : reqFail}
          alt={""}
        />
        <figcaption className="popup__reqResult-caption">{message || ""}</figcaption>
        <button
          className="popup__close"
          aria-label="закрыть"
          type="button"
          onClick={onClose}
        />
      </figure>
    </div>
  );
}

export default InfoPopup;