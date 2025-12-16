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
        }

        init() {
            this.bindEvents();
        }

        bindEvents() {
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

            // Search button click
            $(document).on('click', '.search-as-is', () => {
                this.performSearch(this.currentQuery);
            });
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
