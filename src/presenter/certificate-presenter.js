import { render, RenderPosition } from '../utils/render';
import CertificateView from '../view/certificate-view';


export default class CertificatePresenter {
  #mainBoxContainer = null;
  #certificateComponent = new CertificateView();

  constructor(mainBoxContainer) {
    this.#mainBoxContainer = mainBoxContainer;
  }

  init = () => {
    this.#renderCertificate();
  };

  #renderCertificate = () => {
    render(this.#certificateComponent, this.#mainBoxContainer, RenderPosition.BEFOREEND);
  };
}
