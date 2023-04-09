import { UpdateType } from '../const';
import { remove, render, RenderPosition } from '../utils/render';
import LoadingView from '../view/calc-loading-view';
import DeveloperView from '../view/developer-view';
export default class DeveloperPresenter {
  #mainBoxContainer = null;
  #developerModel = null;
  #developerComponent = null;

  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor(mainBoxContainer, developerModel) {
    this.#mainBoxContainer = mainBoxContainer;
    this.#developerModel = developerModel;

    this.#developerModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderDeveloper();
  };

  #renderDeveloper = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#developerComponent = new DeveloperView(this.#developerModel.developers);
    render(this.#developerComponent, this.#mainBoxContainer, RenderPosition.AFTERBEGIN);
    this.#setSliderHandler();
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#mainBoxContainer, RenderPosition.AFTERBEGIN);
  };

  #handleModelEvent = (updateType) => {
    if(UpdateType.INIT === updateType) {
      this.#isLoading = false;
      remove(this.#loadingComponent);
      this.#renderDeveloper(this.#developerModel.questions);
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
    this.#developerComponent.setButtonDotsClickHandler((sliderTrack, sliderDots, index) => {
      this.#goToSlide(sliderTrack, sliderDots, index);
    });
  };
}
