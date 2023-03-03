import AbstractView from '../utils/view/abstract-view';

const createFormTemplate = () => (
  `<div class="cta-header-container">
    <form class="radio-group">
      <div class="group-answer radio">
        <label for="question1" class="radiolabel">Лендинг</label>
        <input type="radio" class="radiobutton">
      </div>
      <div class="group-answer radio">
        <label for="question2" class="radiolabel">Портфолио</label>
        <input type="radio" class="radiobutton">
      </div>
      <div class="group-answer radio">
        <label for="question2" class="radiolabel">Социальная сеть</label>
        <input type="radio" class="radiobutton">
      </div>
      <div class="group-answer radio">
        <label for="question2" class="radiolabel">Блог</label>
        <input type="radio" class="radiobutton">
      </div>
      <div class="group-answer radio">
        <label for="question2" class="radiolabel">Интернет-магазин</label>
        <input type="radio" class="radiobutton">
      </div>
    </form>
</div>`
);

export default class FormView extends AbstractView {
  get template() {
    return createFormTemplate();
  }
}
