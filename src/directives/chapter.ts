import type { Directive } from 'vue';
import { setActiveChapter, type ChapterId } from '@/composables/useChapterBackground';

interface ChapterElement extends HTMLElement {
  __chapterObserver__?: IntersectionObserver;
}

const chapter: Directive<ChapterElement, ChapterId> = {
  mounted(el, binding) {
    const chapterId = binding.value;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveChapter(chapterId);
        }
      },
      // Секция считается «активной», когда пересекает центральную полосу экрана
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' },
    );

    observer.observe(el);
    el.__chapterObserver__ = observer;
  },
  unmounted(el) {
    el.__chapterObserver__?.disconnect();
  },
};

export default chapter;
