import { UpdateType } from '../const';
import { render, remove, RenderPosition } from '../utils/render';
import FormView from '../view/form-view';
import LoadingView from '../view/loading-view';
import QuestionView from '../view/question-view';

export default class CalculatorPresenter {
  #questionModel = null;
  #containerPresenter = null;

  #paragraphComponent = null;
  #optionsBlockComponent =  null;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  #currentQuestion = 0;
  #price = 0;

  constructor(containerPresenter, questionModel) {
    this.#containerPresenter = containerPresenter;
    this.#questionModel = questionModel;

    this.#questionModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderQuestion(this.#questionModel.questions);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#containerPresenter, RenderPosition.AFTERBEGIN);
  };

  #renderQuestion = (questions) => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderParagraph(questions.length === this.#currentQuestion ? [] : questions[this.#currentQuestion]);
    this.#renderOptionsBlock(questions.length === this.#currentQuestion ? [] : questions[this.#currentQuestion]);
  };

  #renderParagraph = (question) => {
    this.#paragraphComponent = new QuestionView(question);
    render(this.#paragraphComponent, this.#containerPresenter);
  };

  #renderOptionsBlock = (question) => {
    this.#optionsBlockComponent = new FormView(question, this.#currentQuestion, this.#questionModel.questions.length, this.#price);
    render(this.#optionsBlockComponent, this.#containerPresenter);
    this.#setButtonHandler();
  };

  #setButtonHandler = () => {
    this.#optionsBlockComponent.setButtonClickHandler((inputs) => {
      const inputsArray = Array.from(inputs);
      if(this.#currentQuestion < this.#questionModel.questions.length) {
        const checkedInputs = inputsArray.filter((input) => input.checked);
        const checkedInputsIds = checkedInputs.map((input) => input.id);
        const checkedInputsValue = checkedInputs.map((input) => Number(input.value)).reduce((a, b) => a + b);
        this.#price += checkedInputsValue;
        this.#questionModel.answers = {
          'id': this.#questionModel.questions[this.#currentQuestion].id,
          'options': checkedInputsIds,
          'price': checkedInputsValue,
        };
        this.#currentQuestion++;
        remove(this.#paragraphComponent);
        remove(this.#optionsBlockComponent);
        this.init();
      } else {
        this.#questionModel.answers = {
          'name': inputsArray.find((input) => input.id === 'username').value,
          'email': inputsArray.find((input) => input.id === 'mail').value,
          'final-price': this.#price,
        };
        this.#questionModel.sendAnswers();
        //test TODO: DO THE LAST FORM!!!!!
        // remove(this.#paragraphComponent);
        // remove(this.#optionsBlockComponent);
      }
    });
  };

  #handleModelEvent = (updateType) => {
    if(UpdateType.INIT === updateType) {
      this.#isLoading = false;
      remove(this.#loadingComponent);
      this.#renderQuestion(this.#questionModel.questions);
    }
  };
}
