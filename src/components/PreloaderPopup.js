import '../components/InfoPopup/InfoPopup.css';
import Preloader from './Preloader/Preloader';

function PreloaderPopup({ isLoading }) {
  return (
    <div
      className={`popup ${isLoading ? "popup_opened" : ""}`}
    >
      <Preloader/>
    </div>
  );
}

export default PreloaderPopup;