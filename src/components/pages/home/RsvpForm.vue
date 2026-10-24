<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
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
  { value: 'canBringSomeone', label: 'Буду на своей и могу кого-то захватить :)' },
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

const isSubmitted = ref(false);
const showThanksModal = ref(false);

const closeThanksModal = () => {
  showThanksModal.value = false;
};

const handleModalKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && showThanksModal.value) {
    closeThanksModal();
  }
};

onMounted(() => window.addEventListener('keydown', handleModalKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleModalKeydown));

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
  showThanksModal.value = true;
};
</script>

<template>
  <section id="rsvp" class="band band--blush rsvp">
    <span class="rsvp__arc rsvp__arc--left" aria-hidden="true" />
    <span class="rsvp__arc rsvp__arc--right" aria-hidden="true" />

    <div class="shell rsvp__shell">
      <ChapterMark index="09" label="Ваш ответ" />

      <div class="rsvp__body">
        <header class="rsvp__intro">
          <h2 v-reveal class="display">Будете ли вы частью<br>нашей истории?</h2>
          <p v-reveal="80" class="rsvp__deadline">
            Пожалуйста, заполните анкету до {{ RSVP_DEADLINE_LONG }}.
          </p>
          <p v-reveal="120" class="rsvp__micro">Это займёт около двух минут</p>
        </header>

        <form v-reveal="160" class="rsvp__form" novalidate @submit.prevent="handleSubmit">
          <div class="rsvp__field">
            <span class="rsvp__label">Ваше имя</span>

            <transition-group name="list" tag="div" class="rsvp__guests">
              <div v-for="(guest, index) in formState.guests" :key="guest.id" class="rsvp__guest-row">
                <input
                  v-model="guest.name"
                  type="text"
                  class="rsvp__input"
                  :placeholder="index === 0 ? 'Имя и фамилия' : 'Имя гостя'"
                  :disabled="isSubmitted"
                >
                <button
                  v-if="formState.guests.length > 1"
                  type="button"
                  class="rsvp__remove-guest"
                  aria-label="Удалить гостя"
                  :disabled="isSubmitted"
                  @click="removeGuest(guest.id)"
                >
                  <CloseIcon />
                </button>
              </div>
            </transition-group>

            <button type="button" class="rsvp__add-guest" :disabled="isSubmitted" @click="addGuest">
              <PlusIcon /> Добавить гостя
            </button>
            <span v-if="errors.guests" class="rsvp__error">
              Пожалуйста, укажите имя хотя бы одного гостя
            </span>
          </div>

          <fieldset class="rsvp__field" :disabled="isSubmitted">
            <legend class="rsvp__label">Вы сможете присутствовать?</legend>
            <div class="rsvp__options">
              <label v-for="option in attendanceOptions" :key="option.value" class="rsvp__option">
                <input v-model="formState.attendance" type="radio" name="attendance" :value="option.value">
                <span>{{ option.label }}</span>
              </label>
            </div>
            <span v-if="errors.attendance" class="rsvp__error">Выберите один из вариантов</span>
          </fieldset>

          <fieldset class="rsvp__field" :disabled="isSubmitted">
            <legend class="rsvp__label">Вам нужен трансфер в рамках мероприятия?</legend>
            <div class="rsvp__options">
              <label v-for="option in transferOptions" :key="option.value" class="rsvp__option">
                <input v-model="formState.transfer" type="radio" name="transfer" :value="option.value">
                <span>{{ option.label }}</span>
              </label>
            </div>
            <span v-if="errors.transfer" class="rsvp__error">Выберите один из вариантов</span>
          </fieldset>

          <fieldset class="rsvp__field" :disabled="isSubmitted">
            <legend class="rsvp__label">Вам нужно проживание?</legend>
            <div class="rsvp__options">
              <label v-for="option in accommodationOptions" :key="option.value" class="rsvp__option">
                <input v-model="formState.accommodation" type="radio" name="accommodation" :value="option.value">
                <span>{{ option.label }}</span>
              </label>
            </div>
            <span v-if="errors.accommodation" class="rsvp__error">Выберите один из вариантов</span>
          </fieldset>

          <button v-if="!isSubmitted" type="submit" class="btn btn--solid rsvp__submit">
            Отправить анкету
            <ArrowRightIcon />
          </button>
          <p v-else class="rsvp__submitted-note">
            <HeartIcon class="rsvp__submitted-icon" />
            Спасибо, мы получили ваш ответ и очень ждём встречи
          </p>
        </form>
      </div>
    </div>

    <Teleport to="body">
      <transition name="fadeFast">
        <div v-if="showThanksModal" class="rsvp__modal" @click="closeThanksModal">
          <div class="rsvp__modal-panel" @click.stop>
            <button
              type="button"
              class="rsvp__modal-close"
              aria-label="Закрыть"
              @click="closeThanksModal"
            >
              <CloseIcon />
            </button>
            <div class="rsvp__thanks">
              <HeartIcon class="rsvp__thanks-icon" />
              <p class="display display--small rsvp__thanks-header">Спасибо, что вы с нами</p>
              <p class="lede rsvp__thanks-note">Мы получили ваш ответ и очень ждём встречи</p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
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
  border: 1px solid rgba(63, 54, 64, 0.08);
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

