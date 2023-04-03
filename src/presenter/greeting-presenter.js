import { render, RenderPosition } from '../utils/render';
import GreetingView from '../view/greeting-view';

export default class GreetingPresenter {
  #mainContainer = null;
  #greetingComponent = new GreetingView();

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = () => {
    this.#renderGreeting();
  };

  #renderGreeting = () => {
    render(this.#greetingComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  };
}
