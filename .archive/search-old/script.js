jQuery(document).ready(function ($) {
    console.log(ajax_search.ajaxurl); // выводит /wp-admin/admin-ajax.php

    let typingTimer;
    const input = $('#search-input');
    const resultsContainer = $('#search-results');
    const modal = $('.search-modal');
    const mainBody = $('#main');

    let currentQuery = '';
    // === Обработчик Enter ===
    input.on('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();

            input.blur();

            const q = $(this).val();
            if (q.length >= 2) {
                performSearch(q);
            }
        }
    });

    $(document).on('click', function (e) {
        const $target = $(e.target);

        if ($('.search-modal._open').length && !$target.closest('.search-modal, .search-trigger-icon').length) {
            $('.search-modal').removeClass('_open');
            $('#main').removeClass('_open');
            $('.search-trigger-icon').removeClass('_open');
        }

        if ($('#burger-menu._open').length && !$target.closest('#burger-menu, #burger-icon').length) {
            $('#burger-menu').removeClass('_open');
            $('#main').removeClass('_open');
            $('.footer').removeClass('_hide');
            $('#burger-icon').removeClass('_open');
            $('#burger-icon .bar').removeClass('animate');
        }
    });

    $('.search-modal').on('click', function (e) {
        if ($(e.target).hasClass('search-modal')) {
            modal.removeClass('_open');
            mainBody.removeClass('_open');
        }
    });

    function focusSearchInput() {
        if (modal.hasClass('_open')) {
            input.focus();
        }
    }

    $('.search-trigger-icon').on('click', function () {
        setTimeout(focusSearchInput, 300);
    });

    input.on('input', function () {
        const q = $(this).val();
        clearTimeout(typingTimer);
        if (q.length >= 2) {
            typingTimer = setTimeout(() => {
                currentQuery = q;
                performSearch(q);
            }, 300);
        } else {
            resultsContainer.html('');
        }
    });

    $(document).on('click', '.search-as-is', function () {
        performSearch(currentQuery);
    });

    function performSearch(q) {
        $.get(ajax_search.ajaxurl + '?action=prokopenko_search&q=' + encodeURIComponent(q) + '&security=' + ajax_search.nonce, function (response) {
            renderResults(response.results, q);
        }).fail(function () {
            resultsContainer.html('<div class="search-error">Ошибка при выполнении поиска</div>');
        });
    }

    function sanitizeExcerpt(html) {
        if (!html) return '';

        const tmp = document.createElement('div');
        tmp.innerHTML = html;

        tmp.querySelectorAll('a').forEach(a => {
            const span = document.createElement('span');
            span.textContent = a.textContent;
            a.replaceWith(span);
        });

        tmp.querySelectorAll('*:not(mark)').forEach(el => {
            if (el.tagName.toLowerCase() === 'mark') return;

            const span = document.createElement('span');
            span.textContent = el.textContent;
            el.replaceWith(span);
        });

        const cleanHtml = tmp.innerHTML
            .replace(/\s+/g, ' ')
            .trim();

        return cleanHtml;
    }

    function renderResults(results, query) {
        resultsContainer.html('');

        if (!results.length) {
            resultsContainer.append('<div class="no-results pd_width_50">Ничего не найдено</div>');
            return;
        }

        results.forEach((item, index) => {
            const safeExcerpt = sanitizeExcerpt(item.match_excerpt);

            const html = `
                <div class="result-item post-type-${item.type} card-search pd_width_50 small-margin-top">
                       <h4 class="small-margin-top"> <a href="${item.url}" class="result-item__title ">${item.title}</a></h4>
                        ${safeExcerpt ? `<p class="result-item__description">${safeExcerpt}</p>` : ''}
                        ${item.categories_text ? `<p class="result-item__category">Категория: ${item.categories_text}</p>` : ''}
                      ${item.thumbnail ? `<img src="${item.thumbnail}" class="card-search__thumb">` : ''}
                </div>`;
            resultsContainer.append(html);
        });
    }
});
