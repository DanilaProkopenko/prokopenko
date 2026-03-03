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
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorksGridFilter);
} else {
    initWorksGridFilter();
}
