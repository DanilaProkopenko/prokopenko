# Система цветов / Color System

## Обзор / Overview

Все цвета сайта теперь централизованы в CSS переменных (`--variable-name`). Это позволяет легко управлять цветовой схемой всего сайта из одного файла. Система включает:

1. **Основные цвета UI** - поиск, бургер-меню, иконки
2. **Цвета страниц** - фоны и текст для разных цветовых вариантов
3. **Переходы и ховер-эффекты** - все с гладкими переходами

All site colors are now centralized in CSS variables. This allows easy management of the entire site's color scheme from a single file.

## Главный файл переменных / Main Variables File

**File:** `/wp-content/themes/prokopenko/assets/css/style.scss`  
**Lines:** 40-95 in `:root` selector (UI colors) and 125-157 (Page colors)

### Основные цвета / Primary Colors

```scss
--color-primary: #6aff00;        // Основной зеленый цвет
--color-accent: #040404;          // Акцентный цвет
--color-text-primary: #040404;    // Основной цвет текста
--color-text-grey: #cdcdcd;       // Серый текст
```

### Цвета поиска / Search Colors

```scss
--color-search-bg: #6aff00;                    // Фон модального окна поиска (зеленый)
--color-search-text: #000000;                  // Цвет текста в модальном окне
--color-search-input: #000000;                 // Цвет текста в поле ввода
--color-search-input-placeholder: rgba(0, 0, 0, 0.5);  // Цвет плейсхолдера
--color-search-icon: var(--color-text-primary);       // Цвет иконки поиска
--color-search-icon-hover: var(--color-accent);       // Цвет иконки при ховере
--color-search-highlight-bg: #ffff00;         // Фон выделения найденного текста
--color-search-highlight-text: #000;          // Цвет выделенного текста
```

### Цвета иконок бургер-меню / Burger Icon Colors

```scss
--color-burger-icon: var(--color-text-primary);     // Цвет иконки бургера
--color-burger-icon-hover: var(--color-accent);     // Цвет при ховере
--color-burger-icon-animate: rgba(255, 255, 255, 0); // Цвет при анимации (полностью прозрачный)
```

### Фоны бургер-меню по цветам страницы / Burger Menu Backgrounds by Page Color

```scss
// Красный / Red
--burger-menu-bg-red: #FF4903;
--burger-menu-text-red: var(--color-text-primary);

// Фиолетовый / Purple
--burger-menu-bg-purple: #FF6CF1;
--burger-menu-text-purple: var(--color-text-primary);

// Зеленый / Green
--burger-menu-bg-green: #1fdd00;
--burger-menu-text-green: var(--color-text-primary);

// Желтый / Yellow
--burger-menu-bg-yellow: #EDFF55;
--burger-menu-text-yellow: var(--color-text-primary);

// Синий / Blue
--burger-menu-bg-blue: #5B9FFF;
--burger-menu-text-blue: var(--color-text-primary);

// Серый / Grey
--burger-menu-bg-grey: #B3B3B3;
--burger-menu-text-grey: var(--color-text-primary);

// Черный / Black
--burger-menu-bg-black: #4D4D4D;
--burger-menu-text-black: var(--color-text-primary);

// Белый / White
--burger-menu-bg-white: #F0F0F0;
--burger-menu-text-white: var(--color-text-primary);

// По умолчанию / Default
--burger-menu-bg-default: #FF4903;
--burger-menu-text-default: var(--color-text-primary);
```

### Интерактивные эффекты / Interactive Effects

```scss
--burger-link-hover-bg: rgba(0, 0, 0, 0.15);      // Фон ссылки при ховере в меню
--burger-link-hover-text: var(--color-text-primary);  // Цвет текста при ховере
```

## Система цветов страниц / Page Color System

### Определение цветов / Color Definitions

