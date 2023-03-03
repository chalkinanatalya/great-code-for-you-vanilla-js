import {generateQuestion} from '../mock/question.js';

export default class CalculatorModel {
  #questions = Array.from({length: 5}, generateQuestion);

  get tasks() {
    return this.#questions;
  }
}
