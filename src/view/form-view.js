import AbstractView from '../utils/view/abstract-view';

const createOptionTemplate = (optionBlock) => (
  `<div class="group-answer radio">
    <label for="question" class="radiolabel">${optionBlock.option}</label>
    <input type="radio" class="radiobutton" id=${optionBlock.id}>
  </div>`
);

const createFormTemplate = (questions) => {
  const {optionsBlock} = questions;
  return (
    `<div class="cta-header-container">
      <form class="radio-group">
        ${optionsBlock.map((option) => createOptionTemplate(option))}
      </form>
      <button class="button-next">Next</button>
  </div>`
  );
};

export default class FormView extends AbstractView {
  #optionsBlock = null;

  constructor(optionsBlock) {
    super();
    this.#optionsBlock = optionsBlock;
  }

  get template() {
    return createFormTemplate(this.#optionsBlock);
  }

  setButtonClickHandler = (callback) => {
    const form = document.querySelector('form');
    const data = new FormData(form);
    this._callback.buttonClick = callback;
    this.element.querySelector('.button-next').addEventListener('click', () => {
      this.#buttonClickHandler(data);
    });
  };

  setOptionClickHandler = (callback) => {
    this._callback.optionClick = callback;
    this.element.querySelector('.question').addEventListener('click', this.#optionClickHandler);

  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.buttonClick();
  };

  #optionClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.optionClick();
  };

}
