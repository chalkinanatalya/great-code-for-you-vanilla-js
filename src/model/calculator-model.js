import { UpdateType } from '../const';
import Observable from '../utils/observable';

export default class CalculatorModel extends Observable {
  #portfolioApiService = null;
  #questions = [];
  #answers = [];
  #client = null;

  constructor(portfolioApiService) {
    super();
    this.#portfolioApiService = portfolioApiService;
  }

  get questions() {
    return this.#questions;
  }

  get answers() {
    return this.#answers;
  }

  get client() {
    return this.#client;
  }

  set answers(answer) {
    this.#answers.push(answer);
  }

  set client(client) {
    this.#client = client;
  }

  init = async () => {
    try {
      this.#questions = await this.#portfolioApiService.questions;
    } catch(err) {
      this.#questions = [];
    }
    this._notify(UpdateType.INIT);
  };

  sendAnswers = async () => {
    try {
      const request = [{'client': this.#client, 'answers': this.#answers}];
      await this.#portfolioApiService.sendAnswers(request);
    } catch(err) {
      throw new Error('Can\'t send answers');
    }
  };
}
