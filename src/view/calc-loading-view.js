import AbstractView from '../utils/view/abstract-view';

const createNoQuestionsTemplate = () => (
  `<p class="calculator__no-questions">
    <span class="loader"></span>
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoQuestionsTemplate();
  }
}
