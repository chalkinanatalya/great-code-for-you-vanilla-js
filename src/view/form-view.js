import AbstractView from '../utils/view/abstract-view';

const createOptionTemplate = (option, type) => (
  `<div class="group-answer radio">
    <label for=${option.id} class="radiolabel">${option.option}</label>
    <input type="${type}" class="radiobutton" id=${option.id} name="radiobutton" value="${option.price}">
  </div>`
);

const createFormTemplate = (question, currentQuestion, amount) => {
  const {options, type} = question;
  return (
    `<div class="cta-header-container">
      <form class="radio-group">
        ${options.map((option) => createOptionTemplate(option, type)).join('')}
      </form>
      <button class="button-next navigation">${currentQuestion === amount - 1 ? 'Рассчитать' : 'Дальше'}</button>
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
