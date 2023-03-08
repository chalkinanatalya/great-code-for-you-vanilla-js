import {generateQuestion} from '../mock/question.js';

export default class CalculatorModel {
  #questions = Array.from({length: 5}, generateQuestion);
  #answers = [];

  get questions() {
    return this.#questions;
  }

  get answers() {
    return this.#answers;
  }

  set answers(answer) {
    this.#answers.push(answer);
  }
}
