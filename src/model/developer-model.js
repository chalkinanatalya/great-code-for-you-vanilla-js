import { UpdateType } from '../const';
import Observable from '../utils/observable';

export default class DeveloperModel extends Observable {
  #portfolioApiService = null;
  #developers = [];

  constructor(portfolioApiService) {
    super();
    this.#portfolioApiService = portfolioApiService;
  }

  get developers() {
    return this.#developers;
  }

  init = async () => {
    try {
      this.#developers = await this.#portfolioApiService.developers;
    } catch(err) {
      this.#developers = [];
    }
    this._notify(UpdateType.INIT);
  };
}
