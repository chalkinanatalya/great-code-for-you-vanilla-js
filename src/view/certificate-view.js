import AbstractView from '../utils/view/abstract-view';

const createSlideTemplate = (certificate) => {
  const {description, url} = certificate;
  return (
    `<div class="cert-slider-slide">
      <img src="${url}" alt="${description}">
    </div>`
  );
};

const createCertificateViewTemplate = (certificates) => (
  `<section class="certificates">
      <h2 class="certificates-title">Сертификаты</h2>
      <div class="cert-slider-container">
        <div class="cert-slider-track">
          ${certificates.map((certificate) => createSlideTemplate(certificate))}
        </div>
        <div class="cert-slider-prev"></div>
        <div class="cert-slider-next"></div>
      </div>
    </section>`
);

export default class CertificateView extends AbstractView {
  #certificates = [];

  constructor(certificates) {
    super();
    this.#certificates = certificates;
  }

  get template () {
    return createCertificateViewTemplate(this.#certificates);
  }

  setButtonPrevClickHandler = (callback) => {
    this._callback.buttonPrevClick = callback;
    this.element.querySelector('.cert-slider-prev').addEventListener('click', this.#buttonPrevClickHandler);
  };

  setButtonNextClickHandler = (callback) => {
    this._callback.buttonNextClick = callback;
    this.element.querySelector('.cert-slider-next').addEventListener('click', this.#buttonNextClickHandler);
  };

  setResizeHandler = (callback) => {
    this._callback.sectionResize = callback;
    this.element.querySelector('.certificates').addEventListener('resize', this.#sectionResizeHandler);
  };

  #buttonPrevClickHandler = () => {
    const sliderTrack = document.querySelector('.cert-slider-track');
    this._callback.buttonPrevClick(sliderTrack);
  };

  #buttonNextClickHandler = () => {
    const sliderTrack = document.querySelector('.cert-slider-track');
    this._callback.buttonNextClick(sliderTrack);
  };

  #sectionResizeHandler = () => {
    this._callback.sectionResize();
  };
}
