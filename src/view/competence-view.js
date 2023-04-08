import AbstractView from '../utils/view/abstract-view';

const createCompitenceViewTemplate = () => (
  `<section class="container competencies">
    <div class="competencies-content">
      <h2 class="animate__animated wow animate__bounceInLeft">Our competencies</h2>
      <p class="animate__animated wow animate__bounceInLeft">There are various development platforms available for an array of solutions out there, and sometimes the options can be overwhelming. The technologies we use have been chosen based on what we have recognized as more powerful in terms of compatibility, scalability, performance, ease of use, and most importantly, cost effectiveness.</p>
    </div>
    <div class="competencies-media">
      <ul class="competencies-icons">
        <li class="competencies-icon animate__animated wow animate__fadeInTopLeft">
          <img src="./img/competencies/html5.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInDown">
          <img src="./img/competencies/css3.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__flip">
          <img src="./img/competencies/java.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInDown">
          <img src="./img/competencies/php.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInTopRight">
          <img src="./img/competencies/ps.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInLeft">
          <img src="./img/competencies/angular.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__lightSpeedInLeft">
          <img src="./img/competencies/sass.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__rotateInDownLeft">
          <img src="./img/competencies/react.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__lightSpeedInRight"">
          <img src="./img/competencies/bootstrap.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInRight">
          <img src="./img/competencies/docker.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInLeft">
          <img src="./img/competencies/js.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__lightSpeedInLeft">
          <img src="./img/competencies/sqlite.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__rotateInDownRight">
          <img src="./img/competencies/figma.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__lightSpeedInRight">
          <img src="./img/competencies/github.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInRight">
          <img src="./img/competencies/laravel.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInBottomLeft">
          <img src="./img/competencies/jquery.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInUp">
          <img src="./img/competencies/mysql.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__flip">
          <img src="./img/competencies/python.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInUp">
          <img src="./img/competencies/webpack.svg">
        </li>
        <li class="competencies-icon animate__animated wow animate__fadeInBottomRight">
          <img src="./img/competencies/postgresql.svg">
        </li>
      </ul>
    </div>
  </section>`
);

export default class CompetenceView extends AbstractView {
  get template() {
    return createCompitenceViewTemplate();
  }
}
