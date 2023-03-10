import AbstractView from '../utils/view/abstract-view';

const createNoQuestionsTemplate = () => (
  `<p class="calculator__no-questions">
    Loading...
  </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createNoQuestionsTemplate();
  }
}
