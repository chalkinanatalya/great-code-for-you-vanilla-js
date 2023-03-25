import { render, RenderPosition } from '../utils/render';
import PrimeView from '../view/prime-view';

export default class PrimePresenter {
  #mainContainer = null;
  #primeComponent = new PrimeView();

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = () => {
    this.#renderPrime();
  };

  #renderPrime = () => {
    render(this.#primeComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  };
}
