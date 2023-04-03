import AbstractView from '../utils/view/abstract-view';

const createFeedbackViewTemplate = () => (
  `<section class="container feedback">
    <div class="feedback-inner">
      <div class="feedback-content">
        <h2><span class="lighter">Is your site ready</span><br>for advertising?</h2>
        <p>It can be beautiful and not very, expensive or budget, on Tilda Publishing or 1C-Bitrix - all this is
          not so important.
          In order for applications to come, the site must sell cool. Let's check with our marketing
          specialist i
          on
          zoom.</p>
        <form action="#" class="feedback-form">
          <input type="text" class="form-field" id="field-name" placeholder="Your name">
          <input type="phone" class="form-field" id="field-phone" placeholder="Your phone">
          <button class="form-button">Submit</button>
        </form>
      </div>
      <div class="feedback-media">
        <div class="phone">
          <img src="./img/phone.png" alt="">
        </div>
        <div class="phone-cat">
          <img src="./img/phone_cat.gif" alt="">
        </div>
        <div class="screen"></div>
      </div>
    </div>
    <div class="feedback-bottom">
      <img class="tn-atom__img t-img loaded" src="./img/Vector_17.svg">
    </div>
  </section>`
);

export default class FeedbackView extends AbstractView {
  get template() {
    return createFeedbackViewTemplate();
  }
}
