import { UpdateType } from '../const';
import { remove, render, RenderPosition } from '../utils/render';
import LoadingView from '../view/calc-loading-view';
import DeveloperView from '../view/developer-view';
export default class DeveloperPresenter {
  #mainBoxContainer = null;
  #certificateModel = null;
  #certificateComponent = null;

  #loadingComponent = new LoadingView();
  #isLoading = true;

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

    this.#certificateComponent = new DeveloperView(this.#certificateModel.certificates);
    render(this.#certificateComponent, this.#mainBoxContainer, RenderPosition.AFTERBEGIN);
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

  #updateSliderDots = (sliderDots, currentIndex) => {
    sliderDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  #goToSlide = (sliderTrack, sliderDots, index) => {
    sliderTrack.style.transform = `translateX(-${index * sliderTrack.clientWidth}px)`;
    this.#updateSliderDots(sliderDots, index);
  };

  #setSliderHandler = () => {
    this.#certificateComponent.setButtonDotsClickHandler((sliderTrack, sliderDots, index) => {
      this.#goToSlide(sliderTrack, sliderDots, index);
    });
  };
}
