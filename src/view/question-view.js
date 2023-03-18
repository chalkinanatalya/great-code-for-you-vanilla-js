import AbstractView from '../utils/view/abstract-view';

const createQuestionTemplate = (question) => {
  const {paragraph} = question;
  return (
    `<div class="question">
    ${question.length === 0 ? '<p>Заполните форму ниже, чтобы разработчик мог с Вами связаться:</p>' : `<p>${paragraph}</p>`}
    </div>`
  );
};

export default class QuestionView extends AbstractView {
  #question = null;

  constructor(question) {
    super();
    this.#question = question;
  }

  get template() {
    return createQuestionTemplate(this.#question);
  }
}
