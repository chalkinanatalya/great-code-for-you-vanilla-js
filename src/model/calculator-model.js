import {generateQuestion} from '../mock/question.js';

export default class CalculatorModel {
  #questions = generateQuestion();

  get questions() {
    return this.#questions;
  }
}
