const initWorksGrid = () => {
    const worksList = document.getElementById('workslist');
    if (worksList) {
        const container = worksList.querySelector('.section__works-grid');
        const cards = container.querySelectorAll('.post-card__works-grid');

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
            worksList.insertBefore(filterBar, container);
        }

        // Очищаем старые фильтры, оставляем только "Все"
        const allBtn = filterBar.querySelector('[data-filter="all"]');

        const existingButtons = filterBar.querySelectorAll('.dynamic-category');
        existingButtons.forEach(btn => btn.remove());

        // Преобразуем в массив объектов { slug, label }
        const categoryArray = uniqueCategories.map(slug => ({
            slug,
            label: categoryLabels[slug]
        }));

        // Сортируем по алфавиту по кириллическому названию
        categoryArray.sort((a, b) => a.label.localeCompare(b.label));

        // Добавляем кнопки в отсортированном порядке
        categoryArray.forEach(({ slug, label }) => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn dynamic-category';
            btn.setAttribute('data-filter', slug);
            btn.textContent = label;
            filterBar.appendChild(btn);
        });

        // Добавляем класс active всем карточкам (фильтр "Все")
        cards.forEach(card => {
            card.classList.add('active');
        });

        function toggleExtraCategories() {
            const filterButtons = Array.from(filterBar.querySelectorAll('.filter-btn')).filter(
                btn => !btn.classList.contains('more-btn')
            );

            // Убираем старую кнопку "еще"
            const oldMoreBtn = filterBar.querySelector('.more-btn');
            if (oldMoreBtn) oldMoreBtn.remove();

            // Если категорий <= 3 — ничего не делаем
            if (filterButtons.length <= 5) return;

            const visibleCount = 4; // "Все" + 2 категории
            const moreButtons = filterButtons.slice(visibleCount);

            // Создаём кнопку "еще"
            const moreBtn = document.createElement('button');
            moreBtn.className = 'filter-btn more-btn';
            moreBtn.setAttribute('type', 'button');
            moreBtn.innerHTML = '⏷'; // Стрелка вниз

            // Вставляем в конец
            filterBar.appendChild(moreBtn);

            // Скрываем лишние при инициализации
            moreButtons.forEach(btn => {
                btn.classList.add('category-hidden');
            });

            // Обработчик клика по кнопке "еще"
            moreBtn.addEventListener('click', () => {
                const isExpanded = moreBtn.classList.contains('expanded');

                if (isExpanded) {
                    // Скрываем лишние
                    moreButtons.forEach(btn => {
                        btn.classList.add('category-hidden');
                    });
                    moreBtn.innerHTML = '⏷';
                    moreBtn.classList.remove('expanded');
                } else {
                    // Показываем все
                    moreButtons.forEach(btn => {
                        btn.classList.remove('category-hidden');
                    });
                    moreBtn.innerHTML = '⏶';
                    moreBtn.classList.add('expanded');

                    // Перемещаем кнопку в конец
                    filterBar.removeChild(moreBtn);
                    filterBar.appendChild(moreBtn);
                }
            });
        }

        // Вызываем функцию после генерации кнопок
        // Условие: только если это не мобильное устройство
        if (!isMobile()) {
            toggleExtraCategories();
        }

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
                    void card.offsetWidth; // Принудительный reflow для анимации
                    card.classList.add('animate-fade');

                    setTimeout(() => {
                        card.classList.remove('animate-fade');
                    }, 800);

                } else {
                    // Скрываем карточку
                    card.classList.add('card-hidden');
                    card.classList.remove('animate-fade');
                }
            });
        }

        // Устанавливаем начальный фильтр как "all"
        applyFilterMulti();

        // 🔘 Обработчик кликов по кнопкам фильтров
        filterBar.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slug = btn.getAttribute('data-filter');

                // Пропускаем служебные кнопки
                if (btn.classList.contains('more-btn')) return;

                handleSingleSelect(slug, btn);
                applyFilterMulti();
            });
        });

        function handleSingleSelect(slug, btn) {
            const allBtn = filterBar.querySelector('[data-filter="all"]');

            if (slug === 'all') {
                // Выбираем "Все"
                selectedFilters.clear();
                filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            } else {
                // Сбрасываем всё и выбираем только одну категорию
                selectedFilters.clear();
                filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

                selectedFilters.add(slug);
                btn.classList.add('active');
                allBtn.classList.remove('active');
            }
        }

        function isMobile() {
            return window.matchMedia("(max-width: 768px)").matches;
        }
    }
};

initWorksGrid();
