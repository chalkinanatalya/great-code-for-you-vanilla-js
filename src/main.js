import CalculatorPresenter from './presenter/calculator-presenter.js';
import CalculatorModel from './model/calculator-model.js';
import PortfolioApiService from './portfolio-api-service.js';
import HeaderPresenter from './presenter/header-presenter.js';
import GreetingPresenter from './presenter/greeting-presenter.js';
import FeedbackPresenter from './presenter/feedback-presenter.js';
import CompetencePresenter from './presenter/competence-presenter.js';
import FooterPresenter from './presenter/footer-presenter.js';
import QualityPresenter from './presenter/quality-presenter.js';
import DeveloperPresenter from './presenter/developer-presenter.js';
import DeveloperModel from './model/developer-model.js';
import FeedbackModel from './model/feedback-model.js';

const AUTHORIZATION = 'testtoken1234567890';
const END_POINT = 'http://localhost:3000';


const mainContainerElement = document.querySelector('body');
const mainCalculatorElement = document.querySelector('.second-container');
const developerElement = document.querySelector('.developers');

const developerModel = new DeveloperModel(new PortfolioApiService(END_POINT, AUTHORIZATION));
const developerPresenter = new DeveloperPresenter(developerElement, developerModel);
developerModel.init();
developerPresenter.init();

const compitencePresenter = new CompetencePresenter(mainContainerElement);
compitencePresenter.init();

const qualityPresenter = new QualityPresenter(mainContainerElement);
qualityPresenter.init();

const greetingPresenter = new GreetingPresenter(mainContainerElement);
greetingPresenter.init();

const headerPresenter = new HeaderPresenter(mainContainerElement);
headerPresenter.init();

const calculatorModel = new CalculatorModel(new PortfolioApiService(END_POINT, AUTHORIZATION));
const calculatorPresenter = new CalculatorPresenter(mainCalculatorElement, calculatorModel);
calculatorModel.init();
calculatorPresenter.init();

const feedbackModel = new FeedbackModel(new PortfolioApiService(END_POINT, AUTHORIZATION));
const feedbackPresenter = new FeedbackPresenter(mainContainerElement, feedbackModel);
feedbackPresenter.init();

const footerPresenter = new FooterPresenter(mainContainerElement);
footerPresenter.init();
