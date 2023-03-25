import AbstractView from '../utils/view/abstract-view';

const createProjectViewTemplate = () => (
  `<section class="projects">
      <h2 class="project-title">Выполненные проекты</h2>
      <!-- Слайдер проектов -->
      <div class="slider-container">
        <div class="slider-track">
          <div class="slider-slide">
            <img src="https://picsum.photos/640/360?random=1" />
          </div>
          <div class="slider-slide">
            <img src="https://picsum.photos/640/360?random=2" />
          </div>
          <div class="slider-slide">
            <img src="https://picsum.photos/640/360?random=3" />
          </div>
        </div>
        <div class="slider-prev"></div>
        <div class="slider-next"></div>
      </div>
  </section>`
);

export default class ProjectView extends AbstractView {
  get template() {
    return createProjectViewTemplate();
  }
}
