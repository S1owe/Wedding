<script setup lang="ts">
import { reactive, ref } from 'vue';
import SectionHeading from '@ui/SectionHeading.vue';
import PlusIcon from '@icons/PlusIcon.vue';
import CloseIcon from '@icons/CloseIcon.vue';
import HeartIcon from '@icons/HeartIcon.vue';
import { RSVP_DEADLINE_LABEL } from '@/data/weddingConfig';
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
  <section v-chapter="'ambient'" class="section rsvp">
    <div v-reveal class="section-panel rsvp-panel">
    <SectionHeading eyebrow="Ждём ответа" title="Подтвердите присутствие" />
    <p class="rsvp__deadline">Пожалуйста, заполните анкету до {{ RSVP_DEADLINE_LABEL }}</p>

    <transition name="fadeMedium" mode="out-in">
      <div v-if="isSubmitted" class="rsvp__thanks soft-card">
        <HeartIcon />
        <p>Спасибо, что вы с нами в этот день ❤️</p>
      </div>

      <form v-else class="rsvp__form soft-card" novalidate @submit.prevent="handleSubmit">
        <div class="rsvp__field">
          <label class="rsvp__label">Ваше имя</label>

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
          <span v-if="errors.guests" class="rsvp__error">Пожалуйста, укажите имя хотя бы одного гостя</span>
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

        <button type="submit" class="rsvp__submit">Отправить анкету</button>
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rsvp-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 680px;
}

.rsvp__deadline {
  margin-top: 16px;
  font-size: 13px;
  letter-spacing: 0.06em;
  color: color.$accent-pink;
}

.rsvp__form,
.rsvp__thanks {
  margin-top: 48px;
  width: 100%;
  max-width: 560px;
}

.rsvp__form {
  padding: 44px 36px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media all and (max-width: 599px) {
    padding: 32px 22px;
  }
}

.rsvp__thanks {
  padding: 64px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
  font-family: font.$heading;
  font-style: italic;
  font-size: 19px;
  color: color.$ink;

  svg {
    font-size: 26px;
    color: color.$accent-pink;
  }
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
  font-family: inherit;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color.$muted-text;
  margin-bottom: 16px;
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
  padding: 12px 4px;
  border: none;
  border-bottom: 1px solid color.$hairline;
  background: transparent;
  border-radius: 0;
  font-family: inherit;
  font-size: 15px;
  color: color.$ink;
  transition: border-color transition.$fast;

  &::placeholder {
    color: rgba(47, 42, 46, 0.32);
  }

  &:focus {
    outline: none;
    border-color: color.$accent-pink;
  }
}

.rsvp__remove-guest {
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: none;
  color: color.$muted-text;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color transition.$fast;

  &:hover {
    color: color.$accent-pink;
  }
}

.rsvp__add-guest {
  align-self: flex-start;
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: none;
  background: none;
  color: color.$sky-blue;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: color.$accent-pink;
  }
}

.rsvp__options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rsvp__option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-radius: 4px;
  border: 1px solid color.$hairline;
  background: transparent;
  font-size: 14px;
  font-weight: 300;
  color: color.$ink;
  cursor: pointer;
  transition: border-color transition.$fast, background transition.$fast;

  &:has(input:checked) {
    border-color: color.$accent-pink;
    background: rgba(233, 55, 113, 0.05);
  }

  input {
    accent-color: color.$accent-pink;
    width: 15px;
    height: 15px;
  }
}

.rsvp__error {
  margin-top: 10px;
  font-size: 12px;
  color: color.$accent-pink;
}

.rsvp__submit {
  margin-top: 8px;
  padding: 16px;
  border: 1px solid color.$accent-pink;
  border-radius: 999px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color.$white;
  background: color.$accent-pink;
  cursor: pointer;
  transition: transform transition.$fast, background transition.$fast, color transition.$fast;

  &:hover {
    transform: translateY(-2px);
  }
}
</style>
