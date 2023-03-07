import AbstractView from '../utils/view/abstract-view';

const createOptionTemplate = (optionBlock) => (
  `<div class="group-answer radio">
    <label for="question" class="radiolabel">${optionBlock.option}</label>
    <input type="radio" class="radiobutton" id=${optionBlock.id} name="radiobutton">
  </div>`
);

const createFormTemplate = (question, currentQuestion, amount) => {
  const {optionsBlock} = question;
  return (
    `<div class="cta-header-container">
      <form class="radio-group">
        ${optionsBlock.map((option) => createOptionTemplate(option))}
      </form>
      <button class="button-next">${currentQuestion === amount - 1 ? 'Рассчитать' : 'Дальше'}</button>
  </div>`
  );
};

export default class FormView extends AbstractView {
  #questions = null;
  #currentQuestion = null;

  constructor(questions, currentQuestion) {
    super();
    this.#questions = questions;
    this.#currentQuestion = currentQuestion;
  }

  get template() {
    return createFormTemplate(this.#questions[this.#currentQuestion], this.#currentQuestion, this.#questions.length);
  }

  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.querySelector('.button-next').addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = (evt) => {
    const inputs = document.querySelectorAll('.radiobutton');
    evt.preventDefault();
    this._callback.buttonClick(inputs, evt);
  };
}
