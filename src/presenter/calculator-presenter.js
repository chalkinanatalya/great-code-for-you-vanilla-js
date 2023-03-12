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
      const checkedInput = Array.from(inputs).filter((input) => input.checked).map((input) => input.id);
      this.#questionModel.answers = {
        'id': this.#questionModel.questions[this.#currentQuestion].id,
        'options': checkedInput
      };

      if(this.#currentQuestion < this.#questionModel.questions.length - 1) {
        this.#currentQuestion++;
        remove(this.#paragraphComponent);
        remove(this.#optionsBlockComponent);
        this.init();
      } else {
        this.#questionModel.sendAnswers();
        //test TODO:
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
