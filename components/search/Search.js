/**
 * Search Component Module
 * Handles search functionality and rendering
 * Note: Header.js handles modal opening/closing, this module handles search logic
 */

jQuery(function($) {
    class Search {
        constructor() {
            this.typingTimer = null;
            this.$input = $('#search-input');
            this.$resultsContainer = $('#search-results');
            this.$modal = $('.search-modal');
            this.$mainBody = $('body');
            this.currentQuery = '';

            this.init();
            this.setupModalObserver();
        }

        init() {
            this.bindEvents();
        }

        /**
         * Наблюдаем за открытием/закрытием модали и фокусируемся на инпуте
         */
        setupModalObserver() {
            const $modal = $('.search-modal');
            const $input = $('#search-input');

            // Используем MutationObserver для отслеживания класса _open
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        const $element = $(mutation.target);
                        
                        // Если класс _open добавлен - фокусируемся
                        if ($element.hasClass('_open')) {
                            // Для desktop браузеров
                            setTimeout(() => {
                                $input[0].focus();
                            }, 50);
                        }
                    }
                });
            });

            // Начинаем наблюдение
            if ($modal.length) {
                observer.observe($modal[0], {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }

            // === iOS СПЕЦИАЛЬНЫЙ ОБРАБОТЧИК ===
            // На iOS нужно слушать touch чтобы клавиатура открылась
            $(document).on('touchstart', '.search-modal._open', (e) => {
                // Если клик не на результаты - фокусируем инпут
                if (!$(e.target).closest('#search-results').length) {
                    $input[0].focus();
                    e.preventDefault();
                }
            });

            // Дополнительно - фокусируем при клике на сам инпут
            $input.on('touchstart', (e) => {
                // Предотвращаем стандартное поведение
                $input[0].focus();
            });
        }

        bindEvents() {
            // iOS fix - prevent blur that closes keyboard
            this.$input.on('blur', (e) => {
                // Не даем фокусу теряться, если пользователь не явно не ушел
                // Сразу возвращаем фокус если модаль открыта
                if (this.$modal.hasClass('_open')) {
                    setTimeout(() => {
                        this.$input.focus();
                    }, 0);
                }
            });

            // Enter key handler
            this.$input.on('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.$input.blur();

                    const q = this.$input.val();
                    if (q.length >= 2) {
                        this.performSearch(q);
                    }
                }
            });

            // Real-time search on input
            this.$input.on('input', () => {
                const q = this.$input.val();
                clearTimeout(this.typingTimer);
                if (q.length >= 2) {
                    this.typingTimer = setTimeout(() => {
                        this.currentQuery = q;
                        this.performSearch(q);
                    }, 300);
                } else {
                    this.$resultsContainer.html('');
                }
            });

            // Фокус при клике на инпут (резервный вариант)
            this.$input.on('click', () => {
                this.$input.focus();
            });

            // Search button click
            $(document).on('click', '.search-as-is', () => {
                this.performSearch(this.currentQuery);
            });

            // Очищаем результаты при закрытии модали
            const $modal = $('.search-modal');
            const closeObserver = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        const $element = $(mutation.target);
                        // Если класс _open удален - очищаем результаты и инпут
                        if (!$element.hasClass('_open')) {
                            this.$resultsContainer.html('');
                            this.$input.val('');
                        }
                    }
                });
            });

            if ($modal.length) {
                closeObserver.observe($modal[0], {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
        }

        performSearch(q) {
            const ajaxUrl = window.ajax_search?.ajaxurl || window.ajaxurl;
            const nonce = window.ajax_search?.nonce || '';

            $.get(
                ajaxUrl + '?action=prokopenko_search&q=' + encodeURIComponent(q) + '&security=' + nonce,
                (response) => {
                    this.renderResults(response.results, q);
                }
            ).fail(() => {
                this.$resultsContainer.html('<div class="search-error">Ошибка при выполнении поиска</div>');
            });
        }

        sanitizeExcerpt(html) {
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

            return tmp.innerHTML
                .replace(/\s+/g, ' ')
                .trim();
        }

        renderResults(results, query) {
            this.$resultsContainer.html('');

            if (!results.length) {
                this.$resultsContainer.append('<div class="no-results pd_width_50">Ничего не найдено</div>');
                return;
            }

            results.forEach((item) => {
                const safeExcerpt = this.sanitizeExcerpt(item.match_excerpt);

                const html = `
                    <div class="result-item post-type-${item.type} card-search pd_width_50 small-margin-top">
                        <h4 class="small-margin-top"><a href="${item.url}" class="result-item__title">${item.title}</a></h4>
                        ${safeExcerpt ? `<p class="result-item__description">${safeExcerpt}</p>` : ''}
                        ${item.categories_text ? `<p class="result-item__category">Категория: ${item.categories_text}</p>` : ''}
                        ${item.thumbnail ? `<img src="${item.thumbnail}" class="card-search__thumb">` : ''}
                    </div>`;
                this.$resultsContainer.append(html);
            });
        }
    }

    // Initialize Search on page load
    window.searchModule = new Search();
});
