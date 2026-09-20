import { onBeforeUnmount, onMounted, ref } from 'vue';

export interface CountdownParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const pad = (value: number) => String(Math.max(value, 0)).padStart(2, '0');

/** Обратный отсчёт до заданного момента. Останавливается на нулях, когда дата прошла. */
export const useCountdown = (target: Date) => {
  const parts = ref<CountdownParts>({ days: '0', hours: '00', minutes: '00', seconds: '00' });
  const isFinished = ref(false);

  let timer: ReturnType<typeof setInterval> | undefined;

  const tick = () => {
    const diff = target.getTime() - Date.now();

    if (diff <= 0) {
      parts.value = { days: '0', hours: '00', minutes: '00', seconds: '00' };
      isFinished.value = true;
      clearInterval(timer);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    parts.value = {
      days: String(Math.floor(totalSeconds / 86400)),
      hours: pad(Math.floor(totalSeconds / 3600) % 24),
      minutes: pad(Math.floor(totalSeconds / 60) % 60),
      seconds: pad(totalSeconds % 60),
    };
  };

  onMounted(() => {
    tick();
    timer = setInterval(tick, 1000);
  });

  onBeforeUnmount(() => {
    clearInterval(timer);
  });

  return { parts, isFinished };
};
