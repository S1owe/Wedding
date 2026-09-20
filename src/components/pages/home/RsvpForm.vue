<script setup lang="ts">
import { reactive, ref } from 'vue';
import ChapterMark from '@ui/ChapterMark.vue';
import PlusIcon from '@icons/PlusIcon.vue';
import CloseIcon from '@icons/CloseIcon.vue';
import ArrowRightIcon from '@icons/ArrowRightIcon.vue';
import HeartIcon from '@icons/HeartIcon.vue';
import { RSVP_DEADLINE_LONG } from '@/data/weddingConfig';
import type {
  AccommodationAnswer,
  AttendanceAnswer,
  RsvpFormErrors,
  RsvpFormState,
  TransferAnswer,
} from '@/types/wedding';

const attendanceOptions: { value: AttendanceAnswer; label: string }[] = [
  { value: 'yes', label: 'Да, буду с удовольствием' },
  { value: 'no', label: 'К сожалению, не смогу' },
];

const transferOptions: { value: TransferAnswer; label: string }[] = [
  { value: 'yes', label: 'Да' },
  { value: 'no', label: 'Нет' },
  { value: 'canBringSomeone', label: 'Нет, но могу захватить кого-то' },
];

const accommodationOptions: { value: AccommodationAnswer; label: string }[] = [
  { value: 'yes', label: 'Да' },
  { value: 'no', label: 'Нет' },
];

let nextGuestId = 2;

const formState = reactive<RsvpFormState>({
  guests: [{ id: 1, name: '' }],
  attendance: null,
  transfer: null,
  accommodation: null,
});

const errors = reactive<RsvpFormErrors>({
  guests: false,
  attendance: false,
  transfer: false,
  accommodation: false,
});

const isFormOpen = ref(false);
const isSubmitted = ref(false);

const addGuest = () => {
  formState.guests.push({ id: nextGuestId, name: '' });
  nextGuestId += 1;
};

const removeGuest = (id: number) => {
  formState.guests = formState.guests.filter((guest) => guest.id !== id);
};

const validate = (): boolean => {
  errors.guests = !formState.guests.some((guest) => guest.name.trim().length > 0);
  errors.attendance = formState.attendance === null;
  errors.transfer = formState.transfer === null;
  errors.accommodation = formState.accommodation === null;

  return !errors.guests && !errors.attendance && !errors.transfer && !errors.accommodation;
};

const handleSubmit = () => {
  if (!validate()) return;
  isSubmitted.value = true;
};
</script>

<template>
  <section id="rsvp" class="band band--ink rsvp">
    <span class="rsvp__arc rsvp__arc--left" aria-hidden="true" />
    <span class="rsvp__arc rsvp__arc--right" aria-hidden="true" />

    <div class="shell rsvp__shell">
      <ChapterMark index="09" label="Ваш ответ" />

      <transition name="fadeMedium" mode="out-in">
        <div v-if="isSubmitted" key="thanks" class="rsvp__thanks">
          <HeartIcon class="rsvp__thanks-icon" />
          <p class="display display--small">Спасибо, что вы с нами.</p>
          <p class="lede rsvp__thanks-note">Мы получили ваш ответ и очень ждём встречи.</p>
        </div>

        <div v-else-if="!isFormOpen" key="cta" class="rsvp__cta">
          <h2 v-reveal class="display rsvp__cta-title">Вы будете<br>в этом кадре?</h2>
          <p v-reveal="80" class="rsvp__deadline">
            Пожалуйста, заполните анкету до {{ RSVP_DEADLINE_LONG }}.
          </p>

          <button
            v-reveal="140"
            type="button"
            class="btn btn--solid rsvp__open"
            @click="isFormOpen = true"
          >
            Заполнить анкету
            <ArrowRightIcon />
          </button>

          <p v-reveal="180" class="rsvp__micro">Это займёт около двух минут</p>
        </div>

        <form v-else key="form" class="rsvp__form" novalidate @submit.prevent="handleSubmit">
          <header class="rsvp__form-head">
            <h2 class="display display--small">Анкета гостя</h2>
            <p class="rsvp__deadline rsvp__deadline--inline">до {{ RSVP_DEADLINE_LONG }}</p>
          </header>

          <div class="rsvp__field">
            <span class="rsvp__label">Ваше имя</span>

            <transition-group name="list" tag="div" class="rsvp__guests">
              <div v-for="(guest, index) in formState.guests" :key="guest.id" class="rsvp__guest-row">
                <input
                  v-model="guest.name"
                  type="text"
                  class="rsvp__input"
                  :placeholder="index === 0 ? 'Имя и фамилия' : 'Имя гостя'"
                >
                <button
                  v-if="formState.guests.length > 1"
                  type="button"
                  class="rsvp__remove-guest"
                  aria-label="Удалить гостя"
                  @click="removeGuest(guest.id)"
                >
                  <CloseIcon />
                </button>
              </div>
            </transition-group>

            <button type="button" class="rsvp__add-guest" @click="addGuest">
              <PlusIcon /> Добавить гостя
            </button>
            <span v-if="errors.guests" class="rsvp__error">
              Пожалуйста, укажите имя хотя бы одного гостя
            </span>
          </div>

          <fieldset class="rsvp__field">
            <legend class="rsvp__label">Вы сможете присутствовать?</legend>
            <div class="rsvp__options">
              <label v-for="option in attendanceOptions" :key="option.value" class="rsvp__option">
                <input v-model="formState.attendance" type="radio" name="attendance" :value="option.value">
                <span>{{ option.label }}</span>
              </label>
            </div>
            <span v-if="errors.attendance" class="rsvp__error">Выберите один из вариантов</span>
          </fieldset>

          <fieldset class="rsvp__field">
            <legend class="rsvp__label">Вам нужен трансфер?</legend>
            <div class="rsvp__options">
              <label v-for="option in transferOptions" :key="option.value" class="rsvp__option">
                <input v-model="formState.transfer" type="radio" name="transfer" :value="option.value">
                <span>{{ option.label }}</span>
              </label>
            </div>
            <span v-if="errors.transfer" class="rsvp__error">Выберите один из вариантов</span>
          </fieldset>

          <fieldset class="rsvp__field">
            <legend class="rsvp__label">Вам нужно проживание?</legend>
            <div class="rsvp__options">
              <label v-for="option in accommodationOptions" :key="option.value" class="rsvp__option">
                <input v-model="formState.accommodation" type="radio" name="accommodation" :value="option.value">
                <span>{{ option.label }}</span>
              </label>
            </div>
            <span v-if="errors.accommodation" class="rsvp__error">Выберите один из вариантов</span>
          </fieldset>

          <button type="submit" class="btn btn--solid rsvp__submit">
            Отправить анкету
            <ArrowRightIcon />
          </button>
        </form>
      </transition>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/style/variables/color.scss" as color;
