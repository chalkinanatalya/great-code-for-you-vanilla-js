import { remove, render, RenderPosition } from '../utils/render';
import FeedbackView from '../view/feedback-view';

export default class FeedbackPresenter {
  #mainContainer = null;
  #feedbackComponent = null;
  #feedbackModel = null;
  #sentStatus = '';

  constructor(mainContainer, feedbackModel) {
    this.#mainContainer = mainContainer;
    this.#feedbackModel = feedbackModel;
  }

  init = () => {
    this.#renderFeedback();
  };

  #renderFeedback = () => {
    this.#feedbackComponent = new FeedbackView(this.#sentStatus);
    render(this.#feedbackComponent, this.#mainContainer, RenderPosition.BEFOREEND);
    if (this.#sentStatus !== 'sent') {
      this.#setButtonHandler();
    }
  };

  #setButtonHandler = () => {
    this.#feedbackComponent.setSendButtonClickHandler((inputs) => {
      const inputsArray = Array.from(inputs);
      this.#feedbackModel.answers = {
        'name': inputsArray.find((input) => input.id === 'field-name').value,
        'phone': inputsArray.find((input) => input.id === 'field-phone').value,
      };
      this.#feedbackModel.sendFormAnswers();
      this.#sentStatus = 'sent';
      remove(this.#feedbackComponent);
      this.init();
    });
  };
}
