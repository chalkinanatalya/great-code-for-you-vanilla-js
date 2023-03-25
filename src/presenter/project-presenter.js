import { RenderPosition, render } from '../utils/render';
import ProjectView from '../view/project-view';

export default class ProjectPresenter {
  #mainBoxContainer = null;
  #projectComponent = new ProjectView();

  constructor(mainBoxContainer) {
    this.#mainBoxContainer = mainBoxContainer;
  }

  init = () => {
    this.#renderProject();
  };

  #renderProject = () => {
    render(this.#projectComponent, this.#mainBoxContainer, RenderPosition.BEFOREEND);
  };
}
