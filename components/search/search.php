<?php

/**
 * Search Component Shortcodes
 * Регистрирует шорткоды для поиска (кнопка и модальное окно)
 */

function prokopenko_search_trigger_icon_shortcode()
{
    ob_start(); ?>
    <div class="search-trigger search-trigger-icon">
        <div class="search-icon">
            <div class="search-icon__circle"></div>
            <div class="search-icon__handle"></div>
        </div>
    </div>
<?php return ob_get_clean();
}
add_shortcode('search_trigger_icon', 'prokopenko_search_trigger_icon_shortcode');

function prokopenko_search_modal_shortcode()
{
    ob_start(); ?>
    <div class="search-modal">
        <div class="search-input pd_width_50">
            <input type="text" id="search-input" placeholder="Поиск...">
        </div>
        <div class="search-content ">
            <div id="search-results"></div>
        </div>
    </div>
<?php return ob_get_clean();
}
add_shortcode('search_modal', 'prokopenko_search_modal_shortcode');
