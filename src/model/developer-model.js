import { UpdateType } from '../const';
import Observable from '../utils/observable';

export default class DeveloperModel extends Observable {
  #portfolioApiService = null;
  #certificates = [];

  constructor(portfolioApiService) {
    super();
    this.#portfolioApiService = portfolioApiService;
  }

  get certificates() {
    return this.#certificates;
  }

  init = async () => {
    try {
      this.#certificates = await this.#portfolioApiService.certificates;
    } catch(err) {
      this.#certificates = [];
    }
    this._notify(UpdateType.INIT);
  };
}
