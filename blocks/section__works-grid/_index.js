const updateCardPositions = () => {
    const container = document.querySelector('.section__works-grid');
    if (!container) return;

    const cards = [...container.querySelectorAll('.post-card__works-grid')];
    let currentRowTop = cards[0]?.offsetTop;
    let rowCards = [];

    cards.forEach(card => {
        if (card.offsetTop > currentRowTop) {
            const row25Cards = rowCards.filter(c => c.classList.contains('pd_work_width-25'));
            row25Cards.forEach((c, i) => {
                c.classList.remove('is-left', 'is-right');
                c.classList.add(i % 2 === 0 ? 'is-left' : 'is-right');
            });
            currentRowTop = card.offsetTop;
            rowCards = [];
        }
        rowCards.push(card);
    });

    // Последняя строка
    const row25Cards = rowCards.filter(c => c.classList.contains('pd_work_width-25'));
    row25Cards.forEach((c, i) => {
        c.classList.remove('is-left', 'is-right');
        c.classList.add(i % 2 === 0 ? 'is-left' : 'is-right');
    });
};

const initWorksGridFilter = () => {
    // Ждём когда функция initFilterBar будет доступна
    if (typeof window.initFilterBar === 'undefined') {
        setTimeout(initWorksGridFilter, 100);
        return;
    }

    initFilterBar({
        // Основные селекторы контейнеров
        containerId: 'workslist',
        containerSelector: '.section__works-grid',
        cardSelector: '.post-card__works-grid',
        filterMode: 'single',
        
        // Классы компонента фильтра
        filterBarClass: '.filter-bar',
        filterBtnClass: 'filter-btn',
        dynamicCategoryClass: 'dynamic-category',
        moreButtonClass: 'more-btn',
        categoryHiddenClass: 'category-hidden',
        
        // Классы элементов карточек
        categoryElementClass: '.post-category',
        cardHiddenClass: 'card-hidden',
        activeClass: 'active',
        animateFadeClass: 'animate-fade'
    });

    // Обновляем позиции карточек
    updateCardPositions();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorksGridFilter);
} else {
    initWorksGridFilter();
}
