import AbstractView from '../utils/view/abstract-view';

const createFormFeedbackTemplate = () => (
  `<input type="text" class="form-field" id="field-name" placeholder="Your name" pattern="[A-Za-z]+" required>
  <input type="text" class="form-field" id="field-phone" placeholder="Your phone" pattern="\\+[0-9]{1,4}\\([0-9]{1,5}\\)[0-9]{1,10}$" required>
  <button class="form-button disabled">Submit</button>
  <div class="feedback-err"></div>`
);

const createFeedbackViewTemplate = (sentStatus) => (
  `<section class="container feedback">
    <div class="feedback-inner">
      <div class="feedback-content">
        <h2 class="animate__animated wow animate__bounceInLeft"><span class="lighter">Are you ready</span><br>for a step further?</h2>
        <p class="animate__animated wow animate__bounceInLeft">We aim to create unique and personalized websites that accurately meet the needs and goals of each client. Contact us today to discuss your needs and receive a free consultation. We are confident that we can offer you the best solution for your business in the online world.
        Please leave your contact information below, and we will get back to you soon. Thank you for considering us!</p>
        <form action="#" class="feedback-form">
        ${sentStatus !== 'sent' ? createFormFeedbackTemplate() : '<h3>Thank you! We will contact you as soon as possible</h3>'}
        </form>
      </div>
      <div class="feedback-media">
        <div class="phone">
          <img src="./img/phone.png" alt="">
        </div>
        <div class="phone-cat">
          <img src="./img/phone_cat.gif" alt="">
        </div>
        <div class="screen"></div>
      </div>
    </div>
    <div class="feedback-bottom">
      <img class="tn-atom__img t-img loaded" src="./img/Vector_17.svg">
    </div>
  </section>`
);

export default class FeedbackView extends AbstractView {
  #sentStatus = '';

  constructor (sentStatus) {
    super();
    this.#sentStatus = sentStatus;
  }

  get template() {
    return createFeedbackViewTemplate(this.#sentStatus);
  }

  setSendButtonClickHandler = (callback) => {
    this._callback.buttonSendClick = callback;
    this.element.querySelector('.form-button').addEventListener('click', this.#buttonSendClickHandler);
  };

  #buttonSendClickHandler = (evt) => {
    const inputs = document.querySelectorAll('.form-field');
    evt.preventDefault();

    let hasErrors = false;
    inputs.forEach((input) => {
      if (!input.checkValidity()) {
        hasErrors = true;
        this.showValidationError(input);
      }
    });

    if (!hasErrors) {
      this._callback.buttonSendClick(inputs);
    }
  };

  showValidationError = (input) => {
    const errorEl = document.querySelector('.feedback-err');
    if (input.id === 'field-phone') {
      errorEl.textContent = 'Invalid phone number format';
    }
    if (input.id === 'field-name') {
      errorEl.textContent = 'Invalid name format';
    }
  };
}
