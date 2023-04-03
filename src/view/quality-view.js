import AbstractView from '../utils/view/abstract-view';

const createQualityViewTemplate = () => (
  `<section class="qualities">
    <div class="quality-inner">
      <article class="quality design">
        <div class="quality-header">
          <h2>Creative designs</h2>
        </div>
        <div class="quality-media">
          <img src="img/design.png"></img>
        </div>
        <div class="quality-content">
          Good design will help you create a strong impression, build a brand identity, convey key information, narrate your story, and build consumer trust. You can totaly rely on us as a group of skilled and experienced designers. We know how to do it for you.
        </div>
      </article>
      <article class="quality developing">
        <div class="quality-header">
          <h2>Web-developing</h2>
        </div>
        <div class="quality-media">
          <img src="img/web-developing.png"></img>
        </div>
        <div class="quality-content">
          We think about every detail for you. Our brilliant developers can do everything. Literally. We can easily deal with landings, SPA, small and big projects. And also you will get 50% discount for maintainance.
        </div>
      </article>
      <article class="quality marketing">
        <div class="quality-header">
          <h2>Marketing</h2>
        </div>
        <div class="quality-media">
          <img src="img/marketing.png"></img>
        </div>
        <div class="quality-content">
        We will promote your site. We work with many adds agencies to make your product be seen by everyone on the web. It's more than a site. It's your future. Start making money with us.
        </div>
      </article>
    </div>
  </section>`
);

export default class QualityView extends AbstractView {
  get template() {
    return createQualityViewTemplate();
  }

  setOnEntryHandler = (callback) => {
    this._callback.reveal = callback;
    const options = { threshold: [0.5] };
    const observer = new IntersectionObserver(this.#onEntryHandler, options);
    const elements = this.element.querySelectorAll('.quality');

    for (const elm of elements) {
      observer.observe(elm);
    }
  };

  #onEntryHandler = (entry) => {
    this._callback.reveal(entry);
  };
}
