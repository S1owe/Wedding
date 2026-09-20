import { ref } from 'vue';

export type ChapterId =
  | 'hero'
  | 'love'
  | 'venue'
  | 'timeline'
  | 'dresscode'
  | 'surprises'
  | 'ambient';

export const activeChapter = ref<ChapterId>('hero');

export const setActiveChapter = (id: ChapterId) => {
  activeChapter.value = id;
};
