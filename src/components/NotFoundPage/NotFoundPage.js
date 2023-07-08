import { useNavigate } from "react-router-dom";
export default function NotFoundPage() {
  const navigate = useNavigate();

  function goBack() {
      navigate(-1);
  }

  return (
    <div className="notFoundPage">
      <p className="notFoundPage__code">404</p>
      <p className="notFoundPage__text">Страница не найдена</p>
      <button className="notFoundPage__link link" onClick={goBack}>
        Назад
      </button>
    </div>
  );
}
