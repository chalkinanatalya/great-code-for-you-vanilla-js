import CalculatorPresenter from './presenter/calculator-presenter.js';
import CalculatorModel from './model/calculator-model.js';

const mainContainerElement = document.querySelector('.second-container');
const calculatorModel = new CalculatorModel();
const calculatorPresenter = new CalculatorPresenter(mainContainerElement, calculatorModel);

calculatorPresenter.init();