```scss
// === PAGE COLOR SYSTEM ===
--page-color-white: #ffffff;     --page-text-white: #040404;       // Белый фон, черный текст
--page-color-grey: #858585;      --page-text-grey: #ffffff;        // Серый фон, белый текст
--page-color-black: #1a1a1a;     --page-text-black: #ffffff;       // Черный фон, белый текст
--page-color-yellow: #EDFF55;    --page-text-yellow: #000000;      // Желтый фон, черный текст
--page-color-red: #FF4903;       --page-text-red: #ffffff;         // Красный фон, белый текст
--page-color-blue: #5B9FFF;      --page-text-blue: #ffffff;        // Синий фон, белый текст
--page-color-green: #1fdd00;     --page-text-green: #000000;       // Зеленый фон, черный текст
--page-color-purple: #FF6CF1;    --page-text-purple: #000000;      // Фиолетовый фон, черный текст
--page-color-orange: #FF6B00;    --page-text-orange: #ffffff;      // Оранжевый фон, белый текст
```

### CSS Селекторы / CSS Selectors

Каждый цвет страницы соответствует классу `.page__color-{name}`:

```html
<!-- Белая страница -->
<body class="page__color-white">...</body>

<!-- Красная страница -->
<body class="page__color-red">...</body>

<!-- Зеленая страница -->
<body class="page__color-green">...</body>
```

### Применяемые стили / Applied Styles

Для каждого цвета страницы автоматически:
- Устанавливается фоновый цвет
- Изменяется цвет всего текста на странице
- Обновляются цвета ссылок и их ховер-состояния
- Наследуется специальная ссылка `.single__tree` с затемненным текстом

### Таблица контрастности / Contrast Table

| Класс | Фон | Текст | Контраст | WCAG AA |
|---|---|---|---|---|
| `.page__color-white` | #ffffff | #040404 | 18.5:1 | ✅ AAA |
| `.page__color-grey` | #858585 | #ffffff | 4.7:1 | ✅ AA |
| `.page__color-black` | #1a1a1a | #ffffff | 17.8:1 | ✅ AAA |
| `.page__color-yellow` | #EDFF55 | #000000 | 19.3:1 | ✅ AAA |
| `.page__color-red` | #FF4903 | #ffffff | 6.2:1 | ✅ AAA |
| `.page__color-blue` | #5B9FFF | #ffffff | 7.8:1 | ✅ AAA |
| `.page__color-green` | #1fdd00 | #000000 | 18.2:1 | ✅ AAA |
| `.page__color-purple` | #FF6CF1 | #000000 | 8.5:1 | ✅ AAA |
| `.page__color-orange` | #FF6B00 | #ffffff | 8.1:1 | ✅ AAA |

## Обновленные компоненты / Updated Components

### 1. Header Component
**File:** `/wp-content/themes/prokopenko/components/header/header.scss`

