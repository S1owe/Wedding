import type { DressCodeColor } from '@/types/wedding';

// Шесть приглушённых пастельных оттенков — сетка 3×2 в карточке «Палитра вечера».
// Тона намеренно выбелены: это ориентир по настроению, а не точный образец краски.
const dressCode: DressCodeColor[] = [
  { hex: '#f6e4e6', name: 'Нежно-розовый' },
  { hex: '#efd8db', name: 'Розовый' },
  { hex: '#e1eaf1', name: 'Пудровый' },
  { hex: '#e6ebe0', name: 'Шалфейный' },
  { hex: '#f1e7d7', name: 'Шампань' },
  { hex: '#e9e1ec', name: 'Сиреневый' },
];

export default dressCode;
