function AboutProject() {
  return (
    <section className="section about">
      <h2 className="section__title">О проекте</h2>
      <div className="about__description">
        <p className="about__description-heading about__description-heading_stages">
          Дипломный проект включал 5 этапов
        </p>
        <p className="about__description-heading about__description-heading_weeks">
          На выполнение диплома ушло 5 недель
        </p>
        <p className="about__description-text about__description-text_stages">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="about__description-text about__description-text_weeks">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="about__timing">
        <p className="about__timingItem about__timingItem_heading_back">1 неделя</p>
        <p className="about__timingItem about__timingItem_heading_front">4 недели</p>
        <p className="about__timingItem">Back-end</p>
        <p className="about__timingItem">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