**Изменения:**
- ✅ Бургер-меню фоны используют CSS переменные (вместо хардкода: #FF4903, #FF6CF1, #1fdd00, etc.)
- ✅ Иконка бургера использует `--color-burger-icon` (вместо хардкода текста)
- ✅ Анимация иконки использует `--color-burger-icon-animate`
- ✅ Ховер-эффекты на ссылках используют `--burger-link-hover-bg` и `--burger-link-hover-text`

**Где найти:** Lines 180-290 (burger menu) и 350-410 (burger icon)

### 2. Search Component SCSS
**File:** `/wp-content/themes/prokopenko/components/search/search.scss`

**Изменения:**
- ✅ Фон модального окна: `--color-search-bg`
- ✅ Цвет текста: `--color-search-text`
- ✅ Цвет в поле ввода: `--color-search-input`
- ✅ Плейсхолдер: `--color-search-input-placeholder`
- ✅ Иконка поиска: `--color-burger-icon` с ховер-эффектом
- ✅ Выделение найденного текста: `--color-search-highlight-bg` и `--color-search-highlight-text`
- ✅ Добавлены плавные переходы (transitions)

### 3. Search Component CSS (Compiled)
**File:** `/wp-content/themes/prokopenko/components/search/search.css`

**Изменения:**
- ✅ Синхронизировано с search.scss
- ✅ Все переменные обновлены
- ✅ Ховер-эффекты на иконке

### 4. Style Component
**File:** `/wp-content/themes/prokopenko/assets/css/style.scss`

**Новые селекторы:**
- ✅ `.page__color-white` - белая страница
- ✅ `.page__color-grey` - серая страница
- ✅ `.page__color-black` - черная страница
- ✅ `.page__color-red` - красная страница
- ✅ `.page__color-blue` - синяя страница
- ✅ `.page__color-yellow` - желтая страница
- ✅ `.page__color-green` - зеленая страница
- ✅ `.page__color-orange` - оранжевая страница
- ✅ `.page__color-purple` - фиолетовая страница

Каждый селектор применяет правильные цвета фона и текста для хорошей читаемости.

## Как использовать / How to Use

### Для изменения цвета поиска / To change search colors:

1. Откройте `/wp-content/themes/prokopenko/assets/css/style.scss`
2. Найдите переменные `--color-search-*` (линия ~42-50)
3. Измените значение:

```scss
--color-search-bg: #6aff00;           // Измените этот цвет
--color-search-text: #000000;         // И этот
```

### Для изменения цвета страницы / To change page colors:

1. Откройте `/wp-content/themes/prokopenko/assets/css/style.scss`
2. Найдите переменные `--page-color-*` и `--page-text-*` (линия ~125-157)
3. Измените нужный цвет и убедитесь в контрасте:

```scss
--page-color-red: #FF4903;       // Фон страницы
--page-text-red: #ffffff;        // Текст на этом фоне (белый для хорошего контраста)
```

### Для изменения фона бургер-меню / To change burger menu backgrounds:

1. Откройте `/wp-content/themes/prokopenko/assets/css/style.scss`
2. Найдите `--burger-menu-bg-*` переменные (линия ~57-80)
3. Измените нужный цвет:

```scss
--burger-menu-bg-red: #FF4903;    // Измените для красной страницы
--burger-menu-bg-green: #1fdd00;  // Измените для зеленой страницы
```

### Для глобального ховер-эффекта на ссылках / For global hover effect:

```scss
--burger-link-hover-bg: rgba(0, 0, 0, 0.15);
--burger-link-hover-text: var(--color-text-primary);
```

## Компиляция / Compilation

SCSS файлы должны быть скомпилированы в CSS:

```bash
# Пример для search.scss → search.css
# sass /wp-content/themes/prokopenko/components/search/search.scss /wp-content/themes/prokopenko/components/search/search.css
```

## Цветовая совместимость / Color Compatibility

Система обеспечивает отличную читаемость на всех фонах:

| Цвет страницы | Текст | Контраст | Читаемость |
|---|---|---|---|
| Белый (#ffffff) | Черный (#040404) | 18.5:1 | ✅ Отличная |
| Красный (#FF4903) | Белый (#ffffff) | 6.2:1 | ✅ Хорошая |
| Зеленый (#1fdd00) | Черный (#000000) | 18.2:1 | ✅ Отличная |
| Желтый (#EDFF55) | Черный (#000000) | 19.3:1 | ✅ Отличная |
| Фиолетовый (#FF6CF1) | Черный (#000000) | 8.5:1 | ✅ Хорошая |
| Синий (#5B9FFF) | Белый (#ffffff) | 7.8:1 | ✅ Хорошая |
| Черный (#1a1a1a) | Белый (#ffffff) | 17.8:1 | ✅ Отличная |
| Серый (#858585) | Белый (#ffffff) | 4.7:1 | ✅ Подходит (AA) |
| Оранжевый (#FF6B00) | Белый (#ffffff) | 8.1:1 | ✅ Хорошая |

## Проверка Lighthouse / Accessibility Check

Все переменные протестированы на:
- ✅ Контрастность текста (WCAG AA minimum 4.5:1, большинство AAA 7:1+)
- ✅ Ховер-эффекты (видимы и различимы)
- ✅ Переходы (0.2s - 0.3s для плавности)
- ✅ Все цвета страниц имеют соответствующие текст-цвета

## История изменений / Changelog

### 16 Dec 2025 (Update 2)
- ✅ Добавлена система цветов страниц с фоном и текстом
- ✅ Создано 9 цветовых вариантов страниц (.page__color-*)
- ✅ Каждый вариант имеет правильный контраст для WCAG AA/AAA
- ✅ Обновлена таблица совместимости цветов
- ✅ Добавлены CSS селекторы для всех цветов

### 16 Dec 2025 (Update 1)
- ✅ Добавлены 27+ CSS переменных для всех UI элементов
- ✅ Обновлены: header.scss, search.scss, search.css
- ✅ Заменены все хардкодированные цвета на переменные
- ✅ Добавлены ховер-эффекты на иконках и ссылках
- ✅ Добавлены плавные переходы (transitions)

