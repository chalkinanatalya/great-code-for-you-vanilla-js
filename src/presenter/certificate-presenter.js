import { UpdateType } from '../const';
import { remove, render, RenderPosition } from '../utils/render';
import LoadingView from '../view/calc-loading-view';
import CertificateView from '../view/certificate-view';
export default class CertificatePresenter {
  #mainBoxContainer = null;
  #certificateModel = null;
  #certificateComponent = null;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  #slideIndex = 0;
  #slideWidth = 0;

  constructor(mainBoxContainer, certificateModel) {
    this.#mainBoxContainer = mainBoxContainer;
    this.#certificateModel = certificateModel;

    this.#certificateModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderCertificate();
  };

  #renderCertificate = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#certificateComponent = new CertificateView(this.#certificateModel.certificates);
    render(this.#certificateComponent, this.#mainBoxContainer, RenderPosition.BEFOREEND);
    this.#slideWidth = this.#certificateComponent.element.clientWidth;
    this.#setSliderHandler();
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#mainBoxContainer, RenderPosition.AFTERBEGIN);
  };

  #handleModelEvent = (updateType) => {
    if(UpdateType.INIT === updateType) {
      this.#isLoading = false;
      remove(this.#loadingComponent);
      this.#renderCertificate(this.#certificateModel.questions);
    }
  };

  #goToSlide = (sliderTrack, index) => {
    sliderTrack.style.transform = `translateX(-${index * this.#slideWidth}px)`;
    this.#slideIndex = index;
  };

  #setSliderHandler = () => {
    this.#certificateComponent.setButtonPrevClickHandler((sliderTrack) => {
      if (this.#slideIndex === 0) {
        this.#goToSlide(sliderTrack, this.#certificateModel.certificates.length - 1);
      } else {
        this.#goToSlide(sliderTrack, this.#slideIndex - 1);
      }
    });

    this.#certificateComponent.setButtonNextClickHandler((sliderTrack) => {
      if (this.#slideIndex === this.#certificateModel.certificates.length - 1) {
        this.#goToSlide(sliderTrack, 0);
      } else {
        this.#goToSlide(sliderTrack, this.#slideIndex + 1);
      }
    });

    this.#certificateComponent.setResizeHandler(() => {
      this.#slideWidth = this.#certificateComponent.element.clientWidth;
      this.#goToSlide(this.#slideIndex);
    });
  };
}
