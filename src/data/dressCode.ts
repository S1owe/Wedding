import type { DressCodeColor } from '@/types/wedding';

// Шесть приглушённых пастельных оттенков — сетка 3×2 в карточке «Палитра вечера».
// Тона намеренно выбелены: это ориентир по настроению, а не точный образец краски.
const dressCode: DressCodeColor[] = [
  { hex: '#f6e4e6', name: 'Blush' },
  { hex: '#efd8db', name: 'Rose' },
  { hex: '#e1eaf1', name: 'Powder' },
  { hex: '#e6ebe0', name: 'Sage' },
  { hex: '#f1e7d7', name: 'Champagne' },
  { hex: '#e9e1ec', name: 'Lilac' },
];

export default dressCode;
