import type { Directive, DirectiveBinding } from 'vue';

interface RevealElement extends HTMLElement {
  __revealObserver__?: IntersectionObserver;
}

const applyDelay = (el: HTMLElement, binding: DirectiveBinding<number | undefined>) => {
  if (typeof binding.value === 'number' && binding.value > 0) {
    el.style.transitionDelay = `${binding.value}ms`;
  }
};

const reveal: Directive<RevealElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal');
    applyDelay(el, binding);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('reveal--visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);
    el.__revealObserver__ = observer;
  },
  unmounted(el) {
    el.__revealObserver__?.disconnect();
  },
};

export default reveal;
