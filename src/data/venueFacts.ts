import type { VenueFact } from '@/types/wedding';

const venueFacts: VenueFact[] = [
  {
    id: 'transfer',
    icon: 'route',
    title: 'Трансфер',
    lines: ['11:00 — сбор у гостиницы', '23:30 — обратно в город'],
  },
  {
    id: 'stay',
    icon: 'bed',
    title: 'Размещение',
    lines: ['Держим номера для гостей из других городов.', 'Отметьте это в анкете.'],
  },
  {
    id: 'gathering',
    icon: 'clock',
    title: 'Сбор гостей',
    lines: ['Ждём вас с 12:00.', 'Церемония начнётся ровно в 13:00.'],
  },
];

export default venueFacts;
