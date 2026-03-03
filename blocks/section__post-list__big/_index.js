const initPostListBigFilter = () => {
    // Ждём когда функция initFilterBar будет доступна
    if (typeof window.initFilterBar === 'undefined') {
        setTimeout(initPostListBigFilter, 100);
        return;
    }

    initFilterBar({
        // Основные селекторы контейнеров
        containerId: 'postslist',
        containerSelector: '.section__post-list__big',
        cardSelector: '.post-card__big',
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
    document.addEventListener('DOMContentLoaded', initPostListBigFilter);
} else {
    initPostListBigFilter();
}