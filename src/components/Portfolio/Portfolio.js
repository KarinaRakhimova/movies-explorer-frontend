import linkIcon from "../../images/linkIcon.svg";
export default function Portfolio() {
  return (
    <div className="portfolio">
      <p className="portfolio__heading">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a
            href="https://github.com/KarinaRakhimova/how-to-learn"
            className="portfolio__link link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Статичный сайт
            <img className="portfolio__linkIcon" src={linkIcon} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/KarinaRakhimova/russian-travel"
            className="portfolio__link link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Адаптивный сайт
            <img className="portfolio__linkIcon" src={linkIcon} alt="стрелка" />
          </a>
        </li>
        <li className="portfolio__list-item">
          <a
            href="https://github.com/KarinaRakhimova/react-mesto-api-full-gha"
            className="portfolio__link link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Одностраничное приложение
            <img className="portfolio__linkIcon" src={linkIcon} alt="стрелка" />
          </a>
        </li>
      </ul>
    </div>
  );
}
