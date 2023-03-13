import { UpdateType } from '../const';
import Observable from '../utils/observable';

export default class CalculatorModel extends Observable {
  #questionsApiService = null;
  #questions = [];
  #answers = [];

  constructor(questionsApiService) {
    super();
    this.#questionsApiService = questionsApiService;
  }

  get questions() {
    return this.#questions;
  }

  get answers() {
    return this.#answers;
  }

  set answers(answer) {
    this.#answers.push(answer);
  }

  init = async () => {
    try {
      this.#questions = await this.#questionsApiService.questions;
    } catch(err) {
      this.#questions = [];
    }
    this._notify(UpdateType.INIT);
  };

  sendAnswers = async () => {
    try {
      await this.#questionsApiService.sendAnswers(this.#answers);
    } catch(err) {
      throw new Error('Can\'t send answers');
    }
  };
}
