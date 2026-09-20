import type { TimelineStage } from '@/types/wedding';

const timeline: TimelineStage[] = [
  {
    id: 1,
    time: '12:00',
    title: 'Сбор гостей',
    note: 'Welcome-фуршет, музыка и первые кадры дня.',
  },
  {
    id: 2,
    time: '13:00',
    title: 'Церемония',
    note: 'Момент, ради которого мы собираемся вместе.',
  },
  {
    id: 3,
    time: '14:00',
    title: 'Венчание',
    note: 'Тихая часть дня — только самые близкие.',
  },
  {
    id: 4,
    time: '15:00',
    title: 'Фотосессия с гостями',
    note: 'Общий кадр, который останется с нами надолго.',
  },
  {
    id: 5,
    time: '16:00',
    title: 'Банкет',
    note: 'Ужин, первый танец и тёплые слова.',
  },
  {
    id: 6,
    time: '22:00',
    title: 'Финальные титры',
    note: 'Последний бокал и дорога домой.',
  },
];

export default timeline;
