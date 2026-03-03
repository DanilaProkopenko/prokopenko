# Компонент Filter Bar - Примеры использования

Компонент `filter-bar` предоставляет гибкую систему фильтрации категорий для любых блоков с карточками. Все селекторы и классы можно переопределить через конфигурацию.

## Основной пример (section__post-list__big)

```javascript
// blocks/section__post-list__big/_index.js
initFilterBar({
    containerId: 'postslist',
    containerSelector: '.section__post-list__big',
    cardSelector: '.post-card__big',
    filterMode: 'single'
    // Остальные параметры используют значения по умолчанию
});
```

## Пример для другого блока (section__works-grid)

Если у блока похожая структура, но другие селекторы:

```javascript
// blocks/section__works-grid/_index.js
const initWorksGridFilter = () => {
    if (typeof window.initFilterBar === 'undefined') {
        setTimeout(initWorksGridFilter, 100);
        return;
    }

    initFilterBar({
        // Основные селекторы
        containerId: 'workslist',                      // ID контейнера
        containerSelector: '.section__works-grid',       // Селектор блока
        cardSelector: '.post-card__works-grid',          // Селектор карточек
        filterMode: 'multi',                              // Режим: 'single' или 'multi'
        
        // Все остальные параметры используют значения по умолчанию,
        // т.к. структура фильтра одна и та же
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorksGridFilter);
} else {
    initWorksGridFilter();
}
```

## Полный пример с кастомными классами

Если у блока используются свои классы для элементов:

```javascript
// blocks/custom-block/_index.js
const initCustomFilter = () => {
    if (typeof window.initFilterBar === 'undefined') {
        setTimeout(initCustomFilter, 100);
        return;
    }

    initFilterBar({
        // Основные селекторы контейнеров
        containerId: 'custom-items',
        containerSelector: '.custom-grid',
        cardSelector: '.custom-item-card',
        filterMode: 'single',
        
        // Классы компонента фильтра
        filterBarClass: '.custom-filter',          // Селектор контейнера фильтра
        filterBtnClass: 'btn-filter',              // Класс кнопок
        dynamicCategoryClass: 'btn-category',      // Класс динамических кнопок
        moreButtonClass: 'btn-more',               // Класс кнопки "ещё"
        categoryHiddenClass: 'is-hidden',          // Класс скрытых кнопок
        
        // Классы элементов в карточках
        categoryElementClass: '.item-tags',        // Селектор элемента с категориями
        cardHiddenClass: 'is-invisible',           // Класс скрытых карточек
        activeClass: 'is-active',                  // Класс активных элементов
        animateFadeClass: 'fade-in'                // Класс анимации
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomFilter);
} else {
    initCustomFilter();
}
```

## Требования к структуре HTML

Компонент требует следующей структуры:

```html
<div id="postslist">
    <div class="section__post-list__big">
        <!-- Контейнер фильтра -->
        <div class="filter-bar">
            <button class="filter-btn" data-filter="all">Все</button>
            <!-- Динамические кнопки будут добавлены сюда -->
        </div>
        
        <!-- Карточки -->
        <div class="post-card__big">
            <div class="post-category">
                <a href="#" data-catslug="category-slug" data-catname="Название категории">
                    Название категории
                </a>
            </div>
            <!-- Остальное содержимое карточки -->
        </div>
    </div>
</div>
```

## Параметры конфигурации

### Основные селекторы контейнеров
- **containerId** (строка): ID содержащего все элементы контейнера (по умолчанию: `'postslist'`)
- **containerSelector** (строка): CSS селектор блока-контейнера (по умолчанию: `'.section__post-list__big'`)
- **cardSelector** (строка): CSS селектор для карточек (по умолчанию: `'.post-card__big'`)
- **filterMode** (строка): Режим фильтрации - `'single'` (один фильтр) или `'multi'` (несколько) (по умолчанию: `'single'`)

### Классы компонента фильтра
- **filterBarClass** (строка): Селектор контейнера фильтра (по умолчанию: `'.filter-bar'`)
- **filterBtnClass** (строка): Класс для кнопок фильтра (по умолчанию: `'filter-btn'`)
- **dynamicCategoryClass** (строка): Класс для динамически добавляемых кнопок (по умолчанию: `'dynamic-category'`)
- **moreButtonClass** (строка): Класс для кнопки "показать ещё" (по умолчанию: `'more-btn'`)
- **categoryHiddenClass** (строка): Класс для скрытых кнопок категорий (по умолчанию: `'category-hidden'`)

### Классы элементов в карточках
- **categoryElementClass** (строка): Селектор элемента с категориями в карточке (по умолчанию: `'.post-category'`)
- **cardHiddenClass** (строка): Класс для скрытых карточек (по умолчанию: `'card-hidden'`)
- **activeClass** (строка): Класс для активных кнопок/карточек (по умолчанию: `'active'`)
- **animateFadeClass** (строка): Класс для fade-in анимации (по умолчанию: `'animate-fade'`)

## Как это работает

1. **Инициализация**: Компонент ищет контейнер по ID, затем находит блок по селектору
2. **Извлечение категорий**: Сканирует все карточки и извлекает категории из атрибутов `data-catslug` и `data-catname`
3. **Создание кнопок**: Динамически создает кнопки для каждой уникальной категории
4. **Фильтрация**: При клике на кнопку открывает/закрывает карточки в зависимости от выбранного фильтра
5. **Адаптивность**: На мобильных устройствах скрывает "лишние" кнопки и выставляет горизонтальный скролл

## Изменение стилей

Если вы используете свои классы, обновите соответствующие стили в SCSS:

```scss
// Если вы используете .btn-filter вместо .filter-bar
.btn-filter {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    
    .btn-filter {  // Селектор кнопок
        /* стили кнопки */
    }
    
    .btn-category {  // Динамические кнопки
        /* стили категории */
    }
    
    .is-hidden {  // Скрытые кнопки
        display: none;
    }
}
```
