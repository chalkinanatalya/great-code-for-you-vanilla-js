import { RenderPosition, render } from '../utils/render';
import CompetenceView from '../view/competence-view';


export default class CompetencePresenter {
  #mainBoxContainer = null;
  #competenceComponent = new CompetenceView();

  constructor(mainBoxContainer) {
    this.#mainBoxContainer = mainBoxContainer;
  }

  init = () => {
    this.#renderCompetence();
  };

  #renderCompetence = () => {
    render(this.#competenceComponent, this.#mainBoxContainer, RenderPosition.AFTERBEGIN);
  };
}
