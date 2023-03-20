import AbstractView from '../utils/view/abstract-view';

const createOptionTemplate = (option, type) => (
  `<div class="group-answer radio">
    <label for=${option.id} class="radiolabel">${option.option}</label>
    <input type="${type}" class="radiobutton data" id=${option.id} name="radiobutton" value="${option.price}">
  </div>`
);

const createDataQuestionTemplate = (price) => (
  `<h4>Примерная стоимость Вашего проекта: ${price}</h4>
  <input type="text" class="feedback-input data" name="radiobutton" id="username" placeholder="Имя">
  <input type="email" class="feedback-input data" name="radiobutton" id="email" placeholder="Email">
  <textarea class="feedback-input data" name="radiobutton" id="message" placeholder="Сообщение"></textarea>
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
      <button class="button-next navigation">${currentQuestion === amount ? 'Отправить' : 'Дальше'}</button>` :
      '<h1>Спасибо за Ваши ответы! Разработчик свяжется с Вами в ближайшее время.</h1><div class="circle"><div class="checkmark"></div></div>'
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

  #buttonClickHandler = (evt) => {
    const inputs = document.querySelectorAll('.data');
    evt.preventDefault();
    this._callback.buttonClick(inputs, evt);
  };
}
