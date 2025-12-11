const initMiniBlockTemplate = () => {
    const postList = document.getElementById('postslist-mini');
    if (postList) {
        const filterBar = postList.querySelector('.filter-bar--mini');
        const grid = postList.querySelector('.section__post-list__mini__grid');
        const cards = grid.querySelectorAll('.post-card__mini__image-link__wrapper');

        if (!filterBar || !grid || cards.length === 0) return;

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

        if (uniqueCategories.length > 0) {
            // Получаем кнопку "Все"
            const allBtn = filterBar.querySelector('[data-filter="all"]');

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
        }

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
                    card.style.display = 'flex';
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

        // 🔘 Обработчик кликов по кнопкам фильтров
        filterBar.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slug = btn.getAttribute('data-filter');

                // Режим single select
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

                applyFilterMulti();
            });
        });
    }
};

initMiniBlockTemplate();