.rsvp__thanks {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: clamp(12px, 4vw, 48px) 0;
}

.rsvp__intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.rsvp__deadline {
  margin: 24px 0 0;
  font-size: 13.5px;
  color: color.$body-text;
}

.rsvp__micro {
  margin: 14px 0 0;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: color.$soft-text;
}

.rsvp__thanks-icon {
  width: 160px;
  height: auto;
  color: color.$accent-soft;
  margin-bottom: 26px;

  @media all and (max-width: 520px) {
    width: 120px;
    margin-bottom: 16px;
  }
}

.rsvp__thanks-header {
  font-size: 42px;
  max-width: 300px;

  @media all and (max-width: 520px) {
    font-size: 32px;
    max-width: 200px;
  }
}

.rsvp__thanks-note {
  margin-left: auto;
  margin-right: auto;
  font-size: 18px;

  @media all and (max-width: 520px) {
    font-size: 16px;
    margin: 16px 0 0;
    max-width: 250px;
  }
}

.rsvp__form {
  width: 100%;
  max-width: 620px;
  margin: clamp(40px, 6vw, 64px) auto 0;
  padding: clamp(28px, 4vw, 48px);
  border: 1px solid color.$line;
  background: color.$cream;
  display: flex;
  flex-direction: column;
  gap: 34px;
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
  color: color.$soft-text;
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
  padding: 14px 16px;
  border: none;
  border-bottom: 1px solid color.$line;
  background: transparent;
  border-radius: 0;
  font-family: inherit;
  font-size: 15px;
  color: color.$ink;
  transition: border-color transition.$fast;

  &::placeholder {
    color: rgba(128, 117, 132, 0.7);
  }

  &:focus {
    outline: none;
    border-color: color.$accent;
  }

  &:disabled {
    background-color: color.$disabled-bg;
    color: color.$soft-text;
    cursor: default;
  }
}

.rsvp__remove-guest {
  flex: none;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  color: color.$soft-text;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color transition.$fast;

  &:hover {
    color: color.$accent;
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;

    &:hover {
      color: color.$soft-text;
    }
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
  color: color.$accent;
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
    color: color.$ink;
  }

  &:disabled {
    cursor: default;
    opacity: 0.4;

    &:hover {
      color: color.$accent;
    }
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
  border: 1px solid color.$line;
  border-radius: 2px;
  font-size: 14px;
  color: color.$body-text;
  cursor: pointer;
  transition: border-color transition.$fast, background transition.$fast, color transition.$fast;

  &:has(input:checked) {
    border-color: color.$accent-soft;
    background: rgba(140, 84, 100, 0.04);
    color: color.$ink;
  }

  &:has(input:disabled) {
    cursor: default;
    border-color: color.$line;
    background: color.$disabled-bg;
    color: color.$soft-text;
  }

  &:has(input:checked):has(input:disabled) {
    border-color: color.$line;
    color: color.$ink;
  }

  input {
    accent-color: color.$accent;
    width: 15px;
    height: 15px;
    flex: none;

    &:disabled {
      cursor: default;
    }
  }
}

.rsvp__error {
  margin-top: 12px;
  font-size: 12px;
  color: color.$accent;
}

.rsvp__submit {
  align-self: flex-start;
}

.rsvp__submitted-note {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: color.$body-text;
  margin: 0;
}

.rsvp__submitted-icon {
  flex: none;
  font-size: 18px;
  color: color.$accent-soft;
}

.rsvp__modal {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(63, 54, 64, 0.45);
}

.rsvp__modal-panel {
  position: relative;
  width: 100%;
  max-width: 480px;
  max-height: 100%;
  overflow-y: auto;
  padding: 50px 40px;
  border: 1px solid color.$line;
  background: color.$cream;

  @media all and (max-width: 520px) {
    padding: 42px 26px;
  }
}

.rsvp__modal-close {
  position: absolute;
  top: 24px;
  right: 24px;
  border: none;
  background: none;
  color: color.$soft-text;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color transition.$fast;

  :deep(svg) {
    width: 32px;
    height: auto;
  }

  &:hover {
    color: color.$accent;
  }

  @media all and (max-width: 520px) {
    top: 16px;
    right: 16px;

    :deep(svg) {
      width: 24px;
      height: auto;
    }
  }
}
</style>
