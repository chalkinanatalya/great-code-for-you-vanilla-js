import AbstractView from '../utils/view/abstract-view';

const createFormFeedbackTemplate = () => (
  `<input type="text" class="form-field" id="field-name" placeholder="Your name">
  <input type="phone" class="form-field" id="field-phone" placeholder="Your phone">`
);

const createFeedbackViewTemplate = () => (
  `<section class="container feedback">
    <div class="feedback-inner">
      <div class="feedback-content">
        <h2 class="animate__animated wow animate__bounceInLeft"><span class="lighter">Are you ready</span><br>for a step further?</h2>
        <p class="animate__animated wow animate__bounceInLeft">We aim to create unique and personalized websites that accurately meet the needs and goals of each client. Contact us today to discuss your needs and receive a free consultation. We are confident that we can offer you the best solution for your business in the online world.
        Please leave your contact information below, and we will get back to you soon. Thank you for considering us!</p>
        <form action="#" class="feedback-form">
            ${createFormFeedbackTemplate()}
          <button class="form-button">Submit</button>
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
  get template() {
    return createFeedbackViewTemplate();
  }

  setDataLoadHandler = (callback) => {
    this._callback.dataLoader = callback;
    this.element.querySelectorAll('.form-field').forEach((input) => {
      input.addEventListener('change', this.#inputLoaderHandler);
    });
  };

  setSendButtonClickHandler = (callback) => {
    this._callback.buttonSendClick = callback;
    this.element.querySelector('.form-button').addEventListener('click', this.#buttonSendClickHandler);
  };

  #inputLoaderHandler = (evt) => {
    const button = document.querySelector('.form-button');
    const inputs = document.querySelectorAll('.form-field');
    evt.preventDefault();
    this._callback.inputLoader(button, inputs, evt);
  };

  #buttonSendClickHandler = (evt) => {
    const inputs = document.querySelectorAll('.form-field');
    evt.preventDefault();
    this._callback.buttonSendClick(inputs, evt);
  };
}
