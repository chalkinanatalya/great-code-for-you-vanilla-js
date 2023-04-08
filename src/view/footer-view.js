import AbstractView from '../utils/view/abstract-view';

const createFooterViewTemplate = () => (
  `<footer class="container footer-container">
    <div class="container animate__animated wow footer animate__flipInY">
      <span class="copyright">
        &copy<a href="#">GreatCodeForYou</a> 2023</span>
    </div>
  </footer>`
);

export default class FooterView extends AbstractView {
  get template () {
    return createFooterViewTemplate();
  }
}