@use "@/style/variables/font.scss" as font;
@use "@/style/variables/transition.scss" as transition;

.rsvp {
  position: relative;
  overflow: hidden;
}

// Две широкие дуги по углам — единственная декорация тёмной полосы.
.rsvp__arc {
  position: absolute;
  width: 62vw;
  height: 62vw;
  max-width: 760px;
  max-height: 760px;
  border-radius: 50%;
  border: 1px solid rgba(221, 214, 201, 0.12);
  pointer-events: none;

  &--left {
    top: -22%;
    left: -26%;
  }

  &--right {
    bottom: -30%;
    right: -24%;
  }
}

.rsvp__shell {
  position: relative;
  z-index: 1;
}

.rsvp__cta,
.rsvp__thanks {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(12px, 4vw, 48px) 0;
}

.rsvp__cta-title {
  color: color.$paper-bright;
}

.rsvp__deadline {
  margin: 24px 0 0;
  font-size: 13.5px;
  color: color.$smoke;
}

.rsvp__open {
  margin-top: 30px;
}

.rsvp__micro {
  margin: 18px 0 0;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: rgba(141, 140, 146, 0.75);
}

.rsvp__thanks-icon {
  font-size: 22px;
  color: color.$wine-bright;
  margin-bottom: 26px;
}

.rsvp__thanks .display--small {
  color: color.$paper-bright;
}

.rsvp__thanks-note {
  margin-left: auto;
  margin-right: auto;
}

.rsvp__form {
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  padding: clamp(28px, 4vw, 48px);
  border: 1px solid color.$line-on-dark;
  background: color.$ink-soft;
  display: flex;
  flex-direction: column;
  gap: 34px;
}

.rsvp__form-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 26px;
  border-bottom: 1px solid color.$line-on-dark;

  .display--small {
    color: color.$paper-bright;
  }
}

.rsvp__deadline--inline {
  margin: 0;
  font-size: 9.5px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.rsvp__field {
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.rsvp__label {
  padding: 0;
  font-family: font.$body;
  font-weight: 600;
  font-size: 9.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: color.$smoke;
  margin-bottom: 18px;
}

.rsvp__guests {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rsvp__guest-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rsvp__input {
  flex: 1;
  min-width: 0;
  padding: 13px 2px;
  border: none;
  border-bottom: 1px solid color.$line-on-dark;
  background: transparent;
  border-radius: 0;
  font-family: inherit;
  font-size: 15px;
  color: color.$paper-bright;
  transition: border-color transition.$fast;

  &::placeholder {
    color: rgba(141, 140, 146, 0.6);
  }

  &:focus {
    outline: none;
    border-color: color.$wine-bright;
  }
}

.rsvp__remove-guest {
  flex: none;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: color.$smoke;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color transition.$fast;

  &:hover {
    color: color.$wine-bright;
  }
}

.rsvp__add-guest {
  align-self: flex-start;
  margin-top: 16px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  border: none;
  background: none;
  padding: 0;
  color: color.$silver;
  font-family: inherit;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color transition.$fast;

  svg {
    font-size: 13px;
  }

  &:hover {
    color: color.$paper-bright;
  }
}

.rsvp__options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rsvp__option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid color.$line-on-dark;
  border-radius: 2px;
  font-size: 14px;
  color: color.$silver;
  cursor: pointer;
  transition: border-color transition.$fast, background transition.$fast, color transition.$fast;

  &:has(input:checked) {
    border-color: color.$wine-bright;
    background: rgba(162, 47, 64, 0.12);
    color: color.$paper-bright;
  }

  input {
    // Нативные радио на тёмном фоне иначе рисуются белым «залитым» кружком
    // и выглядят как уже выбранные.
    color-scheme: dark;
    accent-color: color.$wine-bright;
    width: 15px;
    height: 15px;
    flex: none;
  }
}

.rsvp__error {
  margin-top: 12px;
  font-size: 12px;
  color: color.$wine-bright;
}

.rsvp__submit {
  align-self: flex-start;
}
</style>
