import { getRandomInteger } from '../utils/utils';

const generateParagraph = () => {
  const paragraphs = [
    'Расскажите о своем проекте. Какой функционал должен быть у Вашего сайта:',
    'На какой стадии разработки находится ваш сайт?',
    'Под какие устройства вы планируете адаптировать сайт?',
    'Кроме текста и изображений что будет на вашем сайте?',
    'Отметьте дополнительные опции, если они вам нужны.'
  ];

  const randomIndex = getRandomInteger(0, paragraphs.length - 1);
  return paragraphs[randomIndex];
};

const generateOptions = () => {
  const options = [
    [
      'лендинг',
      'портфолио',
      'социальная сеть',
      'Блог',
      'интернет-магазин'
    ],

    [
      'сайта нет, все нужно делать с нуля',
      'есть макет, нужно сверстать и запрограммировать',
      'нужно только сверстать',
      'нужно только запрограммировать'
    ],

    [
      'только мобильные',
      'только десктоп',
      'только планшет',
      'все'
    ],

    [
      'слайдеры',
      'видео',
      'аудио',
      'анимации',
      'карты'
    ],

    [
      'мультиязычность',
      'форма обратной связи',
      'поделиться ссылкой в соцсети',
      'изменение темы (вида) пользователем'
    ]
  ];

  const randomIndex = getRandomInteger(0, options.length - 1);
  return options[randomIndex];
};

export const generateQuestion = () => ({
  paragraph: generateParagraph(),
  optionsBlock: generateOptions()
});
