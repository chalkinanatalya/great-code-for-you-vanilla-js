import { render } from './utils/render.js';
import QuestionView from './view/question-view.js';
import FormView from './view/form-view.js';

const mainContainerElement = document.querySelector('.second-container');

render(new QuestionView(), mainContainerElement);
render(new FormView(), mainContainerElement);

