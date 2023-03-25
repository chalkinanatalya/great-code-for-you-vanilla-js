import CalculatorPresenter from './presenter/calculator-presenter.js';
import CalculatorModel from './model/calculator-model.js';
import QuestionsApiService from './questions-api-service.js';
import HeaderPresenter from './presenter/header-presenter.js';
import PrimePresenter from './presenter/prime-presenter.js';
import FeedbackPresenter from './presenter/feedback-presenter.js';

const AUTHORIZATION = 'testtoken1234567890';
const END_POINT = 'http://localhost:3000';


const headerContainerElement = document.querySelector('header');
const mainContainerElement = document.querySelector('main');
//const footerContainerElement = document.querySelector('footer');
//const mainBoxContainerElement = document.querySelector('.main-box');

const mainCalculatorElement = document.querySelector('.second-container');
const calculatorModel = new CalculatorModel(new QuestionsApiService(END_POINT, AUTHORIZATION));
const calculatorPresenter = new CalculatorPresenter(mainCalculatorElement, calculatorModel);


calculatorModel.init();
calculatorPresenter.init();

const headerPresenter = new HeaderPresenter(headerContainerElement);
headerPresenter.init();

const primePresenter = new PrimePresenter(mainContainerElement);
primePresenter.init();

const feedbackPresenter = new FeedbackPresenter(mainContainerElement);
feedbackPresenter.init();
