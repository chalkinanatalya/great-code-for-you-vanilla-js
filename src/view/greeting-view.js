import AbstractView from '../utils/view/abstract-view';

const createGreetingViewTemplate = () => (
  `<section class="container greeting">
    <div class="text">
      <p class="creative animate__animated wow animate__fadeInLeftBig">Websites that work,<br>
        for organizations that<br>
        make a difference
      </p>
    </div>
  </section>`
);

export default class GreetingView extends AbstractView {
  get template() {
    return createGreetingViewTemplate();
  }
}
