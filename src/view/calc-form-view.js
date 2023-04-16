import AbstractView from '../utils/view/abstract-view';

const createOptionTemplate = (option, type) => (
  `<div class="group-answer radio">
    <label for=${option.id} class="radiolabel">${option.option}</label>
    <input type="${type}" class="radiobutton data" id=${option.id} name="radiobutton" value="${option.price}" title="${option.option}">
  </div>`
);

const createDataQuestionTemplate = (price) => (
  `<h4>Thanks! Your approximate price is ${price}$</h4>
  <input type="text" class="feedback-input data" name="radiobutton" id="username" placeholder="First Name" pattern="[A-Za-z]+" required>
  <input type="email" class="feedback-input data" name="radiobutton" id="email" placeholder="Email" pattern="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}" required>
  <textarea class="feedback-input data" name="radiobutton" id="message" placeholder="Message" required></textarea>
  `
);

const createFormTemplate = (question, currentQuestion, amount, price) => {
  const {options, type} = question;
  return (
    `<div class="cta-header-container">
    ${currentQuestion <= amount ?
      `<form class="radio-group">
        ${currentQuestion === amount ? createDataQuestionTemplate(price) : options.map((option) => createOptionTemplate(option, type)).join('')}
      </form>
      <button class="disabled button-next navigation" disabled>${currentQuestion === amount ? 'Send' : 'Next'}</button>` :
      '<h3>Thank you! We will contact you as soon as possible</h3>'
    }
    </div>`
  );
};

export default class FormView extends AbstractView {
  #question = null;
  #currentQuestion = null;
  #amount = null;
  #price = null;

  constructor(question, currentQuestion, amount, price) {
    super();
    this.#question = question;
    this.#currentQuestion = currentQuestion;
    this.#amount = amount;
    this.#price = price;
  }

  get template() {
    return createFormTemplate(this.#question, this.#currentQuestion, this.#amount, this.#price);
  }

  setButtonClickHandler = (callback) => {
    this._callback.buttonClick = callback;
    this.element.querySelector('.button-next').addEventListener('click', this.#buttonClickHandler);
  };

  setInputLoadHandler = (callback) => {
    this._callback.inputLoad = callback;
    this.element.querySelectorAll('.radiobutton').forEach((input) => {
      input.addEventListener('change', this.#inputLoadHandler);
    });
  };

  setDataLoadHandler = (callback) => {
    this._callback.dataLoad = callback;
    this.element.querySelectorAll('.feedback-input').forEach((input) => {
      input.addEventListener('change', this.#inputLoadHandler);
    });
  };

  #buttonClickHandler = (evt) => {
    const inputs = document.querySelectorAll('.data');
    const feedbackInputs = document.querySelectorAll('.feedback-input');
    evt.preventDefault();

    if(feedbackInputs.length > 0) {
      let hasErrors = false;
      feedbackInputs.forEach((feedbackInput) => {
        if (!feedbackInput.checkValidity()) {
          hasErrors = true;
          this.showValidationError(feedbackInput);
        }
      });

      if (!hasErrors) {
        this._callback.buttonClick(inputs, evt);
      }
    } else {
      this._callback.buttonClick(inputs, evt);
    }
  };

  #inputLoadHandler = (evt) => {
    const button = document.querySelector('.button-next');
    const inputs = document.querySelectorAll('.data');
    evt.preventDefault();
    this._callback.inputLoad(button, inputs, evt);
  };

  showValidationError = (input) => {
    const errorEl = document.querySelector('.minute');
    if (input.id === 'email') {
      errorEl.textContent = 'Invalid email format';
    }
    if (input.id === 'username') {
      errorEl.textContent = 'Invalid name format';
    }
  };
}
