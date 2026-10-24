import type { RsvpFormState } from '@/types/wedding';

const SCRIPT_URL = import.meta.env.VITE_RSVP_SCRIPT_URL;
const SECRET = import.meta.env.VITE_RSVP_SECRET;

interface RsvpResponse {
  ok: boolean;
  error?: string;
}

/**
 * Apps Script Web App не обрабатывает preflight OPTIONS, поэтому запрос
 * отправляется с Content-Type: text/plain — это «простой» CORS-запрос,
 * браузер не шлёт preflight, а doPost всё равно читает e.postData.contents.
 */
export const submitRsvpForm = async (state: RsvpFormState): Promise<void> => {
  if (!SCRIPT_URL) {
    throw new Error('VITE_RSVP_SCRIPT_URL не задан');
  }

  const payload = {
    secret: SECRET,
    guests: state.guests.map((guest) => guest.name.trim()).filter(Boolean),
    attendance: state.attendance,
    transfer: state.transfer,
    accommodation: state.accommodation,
  };

  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Ошибка сети: ${response.status}`);
  }

  const result = (await response.json()) as RsvpResponse;

  if (!result.ok) {
    throw new Error(result.error || 'Не удалось сохранить ответ');
  }
};
