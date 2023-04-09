import AbstractView from '../utils/view/abstract-view';

const createSlideTemplate = (developer) => {
  const {description, fileName} = developer;
  return (
    `<div class="slider-slide">
      <img src="./img/developers/${fileName}" alt="${description}">
    </div>`
  );
};

const createDotTemplate = (length) =>{
  let dot = '';
  for(let i = 0; i < length; i++) {
    dot += `<span class="slider-dot ${!i ? 'active' : ''}"></span>`;
  }
  return (
    `<div class="slider-dots">
      ${dot}
    </div>`
  );
};

const createDeveloperViewTemplate = (developers) => (
  `<div class="developers-slider-container">
        <div class="slider-track">
          ${developers.map((developer) => createSlideTemplate(developer)).join('')}
        </div>
        ${createDotTemplate(developers.length)}
      </div>`
);

export default class DeveloperView extends AbstractView {
  #developers = [];

  constructor(developers) {
    super();
    this.#developers = developers;
  }

  get template () {
    return createDeveloperViewTemplate(this.#developers);
  }

  setButtonDotsClickHandler = (callback) => {
    this._callback.buttonDotsClick = callback;
    this.element.querySelectorAll('.slider-dot').forEach((dot, index) => dot.addEventListener('click', () => {this.#buttonDotsClickHandler(index);}));
  };

  #buttonDotsClickHandler = (index) => {
    const sliderTrack = document.querySelector('.slider-track');
    const sliderDots = document.querySelectorAll('.slider-dot');
    this._callback.buttonDotsClick(sliderTrack, sliderDots, index);
  };
}
