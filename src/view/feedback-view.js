import AbstractView from '../utils/view/abstract-view';

const createFeedbackViewTemplate = () => (
  `<section class="feedback">
  <div class="feedback-box">
    <h2 class="feedback-title">Задать вопрос</h2>
    <input class="feedback-title-name" type="text" name="name" required="required" placeholder=" Ваше имя" />
    <input class="feedback-title-email" type="email" name="email" required="required" placeholder=" Ваш email" />
    <textarea name="message" placeholder=" Ваше сообщение"></textarea>
    <p>
      <input class="feedback-title-message" type="file" name="photo" multiple accept="image/*,image/jpeg"
        placeholder="Прикрепить файл" />
    </p>
    <input class="feedback-title-btn" type="submit" name="submit_btn" value="Отправить" />
  </div>
</section>`
);

export default class FeedbackView extends AbstractView {
  get template() {
    return createFeedbackViewTemplate();
  }
}
