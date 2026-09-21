import { onBeforeUnmount, ref } from 'vue';

export interface CountdownParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const pad = (value: number) => String(Math.max(value, 0)).padStart(2, '0');

const computeParts = (diff: number): CountdownParts => {
  if (diff <= 0) return { days: '0', hours: '00', minutes: '00', seconds: '00' };

  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: String(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor(totalSeconds / 3600) % 24),
    minutes: pad(Math.floor(totalSeconds / 60) % 60),
    seconds: pad(totalSeconds % 60),
  };
};

/**
 * Обратный отсчёт до заданного момента. Останавливается на нулях, когда дата прошла.
 *
 * Первое значение считается сразу, при вызове (а не в onMounted): если дата уже в
 * прошлом на момент открытия страницы, компонент должен с первого же рендера увидеть
 * `isFinished === true` — иначе на один тик успевает отрисоваться «идущий» отсчёт,
 * который тут же сменяется финальным текстом, и `<transition>`, обёрнутый вокруг
 * обоих состояний, ломается: leave и enter случаются в одном тике до первой отрисовки
 * кадра, и элемент застревает с классом `-enter-from`, так и не получив прозрачность 1.
 */
export const useCountdown = (target: Date) => {
  const initialDiff = target.getTime() - Date.now();

  const parts = ref<CountdownParts>(computeParts(initialDiff));
  const isFinished = ref(initialDiff <= 0);

  let timer: ReturnType<typeof setInterval> | undefined;

  const tick = () => {
    const diff = target.getTime() - Date.now();
    parts.value = computeParts(diff);

    if (diff <= 0) {
      isFinished.value = true;
      clearInterval(timer);
    }
  };

  if (!isFinished.value) {
    timer = setInterval(tick, 1000);
  }

  onBeforeUnmount(() => {
    clearInterval(timer);
  });

  return { parts, isFinished };
};
