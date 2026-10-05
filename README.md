# Свадебный лендинг

Сайт-приглашение на свадьбу. Содержит: программу дня, дресс-код, таймлайн, FAQ и обратный отсчёт до события.

## Технологии

- Vue 3 (Composition API, `<script setup>`)
- TypeScript
- Vite
- Pinia
- Vue Router
- SCSS
- Swiper, anime.js, vue-advanced-cropper, vue-collapsed

## Установка и запуск

```bash
npm install
npm run dev
```

Дев-сервер поднимается на `http://localhost:8010`.

## Скрипты

- `npm run dev` — запуск дев-сервера
- `npm run build` — проверка типов (`vue-tsc`) и сборка продакшен-бандла
- `npm run preview` — локальный просмотр собранного билда

## Структура проекта

```
src/
  app/                 корневой компонент приложения
  assets/              шрифты, изображения
  components/
    layout/             компоновка страницы (лоадер и т.п.)
    pages/home/         секции главной страницы (Hero и др.)
    shared/
      icons/            SVG-иконки
      ui/               переиспользуемые UI-компоненты
  composables/          переиспользуемая логика (например, обратный отсчёт)
  data/                 контентные данные: дресс-код, FAQ, таймлайн, факты о месте, конфиг свадьбы
  directives/           кастомные директивы Vue
  router/               маршрутизация
  style/                глобальные стили, шрифты, переменные SCSS
  types/                общие TypeScript-типы
```

Алиасы путей (`vite.config.ts`): `@` → `src`, `@assets` → `src/assets`, `@layout`, `@icons`, `@ui`.

Настройки самой свадьбы (дата, место, имена и т.д.) редактируются в `src/data/weddingConfig.ts`.
