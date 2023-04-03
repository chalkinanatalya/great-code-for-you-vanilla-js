import { RenderPosition, render } from '../utils/render';
import HeaderView from '../view/header-view';

export default class HeaderPresenter {
  #bodyContainer = null;
  #headerComponent = new HeaderView();

  constructor(bodyContainer) {
    this.#bodyContainer = bodyContainer;
  }

  init = () => {
    this.#renderHeader();
  };

  #renderHeader = () => {
    render(this.#headerComponent, this.#bodyContainer, RenderPosition.AFTERBEGIN);
  };
}
