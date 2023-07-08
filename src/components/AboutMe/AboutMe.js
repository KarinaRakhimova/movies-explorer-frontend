import studentPhoto from "../../images/studentPhoto.jpg";
import Portfolio from "../Portfolio/Portfolio";
export default function AboutMe() {
  return (
    <section className="aboutMe section" id="aboutMe">
      <h2 className="section__title">Студент</h2>
      <figure className="aboutMe__container">
        <img className="aboutMe__photo" src={studentPhoto} alt="фото студента" />
        <figcaption>
          <p className="aboutMe__name">Карина</p>
          <p className="aboutMe__description">Фронтенд-разработчик, 30 лет</p>
          <p className="aboutMe__info">
            Я&nbsp;родилась и&nbsp;живу в&nbsp;Челябинске, закончила факультет
            экономики и&nbsp;управления ЮУрГУ.Я люблю слушать музыку, а&nbsp;ещё
            увлекаюсь плаванием. Недавно начала кодить. С&nbsp;2013 года
            работала в&nbsp;компании &laquo;Coral Travel&raquo;. После того, как
            пройду курс по&nbsp;веб-разработке, планирую заниматься
            фриланс-заказами и&nbsp;уйти с&nbsp;постоянной работы.
          </p>
          <a
            className="aboutMe__link link"
            href="https://github.com/KarinaRakhimova"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </figcaption>
      </figure>
      <Portfolio />
    </section>
  );
}
