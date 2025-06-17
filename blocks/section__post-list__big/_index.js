const initBlockTemplate = () => {
    const postList = document.getElementById('postslist');
    const container = postList.querySelector('.section__post-list__big');
    const cards = container.querySelectorAll('.post-card__big');

    // Маппинг слагов категорий (латиница) → названий (кириллица)
    const categoryMap = {};
    const categoryLabels = {};

    // Извлекаем категории из карточек
    cards.forEach(card => {
        const categoriesEl = card.querySelector('.post-category');
        if (!categoriesEl) return;

        const links = categoriesEl.querySelectorAll('a');
        links.forEach(link => {
            const slug = link.getAttribute('data-catslug');
            const label = link.getAttribute('data-catname');

            if (slug && label) {
                categoryMap[slug] = true;
                categoryLabels[slug] = label;
            }
        });
    });

    const uniqueCategories = Object.keys(categoryMap);

    if (uniqueCategories.length === 0) return;

    // Находим существующий filter-bar или создаём новый
    let filterBar = document.querySelector('.filter-bar');
    if (!filterBar) {
        filterBar = document.createElement('div');
        filterBar.className = 'filter-bar';
        postList.insertBefore(filterBar, container);
    }

    // Очищаем старые фильтры, оставляем "Все" и "Сбросить"
    const allBtn = filterBar.querySelector('[data-filter="all"]');
    const resetBtn = filterBar.querySelector('[data-filter="reset"]');

    function updateResetButtonVisibility() {
        if (selectedFilters.size > 0) {
            resetBtn.style.display = 'inline-block'; // Показываем кнопку
        } else {
            resetBtn.style.display = 'none'; // Скрываем кнопку
        }
    }
    const existingButtons = filterBar.querySelectorAll('.dynamic-category');
    existingButtons.forEach(btn => btn.remove());

    // Добавляем новые фильтры
    uniqueCategories.forEach(slug => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn dynamic-category';
        btn.setAttribute('data-filter', slug);
        btn.textContent = categoryLabels[slug]; // Показываем кириллическое название
        filterBar.insertBefore(btn, resetBtn);
    });

    // Добавляем класс active всем карточкам (фильтр "Все")
    cards.forEach(card => {
        card.classList.add('active');
    });

    let selectedFilters = new Set();

    // Функция для применения фильтра по нескольким категориям
    function applyFilterMulti() {
        cards.forEach(card => {
            const categoriesEl = card.querySelector('.post-category');
            if (!categoriesEl) return;

            const links = categoriesEl.querySelectorAll('a');
            const slugsInCard = Array.from(links)
                .map(link => link.getAttribute('data-catslug'))
                .filter(slug => slug);

            // Если нет активных фильтров или есть хотя бы один совпадающий — показываем
            if (
                selectedFilters.size === 0 ||
                slugsInCard.some(slug => selectedFilters.has(slug))
            ) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // Устанавливаем начальный фильтр как "all"
    applyFilterMulti();

    // Обработчики кликов по кнопкам фильтров
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const slug = btn.getAttribute('data-filter');

            if (slug === 'all') {
                // Выбираем "Все"
                selectedFilters.clear();
                filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            } else if (slug === 'reset') {
                // Кнопка "Сбросить" уже обработана отдельно
                return;
            } else {
                // Убираем "Все", если выбрали конкретную категорию
                const allBtn = filterBar.querySelector('[data-filter="all"]');
                allBtn?.classList.remove('active');

                // Переключаем текущую кнопку
                if (selectedFilters.has(slug)) {
                    selectedFilters.delete(slug);
                    btn.classList.remove('active');
                } else {
                    selectedFilters.add(slug);
                    btn.classList.add('active');
                }
            }

            // Автоматически активируем "Все", если нет выбранных фильтров
            const allBtn = filterBar.querySelector('[data-filter="all"]');
            if (selectedFilters.size === 0 && !allBtn.classList.contains('active')) {
                allBtn.classList.add('active');
            }

            applyFilterMulti();
            updateResetButtonVisibility();
        });
    });

    // Обработчик кнопки "Сбросить"
    resetBtn.addEventListener('click', () => {
        selectedFilters.clear();

        // Сбрасываем все кнопки
        filterBar.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Активируем "Все"
        const allBtn = filterBar.querySelector('[data-filter="all"]');
        if (allBtn) {
            allBtn.classList.add('active');
        }

        applyFilterMulti();
        updateResetButtonVisibility(); // Прячем кнопку "Сбросить"
    });
};

initBlockTemplate();