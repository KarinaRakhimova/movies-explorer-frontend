import promoLogo from "../../images/landing-logo.svg";
function Promo() {
  return (
    <section className="promo">
      <img
        className="promo__logo"
        src={promoLogo}
        alt="глобус из надписей web"
      />
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <p className="promo__subtitle">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </p>
      <a href="#aboutMe" className="promo__link link">
        Узнать больше
      </a>
    </section>
  );
}

export default Promo;
