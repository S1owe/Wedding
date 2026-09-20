<script setup lang="ts">
import { computed } from 'vue';
import SectionHeading from '@ui/SectionHeading.vue';
import HeartIcon from '@icons/HeartIcon.vue';
import type { CalendarDay } from '@/types/wedding';
import {
  CALENDAR_MONTH_NAME,
  WEEKDAY_LABELS,
  WEDDING_DATE_LABEL,
  WEDDING_DAY,
  WEDDING_MONTH_INDEX,
  WEDDING_YEAR,
} from '@/data/weddingConfig';

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
  <section v-chapter="'love'" class="section calendar-section">
    <div class="section-panel calendar-panel">
      <SectionHeading eyebrow="Отметьте в календаре" title="Дата свадьбы" />

      <div class="calendar-layout">
        <div v-reveal class="calendar">
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
                <HeartIcon v-if="day.isHighlighted" class="calendar__heart" />
                <span class="calendar__day-number">{{ day.date }}</span>
              </span>
            </div>
          </div>
        </div>

        <div v-reveal="120" class="calendar-highlight">
          <p class="calendar-highlight__date">{{ WEDDING_DATE_LABEL }}</p>
          <p class="calendar-highlight__caption">В этот день мы скажем ДА</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;

.calendar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calendar-layout {
  margin-top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64px;
  flex-wrap: wrap;
}

.calendar {
  width: 320px;
}

.calendar__month {
  text-align: center;
  font-family: font.$heading;
  font-style: italic;
  font-size: 19px;
  color: color.$ink;
  margin: 0 0 20px;
}

.calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  margin-bottom: 10px;

  span {
    text-align: center;
    font-size: 11px;
    letter-spacing: 0.06em;
    color: color.$muted-text;
    font-weight: 600;
  }
}

.calendar__weeks {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.calendar__week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
}

.calendar__day {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  font-size: 13.5px;
  font-weight: 300;
  color: color.$ink;

  &--muted {
    color: rgba(47, 42, 46, 0.24);
  }

  &--highlighted {
    font-weight: 700;
  }
}

.calendar__day-number {
  position: relative;
  z-index: 1;
}

.calendar__day--highlighted .calendar__day-number {
  color: color.$white;
}

.calendar__heart {
  position: absolute;
  top: 55%;
  left: 50%;
  z-index: 0;
  font-size: 44px;
  line-height: 0;
  color: color.$accent-pink;
  filter: drop-shadow(0 4px 10px rgba(233, 55, 113, 0.4));
  transform: translate(-50%, -50%) scale(1);
  animation: heartPulse 2.4s ease-in-out infinite;
}

.calendar-highlight {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.calendar-highlight__date {
  font-family: font.$heading;
  font-style: italic;
  font-size: clamp(30px, 5vw, 44px);
  color: color.$ink;
  margin: 0;
}

.calendar-highlight__caption {
  margin-top: 14px;
  font-size: 13.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color.$muted-text;
}

@keyframes heartPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.12); }
}

@media (prefers-reduced-motion: reduce) {
  .calendar__heart {
    animation: none;
  }
}
</style>
