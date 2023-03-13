import CalculatorPresenter from './presenter/calculator-presenter.js';
import CalculatorModel from './model/calculator-model.js';
import QuestionsApiService from './questions-api-service.js';

const AUTHORIZATION = 'testtoken1234567890';
const END_POINT = 'http://localhost:3000';

const mainContainerElement = document.querySelector('.second-container');
const calculatorModel = new CalculatorModel(new QuestionsApiService(END_POINT, AUTHORIZATION));
const calculatorPresenter = new CalculatorPresenter(mainContainerElement, calculatorModel);

calculatorModel.init();
calculatorPresenter.init();
