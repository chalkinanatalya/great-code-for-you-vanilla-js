import Observable from '../utils/observable';

export default class FeedbackModel extends Observable {
  #agencyApiService = null;
  #answers = [];

  constructor(agencyApiService) {
    super();
    this.#agencyApiService = agencyApiService;
  }

  get answers() {
    return this.#answers;
  }

  set answers(answer) {
    this.#answers.push(answer);
  }

  sendFormAnswers = async () => {
    try {
      await this.#agencyApiService.sendFeedback(this.#answers);
    } catch(err) {
      throw new Error('Can\'t send answers');
    }
  };
}
