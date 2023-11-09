
const mounths = [
  'янв.',
  'фев.',
  'мар.',
  'апр.',
  'май',
  'июн.',
  'июл.',
  'авг.',
  'сен.',
  'окт.',
  'ноя.',
  'дек.'
];
const days = ["Вск",
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб"
];

export function UseDateTransform(time) {

  const firstDate = time.slice(0, 10);
  const secondDate = time.slice(12, 16);
  let totalDate = new Date(firstDate);

  const timeDate = {
    mounth: mounths[totalDate.getMonth()],
    days: days[totalDate.getDay()],
    date: totalDate.getDate(),
    time: secondDate,
  }
  return timeDate
}