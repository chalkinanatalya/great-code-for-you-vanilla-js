import { nanoid } from 'nanoid';
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
      {
        id: nanoid(),
        option: 'лендинг'
      },

      {
        id: nanoid(),
        option: 'портфолио'
      },

      {
        id: nanoid(),
        option: 'социальная сеть'
      },

      {
        id: nanoid(),
        option: 'Блог'
      },

      {
        id: nanoid(),
        option: 'интернет-магазин'
      }
    ],

    [
      {
        id: nanoid(),
        option: 'сайта нет, все нужно делать с нуля'
      },

      {
        id: nanoid(),
        option: 'есть макет, нужно сверстать и запрограммировать'
      },

      {
        id: nanoid(),
        option: 'нужно только сверстать'
      },

      {
        id: nanoid(),
        option: 'нужно только запрограммировать'
      }
    ],

    [
      {
        id: nanoid(),
        option: 'только мобильные'
      },

      {
        id: nanoid(),
        option: 'только десктоп'
      },

      {
        id: nanoid(),
        option: 'только планшет'
      },

      {
        id: nanoid(),
        option: 'все'
      }
    ],

    [
      {
        id: nanoid(),
        option: 'слайдеры'
      },

      {
        id: nanoid(),
        option: 'видео'
      },

      {
        id: nanoid(),
        option: 'аудио'
      },

      {
        id: nanoid(),
        option: 'анимации'
      },

      {
        id: nanoid(),
        option: 'карты'
      },
    ],

    [
      {
        id: nanoid(),
        option: 'мультиязычность'
      },

      {
        id: nanoid(),
        option: 'форма обратной связи'
      },

      {
        id: nanoid(),
        option: 'поделиться ссылкой в соцсети'
      },

      {
        id: nanoid(),
        option: 'изменение темы (вида) пользователем'
      },
    ]
  ];

  const randomIndex = getRandomInteger(0, options.length - 1);
  return options[randomIndex];
};

export const generateQuestion = () => ({
  paragraph: generateParagraph(),
  optionsBlock: generateOptions()
});
