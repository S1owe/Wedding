import type { TimelineStage } from '@/types/wedding';

const timeline: TimelineStage[] = [
  {
    id: 1,
    time: '12:00',
    title: 'Сбор гостей и welcome-фуршет',
    address: 'г. Москва, ул. Примерная, 1',
  },
  {
    id: 2,
    time: '13:00',
    title: 'Торжественная регистрация брака',
    address: 'Дворец бракосочетания №1',
  },
  {
    id: 3,
    time: '14:00',
    title: 'Венчание',
    address: 'Храм Всех Святых',
  },
  {
    id: 4,
    time: '15:00',
    title: 'Фотосессия с гостями',
    address: 'Парк «Сокольники»',
  },
  {
    id: 5,
    time: '16:00',
    title: 'Банкет',
    address: 'Ресторан «Панорама»',
  },
  {
    id: 6,
    time: '22:00',
    title: 'Завершение вечера',
    address: 'Ресторан «Панорама»',
  },
];

export default timeline;
