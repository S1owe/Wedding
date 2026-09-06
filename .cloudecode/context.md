# Свадьба — контекст проекта

## Workflow (важно)
- По любой задаче с изменением кода: сначала составить план изменений (без правки кода) и
  предложить его пользователю. Приступать к реализации только после явного подтверждения.
- Исключение — чисто информационные запросы (объяснить код, ответить на вопрос), где нечего
  подтверждать.

Сайт представляет собой одностраничное SPA приложение (лендинг) приглашение на свадьбу. В нем нет авторизации, а данные с формы сбора данных сохраняются в google sheets.

## Стек и сборка

- Vue 3 (Composition API, `<script setup lang="ts">`) + TypeScript + Vite
- vue-router 4, axios, mitt (шина событий), swiper, vue-advanced-cropper, vue-collapsed
- SCSS (dart-sass, `api: 'modern-compiler'`)
- Пакетный менеджер: pnpm (есть и package-lock.json, но основной — pnpm-lock.yaml)
- Скрипты: `dev` (vite), `build` (`vue-tsc --noEmit && vite build`), `preview`

### Алиасы путей (см. vite.config.ts и tsconfig.json — держать в синхроне)

```
@        -> src
@assets  -> src/assets
@layout  -> src/components/layout
@icons   -> src/components/shared/icons
@ui      -> src/components/shared/ui
```

## Структура src/

Паттерн для фичи среднего размера: `ComponentName.vue` + соседние `composables/` (стейт/логика,
вынесенная из компонента) + `types.ts` + `style/` (частичные scss, подключаемые через `@use`).

## Архитектурные паттерны


### Composables вне сторов (factory-функции)
- Отдельный от IIFE-в-сторе паттерн: composable — это функция-фабрика с `export default`,
  а не `useXxx()`-хук в чистом vue-стиле:
  ```ts
  const dataManagement = () => {
    const showModalExit = ref<boolean>(false);
    emitter.on('someEvent', handler);
    onUnmounted(() => emitter.off('someEvent', handler));
    return { showModalExit, openModal: () => {...} };
  };
  export default dataManagement;
  ```
- Соглашение по имени: composable-файл/функция обычно заканчивается на `Management`
  (`dataManagement`, `chatManagement`, `contentDictionary`+`getTextContent` — но здесь без
  суффикса, это устойчивое исключение). Явные исключения на `useXxx()`: `useDayBonus()`,
  `checkAuth()`, `cookies()` — единичные, не переименовывать существующие под общий паттерн.
- i18n/тексты: `helpers/dictionary/dictionary.ts` — тексты на бэкенде хранятся под числовыми id,
  фронт резолвит через `contentDictionary().getTextContent(id)`, читая из
  `applicationStore.dictionary` (см. также `loadDictionaryFromCacheOrApi` в `applicationStore.ts`
  — словарь кэшируется в localStorage по версии).


### Типы
- Общие API-типы живут в `src/api/types.ts`, сгруппированы в `namespace` по домену
  (`User`, `Unregistered`, `NMarketing`, `NGameSession`, `NEducation` и т.д.).
- Локальные типы фичи — в соседнем `types.ts` рядом с компонентом/стором.
- Соглашение по именованию: `TXxx` — type alias, `IXxx` — interface, `NXxx` — namespace.

### Vue-компоненты
- Всегда `<script setup lang="ts">` (в единичных старых файлах порядок атрибутов может быть
  `<script lang="ts" setup>` — при правках новых файлов ориентироваться на первый вариант).
- Props — типизированный `defineProps<IProps>()` (или `TProps`), почти всегда сразу
  деструктурируется с дефолтами:
  `const { type, isDisabled = false } = defineProps<IProps>();`
  Либо — интерфейс объявляется тут же в компоненте, если он локальный:
  `interface IProps { value?: string } const { value = '' } = defineProps<IProps>();`
- `defineEmits<IEmits>()` (или `TEmits`) с типом эмитов, вынесенным в соседний `types.ts`,
  если используется в нескольких местах, либо объявленным локально.
- Стили — `<style scoped lang="scss">` у всех компонентов, кроме `App.vue`.
- Локальные стили компонента подключаются как партиалы: `@use "./style/имяStyle";`
  (стили вынесены в подпапку `style/` рядом с компонентом).
- Глобальные scss-переменные подключаются с неймспейсом:
  `@use "@/style/variables/color.scss" as color;` — далее использование через `color.$purple_1`
  и т.п. (encoding варьируется — с `.scss` и без, но неймспейс `as color` — устойчивый паттерн).
- Модалки оборачиваются в `ModalOpacityLayout` / `TemplateModalDefault` (общие UI-обёртки
  из `@ui/modals/...`).
- Классы кнопок — утилитарные модификаторы: `btn-size-medium btn-radius-medium btn-color-purple`.
- CSS-классы — BEM (`chat__wrapper`, `modal-default__header`) + модификаторы состояния
  через `_` (`main_is-auth`, `button_disabled`).
- Брейкпоинты не централизованы в общих scss-файлах — задаются `@media` прямо в
  `<style>` каждого компонента (используются повторяющиеся значения:
  1599px — ноутбуки, 1199px — планшеты/включение мобильной навигации,
  700px — запрет масштабирования на не-игровых страницах, 599px — мобильные,
  379px/369px/349px — маленькие телефоны). При добавлении адаптива ориентироваться на эти
  значения, а не придумывать свои.

### Стили
- Цветовые переменные в `style/variables/color.scss`: `$<цвет>_<номер>`, градиенты —
  `$<цвет>_gr_<номер>`, полупрозрачные варианты — `$<цвет>_<номер>_op_<проценты>`.
- CSS-переменные (`:root { --xxx: ... }`) дублируют некоторые градиенты для использования
  вне scss-контекста.

### Комментарии — общий стиль по проекту
- Комментарии пишутся **на русском языке**.
- Однострочные, лаконичные, ставятся прямо над функцией/блоком или как inline-комментарий
  справа от объявления переменной.
- Комментируется НАЗНАЧЕНИЕ (что и зачем), а не механика — не пересказывать код.
- Многострочные/блочные комментарии почти не используются, JSDoc не используется.