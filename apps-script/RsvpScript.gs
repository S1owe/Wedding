/**
 * Apps Script backend для RSVP-формы.
 *
 * Установка:
 * 1. Создайте Google Таблицу, откройте Extensions -> Apps Script.
 * 2. Вставьте этот файл целиком (замените Code.gs).
 * 3. Выполните функцию setup() один раз вручную (меню "Выполнить") —
 *    она создаст лист "RSVP" с заголовками и сохранит секрет в свойствах
 *    скрипта. Введите тот же секрет, что в .env.local (VITE_RSVP_SECRET),
 *    в константу SECRET_VALUE ниже перед запуском.
 * 4. Deploy -> New deployment -> Type: Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    (без "Anyone", форма с незалогиненных браузеров не сможет отправлять
 *    запросы; сама таблица при этом остаётся закрытой — доступ есть только
 *    у скрипта, выполняющегося от вашего имени).
 * 5. Скопируйте выданный URL (.../exec) в VITE_RSVP_SCRIPT_URL.
 * 6. При любом изменении кода нужно сделать новый деплой (Manage deployments
 *    -> Edit -> New version), просто сохранение файла URL не обновляет.
 */

const SHEET_NAME = 'RSVP';
const SECRET_VALUE = 'ЗАМЕНИТЕ_НА_СВОЙ_СЕКРЕТ'; // должно совпадать с VITE_RSVP_SECRET

const ATTENDANCE_VALUES = ['yes', 'no'];
const TRANSFER_VALUES = ['yes', 'no', 'canBringSomeone'];
const ACCOMMODATION_VALUES = ['yes', 'no'];

const MAX_GUESTS = 10;
const MAX_NAME_LENGTH = 100;

/** Выполнить один раз вручную при установке. */
function setup() {
  PropertiesService.getScriptProperties().setProperty('RSVP_SECRET', SECRET_VALUE);
  getSheet_();
}

function doPost(e) {
  return respond_(handlePost_(e));
}

/** Проверка, что веб-приложение развёрнуто и отвечает. */
function doGet() {
  return respond_({ ok: true, status: 'RSVP endpoint is alive' });
}

function handlePost_(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return { ok: false, error: 'Некорректный JSON' };
  }

  const expectedSecret = PropertiesService.getScriptProperties().getProperty('RSVP_SECRET');
  if (!expectedSecret || payload.secret !== expectedSecret) {
    return { ok: false, error: 'Доступ запрещён' };
  }

  const validationError = validatePayload_(payload);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  appendRow_(payload);

  return { ok: true };
}

function validatePayload_(payload) {
  if (!Array.isArray(payload.guests) || payload.guests.length === 0) {
    return 'Не указан ни один гость';
  }
  if (payload.guests.length > MAX_GUESTS) {
    return 'Слишком много гостей';
  }
  for (const name of payload.guests) {
    if (typeof name !== 'string' || !name.trim() || name.length > MAX_NAME_LENGTH) {
      return 'Некорректное имя гостя';
    }
  }
  if (ATTENDANCE_VALUES.indexOf(payload.attendance) === -1) {
    return 'Некорректное значение attendance';
  }
  if (TRANSFER_VALUES.indexOf(payload.transfer) === -1) {
    return 'Некорректное значение transfer';
  }
  if (ACCOMMODATION_VALUES.indexOf(payload.accommodation) === -1) {
    return 'Некорректное значение accommodation';
  }
  return null;
}

/**
 * LockService нужен, т.к. несколько гостей могут отправить форму
 * одновременно — без лока появляется риск гонки при добавлении строк.
 */
function appendRow_(payload) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      sanitizeCell_(payload.guests.join('; ')),
      payload.guests.length,
      payload.attendance,
      payload.transfer,
      payload.accommodation,
    ]);
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(['Дата', 'Гости', 'Кол-во гостей', 'Присутствие', 'Трансфер', 'Проживание']);
  }
  return sheet;
}

/** Защита от формульной инъекции при открытии таблицы (=, +, -, @ в начале значения). */
function sanitizeCell_(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function respond_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
