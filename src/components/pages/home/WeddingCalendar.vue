<script setup lang="ts">
import { computed } from 'vue';
import ChapterMark from '@ui/ChapterMark.vue';
import CalendarIcon from '@icons/CalendarIcon.vue';
import type { CalendarDay } from '@/types/wedding';
import { buildCalendarUrl } from '@/composables/useCalendarLink';
import {
  CALENDAR_MONTH_NAME,
  WEEKDAY_LABELS,
  WEDDING_DATE_SPACED,
  WEDDING_DAY,
  WEDDING_MONTH_INDEX,
  WEDDING_YEAR,
} from '@/data/weddingConfig';

const calendarUrl = buildCalendarUrl();

const weeks = computed<CalendarDay[][]>(() => {
  const firstOfMonth = new Date(WEDDING_YEAR, WEDDING_MONTH_INDEX, 1);
  const daysInMonth = new Date(WEDDING_YEAR, WEDDING_MONTH_INDEX + 1, 0).getDate();
  const daysInPrevMonth = new Date(WEDDING_YEAR, WEDDING_MONTH_INDEX, 0).getDate();

  // getDay(): 0 = вс ... 6 = сб. Переводим на неделю с понедельника: 0 = пн ... 6 = вс.
  const leadingDaysCount = (firstOfMonth.getDay() + 6) % 7;

  const days: CalendarDay[] = [];

  for (let i = leadingDaysCount; i > 0; i -= 1) {
    days.push({ date: daysInPrevMonth - i + 1, isCurrentMonth: false, isHighlighted: false });
  }

  for (let date = 1; date <= daysInMonth; date += 1) {
    days.push({ date, isCurrentMonth: true, isHighlighted: date === WEDDING_DAY });
  }

  let trailingDate = 1;
  while (days.length % 7 !== 0) {
    days.push({ date: trailingDate, isCurrentMonth: false, isHighlighted: false });
    trailingDate += 1;
  }

  const result: CalendarDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    result.push(days.slice(i, i + 7));
  }
  return result;
});
</script>

<template>
  <section id="date" class="band band--ink-soft calendar-section">
    <div class="shell">
      <ChapterMark index="02" label="Дата" />

      <div class="editorial">
        <div>
          <span v-reveal class="eyebrow">Отметьте в календаре</span>
          <h2 v-reveal="60" class="display">Один день,<br>который мы ждём.</h2>
          <p v-reveal="120" class="lede">
            В этот день мы скажем «да» — и будем рады, если вы окажетесь в этом кадре рядом с нами.
          </p>

          <p v-reveal="160" class="calendar-section__date">{{ WEDDING_DATE_SPACED }}</p>

          <a v-reveal="200" class="btn btn--solid calendar-section__cta" :href="calendarUrl" target="_blank" rel="noopener noreferrer">
            <CalendarIcon />
            Добавить в календарь
          </a>
        </div>

        <div v-reveal="120" class="calendar">
          <p class="calendar__month">{{ CALENDAR_MONTH_NAME }} {{ WEDDING_YEAR }}</p>

          <div class="calendar__weekdays">
            <span v-for="label in WEEKDAY_LABELS" :key="label">{{ label }}</span>
          </div>

          <div class="calendar__weeks">
            <div v-for="(week, weekIndex) in weeks" :key="weekIndex" class="calendar__week">
              <span
                v-for="(day, dayIndex) in week"
                :key="dayIndex"
                class="calendar__day"
                :class="{
                  'calendar__day--muted': !day.isCurrentMonth,
                  'calendar__day--highlighted': day.isHighlighted,
                }"
              >
                {{ day.date }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.calendar-section__date {
  margin: 38px 0 0;
  font-family: font.$heading;
  font-size: clamp(24px, 3.4vw, 36px);
  letter-spacing: 0.22em;
  color: color.$paper-bright;
}

.calendar-section__cta {
  margin-top: 30px;
}

.calendar {
  border: 1px solid color.$line-on-dark;
  padding: clamp(24px, 3vw, 40px);
  background: color.$ink;
  max-width: 440px;
  width: 100%;
  margin-left: auto;

  @media all and (max-width: 900px) {
    margin-left: 0;
  }
}

.calendar__month {
  margin: 0 0 26px;
  font-family: font.$heading;
  font-size: 19px;
  letter-spacing: 0.06em;
  color: color.$paper-bright;
}

.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding-bottom: 14px;
  border-bottom: 1px solid color.$line-on-dark;

  span {
    text-align: center;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: color.$smoke;
  }
}

.calendar__weeks {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.calendar__week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar__day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  font-size: 13px;
  font-weight: 300;
  font-variant-numeric: tabular-nums;
  color: color.$silver;

  &--muted {
    color: rgba(211, 204, 191, 0.22);
  }

  &--highlighted {
    font-family: font.$heading;
    font-size: 16px;
    font-weight: 500;
    color: color.$paper-bright;
    background: color.$wine;
  }
}
</style>
