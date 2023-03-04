import { render } from '../utils/render';
import FormView from '../view/form-view';
import QuestionView from '../view/question-view';

export default class CalculatorPresenter {
  #questionModel = null;
  #containerPresenter = null;

  #paragraphComponent = null;
  #optionsBlockComponent =  null;

  #currentQuestion = 0;

  constructor(containerPresenter, questionModel) {
    this.#containerPresenter = containerPresenter;
    this.#questionModel = questionModel;
  }

  init = () => {
    this.#renderQuestion(this.#questionModel.questions);
  };

  #renderQuestion = (questions) => {
    this.#renderParagraph(questions);
    this.#renderOptionsBlock(questions);

    // const onEscKeyDown = (evt) => {
    //   if (evt.key === 'Escape' || evt.key === 'Esc') {
    //     evt.preventDefault();
    //     //TODO remove!
    //     document.removeEventListener('keydown', onEscKeyDown);
    //   }
    // };
  };

  #renderParagraph = (questions) => {
    this.#paragraphComponent = new QuestionView(questions[0]);
    render(this.#paragraphComponent, this.#containerPresenter);
  };

  #renderOptionsBlock = (questions) => {
    this.#optionsBlockComponent = new FormView(questions[0]);
    render(this.#optionsBlockComponent, this.#containerPresenter);
    this.#setButtonHandler();
  };

  #setButtonHandler = () => {
    this.#optionsBlockComponent.setButtonClickHandler((data) => {
      this.#currentQuestion++;
      console.log(data);
      // this.#questionModel.answers(evt.target.value);
    });
  };
}
