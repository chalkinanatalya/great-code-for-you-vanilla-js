import { render, RenderPosition } from '../utils/render';
import FeedbackView from '../view/feedback-view';

export default class FeedbackPresenter {
  #mainContainer = null;
  #feedbackComponent = new FeedbackView();
  #feedbackModel = null;

  constructor(mainContainer, feedbackModel) {
    this.#mainContainer = mainContainer;
    this.#feedbackModel = feedbackModel;
  }

  init = () => {
    this.#renderFeedback();
  };

  #renderFeedback = () => {
    render(this.#feedbackComponent, this.#mainContainer, RenderPosition.BEFOREEND);
    this.#setButtonHandler();
  };

  #setButtonHandler = () => {
    this.#feedbackComponent.setSendButtonClickHandler((inputs) => {
      const inputsArray = Array.from(inputs);
      this.#feedbackModel.answers = {
        'name': inputsArray.find((input) => input.id === 'field-name').value,
        'phone': inputsArray.find((input) => input.id === 'field-phone').value,
      };
      this.#feedbackModel.sendFormAnswers();
    });
  };
}
