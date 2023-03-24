import AbstractView from '../utils/view/abstract-view';

const createPrimeViewTemplate = () => (
  `<section class="prime">
    <div class="container prime-container">
      <div class="prime-img">
        <img class="cat" src="img/context/cat-test.jpg" alt="cat">
      </div>
      <div class="prime-text-box">
        <div class="text">
          <h1 class="prime-heading">
            <span class="name">Имя</span>
            <span class="surname">Фамилия</span>
          </h1>
          <h2 class="prime-title">Профессия</h2>
          <p class="prime-text">
            Далеко-далеко, за словесными горами в стране гласных и согласных
            живут рыбные тексты. Грамматики океана переписали решила
            оксмокс, собрал, рыбного дал города последний, путь возвращайся
            своего не переписывается по всей снова буквоград подзаголовок
            предупредила.
          </p>
        </div>
      </div>
    </div>
  </section>`
);

export default class PrimeView extends AbstractView {
  get template() {
    return createPrimeViewTemplate();
  }
}
