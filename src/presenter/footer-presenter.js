import { RenderPosition, render } from '../utils/render';
import FooterView from '../view/footer-view';

export default class FooterPresenter {
  #footerContainer = null;
  #footerComponent = new FooterView();

  constructor(footerContainer) {
    this.#footerContainer = footerContainer;
  }

  init = () => {
    this.#renderFooter();
  };

  #renderFooter = () => {
    render(this.#footerComponent, this.#footerContainer, RenderPosition.BEFOREEND);
  };
}
