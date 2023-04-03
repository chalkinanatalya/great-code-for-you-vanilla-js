import AbstractView from '../utils/view/abstract-view';

const createSlideTemplate = (certificate) => {
  const {description, url} = certificate;
  return (
    `<div class="slider-slide">
      <img src="${url}" alt="${description}">
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

const createCertificateViewTemplate = (certificates) => (
  `<div class="developers-slider-container">
        <div class="slider-track">
          ${certificates.map((certificate) => createSlideTemplate(certificate)).join('')}
        </div>
        ${createDotTemplate(certificates.length)}
      </div>`
);

export default class DeveloperView extends AbstractView {
  #certificates = [];

  constructor(certificates) {
    super();
    this.#certificates = certificates;
  }

  get template () {
    return createCertificateViewTemplate(this.#certificates);
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
