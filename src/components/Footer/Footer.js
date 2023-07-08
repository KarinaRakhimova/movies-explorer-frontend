function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright ">© {`${new Date().getFullYear()}`}</p>
        <nav className="footer__nav">
          <a
            href="https://practicum.yandex.ru/"
            className="footer__link link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/"
            className="footer__link link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
