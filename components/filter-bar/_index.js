/**
 * Инициализирует компонент фильтра категорий на основе конфигурации
 * 
 * @param {Object} config - Объект конфигурации компонента
 * @param {string} config.containerId - ID контейнера, содержащего посты (по умолчанию: 'postslist')
 * @param {string} config.containerSelector - Селектор блока-контейнера (по умолчанию: '.section__post-list__big')
 * @param {string} config.cardSelector - Селектор карточек постов (по умолчанию: '.post-card__big')
 * @param {string} config.filterMode - Режим фильтрации: 'single' или 'multi' (по умолчанию: 'single')
 * 
 * Классы компонента фильтра:
 * @param {string} config.filterBarClass - Селектор контейнера фильтра (по умолчанию: '.filter-bar')
 * @param {string} config.filterBtnClass - Класс для кнопок фильтра (по умолчанию: 'filter-btn')
 * @param {string} config.dynamicCategoryClass - Класс для динамических кнопок категорий (по умолчанию: 'dynamic-category')
 * @param {string} config.moreButtonClass - Класс для кнопки "показать ещё" (по умолчанию: 'more-btn')
 * @param {string} config.categoryHiddenClass - Класс для скрытых кнопок категорий (по умолчанию: 'category-hidden')
 * 
 * Классы элементов карточек:
 * @param {string} config.categoryElementClass - Селектор элемента категории в карточке (по умолчанию: '.post-category')
 * @param {string} config.cardHiddenClass - Класс для скрытых карточек (по умолчанию: 'card-hidden')
 * @param {string} config.activeClass - Класс для активных элементов (по умолчанию: 'active')
 * @param {string} config.animateFadeClass - Класс для animate-fade анимации (по умолчанию: 'animate-fade')
 * 
 * @example
 * // Использование с другим блоком
 * initFilterBar({
 *     containerId: 'workslist',
 *     containerSelector: '.section__works-grid',
 *     cardSelector: '.work-card',
 *     filterBtnClass: 'btn',
 *     categoryElementClass: '.work-category'
 * });
 */
