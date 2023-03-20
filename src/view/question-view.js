import AbstractView from '../utils/view/abstract-view';

const createQuestionTemplate = (question, message) => {
  const {paragraph} = question;
  let title = '';
  if (message === 'result') {
    title = '';
  } else {
    title = question.length === 0 ? '<p>Заполните форму ниже, чтобы разработчик мог с Вами связаться:</p>' : `<p>${paragraph}</p>`;
  }
  return (
    `<div class="question">
    ${title}
    </div>`
  );
};

export default class QuestionView extends AbstractView {
  #question = null;
  #message = null;

  constructor(question, message) {
    super();
    this.#question = question;
    this.#message = message;
  }

  get template() {
    return createQuestionTemplate(this.#question, this.#message);
  }
}
