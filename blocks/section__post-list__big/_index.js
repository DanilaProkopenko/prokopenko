const initBlockTemplate = () => {
    const postList = document.getElementById('postslist');
    if (postList) {
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
            btn.className = 'filter-btn dynamic-category ';
            btn.setAttribute('data-filter', slug);
            btn.textContent = categoryLabels[slug]; // Показываем кириллическое название
            filterBar.insertBefore(btn, resetBtn);
        });

        // Добавляем класс active всем карточкам (фильтр "Все")
        cards.forEach(card => {
            card.classList.add('active');
        });


        function toggleExtraCategories() {
            const filterButtons = Array.from(filterBar.querySelectorAll('.filter-btn')).filter(
                btn => !btn.getAttribute('data-filter')?.includes('reset') && !btn.classList.contains('more-btn')
            );

            // Убираем старую кнопку "еще"
            const oldMoreBtn = filterBar.querySelector('.more-btn');
            if (oldMoreBtn) oldMoreBtn.remove();

            // Если категорий <= 4 — ничего не делаем
            if (filterButtons.length <= 3) return;

            const visibleCount = 2; // "Все" + 2 категории
            const moreButtons = filterButtons.slice(visibleCount);

            // Создаём кнопку "еще"
            const moreBtn = document.createElement('button');
            moreBtn.className = 'filter-btn more-btn';
            moreBtn.setAttribute('type', 'button');
            // moreBtn.innerHTML = '▾'; // Стрелка вниз
            moreBtn.innerHTML = '⏷'; // Стрелка вниз

            // Вставляем перед reset-btn или в конец
            const resetBtn = filterBar.querySelector('[data-filter="reset"]');
            if (resetBtn) {
                filterBar.insertBefore(moreBtn, resetBtn);
            } else {
                filterBar.appendChild(moreBtn);
            }

            // Проверяем текущее состояние: скрыты ли категории
            const areHidden = moreButtons.every(btn => btn.classList.contains('category-hidden'));

            if (!areHidden) {
                // Скрываем лишние при инициализации
                moreButtons.forEach(btn => {
                    btn.classList.add('category-hidden');
                });
            }

            // Обработчик клика по кнопке "еще"
            moreBtn.addEventListener('click', () => {
                const isExpanded = moreBtn.classList.contains('expanded');

                if (isExpanded) {
                    // Скрываем лишние
                    moreButtons.forEach(btn => {
                        btn.classList.add('category-hidden');
                    });
                    moreBtn.innerHTML = '⏷'; // Стрелка вниз
                    moreBtn.classList.remove('expanded');
                } else {
                    // Показываем все
                    moreButtons.forEach(btn => {
                        btn.classList.remove('category-hidden');
                    });
                    moreBtn.innerHTML = '⏶'; // Стрелка вверх
                    moreBtn.classList.add('expanded');

                    // Перемещаем кнопку в конец
                    filterBar.removeChild(moreBtn);
                    if (resetBtn) {
                        filterBar.insertBefore(moreBtn, resetBtn);
                    } else {
                        filterBar.appendChild(moreBtn);
                    }
                }
            });
        }
        // Вызываем функцию после генерации кнопок
        toggleExtraCategories();

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

        let matchesFilter = false;

        if (selectedFilters.size === 0) {
            // Если выбран "Все"
            matchesFilter = true;
        } else {
            // Иначе проверяем совпадение
            matchesFilter = slugsInCard.some(slug => selectedFilters.has(slug));
        }

        if (matchesFilter) {
            // Показываем карточку
            card.classList.remove('card-hidden');
            card.style.display = 'flex'; // или block, inline-block
            void card.offsetWidth; // Принудительный reflow для анимации
            card.classList.add('animate-fade');

            setTimeout(() => {
                card.classList.remove('animate-fade');
            }, 800);

        } else {
            // Скрываем карточку
            card.classList.add('card-hidden');
            card.classList.remove('animate-fade');
            card.style.display = 'none';
        }
    });
}

        // Устанавливаем начальный фильтр как "all"
        applyFilterMulti();

        // Обработчики кликов по кнопкам фильтров
        filterBar.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slug = btn.getAttribute('data-filter');

                // Добавь проверку: если кнопка — more-btn, выходим из функции
                if (btn.classList.contains('more-btn')) return;
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
    }

};

initBlockTemplate();