const initFilterBar = (config = {}) => {
    const {
        containerId = 'postslist',
        containerSelector = '.section__post-list__big',
        cardSelector = '.post-card__big',
        filterMode = 'single',
        // Классы компонента
        filterBarClass = '.filter-bar',
        filterBtnClass = 'filter-btn',
        dynamicCategoryClass = 'dynamic-category',
        moreButtonClass = 'more-btn',
        categoryHiddenClass = 'category-hidden',
        // Классы карточек
        categoryElementClass = '.post-category',
        cardHiddenClass = 'card-hidden',
        activeClass = 'active',
        animateFadeClass = 'animate-fade'
    } = config;

    const init = () => {
        const parentContainer = document.getElementById(containerId);
        if (!parentContainer) return;

        const container = parentContainer.querySelector(containerSelector);
        if (!container) return;

        const cards = container.querySelectorAll(cardSelector);
        if (cards.length === 0) return;

        // Маппинг слагов категорий (латиница) → названий (кириллица)
        const categoryMap = {};
        const categoryLabels = {};

        // Извлекаем категории из карточек
        cards.forEach(card => {
            const categoriesEl = card.querySelector(categoryElementClass);
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

        // Находим filter-bar
        let filterBar = parentContainer.querySelector(filterBarClass);
        if (!filterBar) return;

        // Очищаем старые динамические фильтры
        const existingButtons = filterBar.querySelectorAll(`.${dynamicCategoryClass}`);
        existingButtons.forEach(btn => btn.remove());

        // Преобразуем в массив объектов { slug, label }
        const categoryArray = uniqueCategories.map(slug => ({
            slug,
            label: categoryLabels[slug]
        }));

        // Сортируем по алфавиту
        categoryArray.sort((a, b) => a.label.localeCompare(b.label));

        // Добавляем кнопки
        categoryArray.forEach(({ slug, label }) => {
            const btn = document.createElement('button');
            btn.className = `${filterBtnClass} ${dynamicCategoryClass}`;
            btn.setAttribute('data-filter', slug);
            btn.textContent = label;
            filterBar.appendChild(btn);
        });

        // Добавляем класс active всем карточкам
        cards.forEach(card => {
            card.classList.add(activeClass);
        });

        function toggleExtraCategories() {
            const filterButtons = Array.from(filterBar.querySelectorAll(`.${filterBtnClass}`)).filter(
                btn => !btn.classList.contains(moreButtonClass)
            );

            const oldMoreBtn = filterBar.querySelector(`.${moreButtonClass}`);
            if (oldMoreBtn) oldMoreBtn.remove();

            if (filterButtons.length <= 5) return;

            const visibleCount = 4;
            const moreButtons = filterButtons.slice(visibleCount);

            const moreBtn = document.createElement('button');
            moreBtn.className = `${filterBtnClass} ${moreButtonClass}`;
            moreBtn.setAttribute('type', 'button');
            moreBtn.innerHTML = '⏷';

            filterBar.appendChild(moreBtn);

            moreButtons.forEach(btn => {
                btn.classList.add(categoryHiddenClass);
            });

            moreBtn.addEventListener('click', () => {
                const isExpanded = moreBtn.classList.contains('expanded');

                if (isExpanded) {
                    moreButtons.forEach(btn => {
                        btn.classList.add(categoryHiddenClass);
                    });
                    moreBtn.innerHTML = '⏷';
                    moreBtn.classList.remove('expanded');
                } else {
                    moreButtons.forEach(btn => {
                        btn.classList.remove(categoryHiddenClass);
                    });
                    moreBtn.innerHTML = '⏶';
                    moreBtn.classList.add('expanded');

                    filterBar.removeChild(moreBtn);
                    filterBar.appendChild(moreBtn);
                }
            });
        }

        if (!isMobile()) {
            toggleExtraCategories();
        }

        let selectedFilters = new Set();

        function applyFilter() {
            cards.forEach(card => {
                const categoriesEl = card.querySelector(categoryElementClass);
                if (!categoriesEl) return;

                const links = categoriesEl.querySelectorAll('a');
                const slugsInCard = Array.from(links)
                    .map(link => link.getAttribute('data-catslug'))
                    .filter(slug => slug);

                let matchesFilter = false;

                if (selectedFilters.size === 0) {
                    matchesFilter = true;
                } else {
                    matchesFilter = slugsInCard.some(slug => selectedFilters.has(slug));
                }

                if (matchesFilter) {
                    card.classList.remove(cardHiddenClass);
                    card.style.display = 'flex';
                    void card.offsetWidth;
                    card.classList.add(animateFadeClass);

                    setTimeout(() => {
                        card.classList.remove(animateFadeClass);
                    }, 800);
                } else {
                    card.classList.add(cardHiddenClass);
                    card.classList.remove(animateFadeClass);
                    card.style.display = 'none';
                }
            });
        }

        applyFilter();

        filterBar.querySelectorAll(`.${filterBtnClass}`).forEach(btn => {
            btn.addEventListener('click', () => {
                const slug = btn.getAttribute('data-filter');

                if (btn.classList.contains(moreButtonClass)) return;

                if (filterMode === 'single') {
                    handleSingleSelect(slug, btn);
                } else {
                    handleMultiSelect(slug, btn);
                }

                applyFilter();
            });
        });

        function handleMultiSelect(slug, btn) {
            if (slug === 'all') {
                selectedFilters.clear();
                filterBar.querySelectorAll(`.${filterBtnClass}`).forEach(b => b.classList.remove(activeClass));
                btn.classList.add(activeClass);
            } else {
                const allBtn = filterBar.querySelector('[data-filter="all"]');
                allBtn?.classList.remove(activeClass);

                if (selectedFilters.has(slug)) {
                    selectedFilters.delete(slug);
                    btn.classList.remove(activeClass);
                } else {
                    selectedFilters.add(slug);
                    btn.classList.add(activeClass);
                }
            }

            const allBtn = filterBar.querySelector('[data-filter="all"]');
            if (selectedFilters.size === 0 && !allBtn.classList.contains(activeClass)) {
                allBtn.classList.add(activeClass);
            }
        }

        function handleSingleSelect(slug, btn) {
            const allBtn = filterBar.querySelector('[data-filter="all"]');

            if (slug === 'all') {
                selectedFilters.clear();
                filterBar.querySelectorAll(`.${filterBtnClass}`).forEach(b => b.classList.remove(activeClass));
                btn.classList.add(activeClass);
            } else {
                selectedFilters.clear();
                filterBar.querySelectorAll(`.${filterBtnClass}`).forEach(b => b.classList.remove(activeClass));

                selectedFilters.add(slug);
                btn.classList.add(activeClass);
                allBtn.classList.remove(activeClass);
            }
        }

        function isMobile() {
            return window.matchMedia("(max-width: 768px)").matches;
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
};

// Экспортируем функцию глобально для доступа из других модулей
window.initFilterBar = initFilterBar;