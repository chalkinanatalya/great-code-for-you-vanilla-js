import { render, remove } from '../utils/render';
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
    this.#paragraphComponent = new QuestionView(questions[this.#currentQuestion]);
    render(this.#paragraphComponent, this.#containerPresenter);
  };

  #renderOptionsBlock = (questions) => {
    this.#optionsBlockComponent = new FormView(questions, this.#currentQuestion);
    render(this.#optionsBlockComponent, this.#containerPresenter);
    this.#setButtonHandler();
  };

  #setButtonHandler = () => {
    this.#optionsBlockComponent.setButtonClickHandler((inputs) => {
      const checkedInput = Array.from(inputs).find((input) => input.checked === true);
      this.#questionModel.answers = checkedInput.id;
      //console.log(this.#currentQuestion);
      //console.log('this.#questionModel.answers: ', this.#questionModel.answers);

      if(this.#currentQuestion < this.#questionModel.questions.length - 1) {
        this.#currentQuestion++;
        remove(this.#paragraphComponent);
        remove(this.#optionsBlockComponent);
        this.init();
      }
    });
  };
}
