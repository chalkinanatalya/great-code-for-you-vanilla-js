import AbstractView from '../utils/view/abstract-view';

const createFooterViewTemplate = () => (
  `<footer class="container footer-container">
    <div class="container footer">
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
