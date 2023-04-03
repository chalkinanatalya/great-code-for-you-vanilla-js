import { RenderPosition, render } from '../utils/render';
import QualityView from '../view/quality-view';

export default class QualityPresenter {
  #mainBoxContainer = null;
  #qualityComponent = new QualityView();

  constructor(mainBoxContainer) {
    this.#mainBoxContainer = mainBoxContainer;
  }

  init = () => {
    this.#renderProject();
  };

  #renderProject = () => {
    render(this.#qualityComponent, this.#mainBoxContainer, RenderPosition.AFTERBEGIN);
    this.#setRevealHandler();
  };

  #onEntry = (entry) => {
    entry.forEach((change) => {
      if (change.isIntersecting) {
        change.target.classList.add('show');
      }
    });
  };

  #setRevealHandler = () => {
    this.#qualityComponent.setOnEntryHandler((entry) => {
      this.#onEntry(entry);
    });
  };
}
