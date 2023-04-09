import { UpdateType } from '../const';
import { render, remove, RenderPosition } from '../utils/render';
import FormView from '../view/calc-form-view';
import LoadingView from '../view/calc-loading-view';
import QuestionView from '../view/calic-question-view';

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

  #renderQuestion = (questions) => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderParagraph(questions.length <= this.#currentQuestion ? [] : questions[this.#currentQuestion]);
    this.#renderOptionsBlock(questions.length <= this.#currentQuestion ? [] : questions[this.#currentQuestion]);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#containerPresenter, RenderPosition.AFTERBEGIN);
  };

  #renderParagraph = (question) => {
    this.#paragraphComponent = new QuestionView(question, this.#questionModel.questions.length < this.#currentQuestion ? 'result' : 'question');
    render(this.#paragraphComponent, this.#containerPresenter);
  };

  #renderOptionsBlock = (question) => {
    this.#optionsBlockComponent = new FormView(question, this.#currentQuestion, this.#questionModel.questions.length, this.#price);
    render(this.#optionsBlockComponent, this.#containerPresenter);
    if (this.#currentQuestion <= this.#questionModel.questions.length) {
      this.#setEnabledHandler();
      this.#setButtonHandler();
      this.#setDisabledHandler();
    }
  };

  #setButtonHandler = () => {
    this.#optionsBlockComponent.setButtonClickHandler((inputs) => {
      const inputsArray = Array.from(inputs);
      if(this.#currentQuestion < this.#questionModel.questions.length) {
        const checkedInputs = inputsArray.filter((input) => input.checked);
        const checkedInputsTitle = checkedInputs.map((input) => input.title);
        const checkedInputsValue = checkedInputs.map((input) => Number(input.value)).reduce((a, b) => a + b);
        this.#price += checkedInputsValue;
        this.#questionModel.answers = {
          'options': checkedInputsTitle,
          'price': checkedInputsValue,
        };
        this.#currentQuestion++;
        remove(this.#paragraphComponent);
        remove(this.#optionsBlockComponent);
        this.init();
      } else {
        this.#questionModel.client = {
          'name': inputsArray.find((input) => input.id === 'username').value,
          'email': inputsArray.find((input) => input.id === 'email').value,
          'message': inputsArray.find((input) => input.id === 'message').value,
          'final-price': this.#price,
        };
        this.#questionModel.sendAnswers();

        this.#currentQuestion++;
        remove(this.#paragraphComponent);
        remove(this.#optionsBlockComponent);
        this.init();
      }
    });
  };

  #setEnabledHandler = () => {
    this.#optionsBlockComponent.setInputLoadHandler((button, inputs) => {
      let isChecked = false;
      let isTexted = true;
      Array.from(inputs).forEach((input) => {
        if(input.classList.contains('feedback-input')) {
          if(input.value === '') {
            isTexted = false;
          }
          isChecked = true;
        } else {
          if(input.checked) {
            isChecked = true;
          }
        }
      });
      if(isChecked && isTexted) {
        button.removeAttribute('disabled', '');
        button.classList.remove('disabled');
      } else {
        button.setAttribute('disabled', '');
        button.classList.add('disabled');
      }
    });
  };

  #setDisabledHandler = () => {
    this.#optionsBlockComponent.setDataLoadHandler((button) => {
      button.setAttribute('disabled', '');
      button.classList.add('disabled');
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
