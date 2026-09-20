import {
  COUPLE_SHORT,
  VENUE_CITY,
  VENUE_REGION,
  WEDDING_DAY,
  WEDDING_MONTH_INDEX,
  WEDDING_START_HOUR,
  WEDDING_YEAR,
} from '@/data/weddingConfig';

const stamp = (date: Date) => date.toISOString().replace(/[-:]|\.\d{3}/g, '');

/**
 * Ссылка «добавить в календарь» (Google Calendar) — работает без бэкенда
 * и открывается в любом браузере, в отличие от скачиваемого .ics.
 */
export const buildCalendarUrl = (): string => {
  const start = new Date(Date.UTC(WEDDING_YEAR, WEDDING_MONTH_INDEX, WEDDING_DAY, WEDDING_START_HOUR - 3, 0));
  const end = new Date(start.getTime() + 11 * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Свадьба — ${COUPLE_SHORT}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    location: `${VENUE_CITY}, ${VENUE_REGION}`,
    details: 'Приглашение на свадьбу',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
