<?php

/**
 * Регистрация и подключение AJAX поиска в теме
 */

function prokopenko_enqueue_search_scripts()
{
    $css_file = get_template_directory() . '/includes/search/style.css';
    $css_version = file_exists($css_file) ? filemtime($css_file) : '1.0.0';

    wp_enqueue_style(
        'prokopenko-search',
        get_template_directory_uri() . '/includes/search/style.css',
        [],
        $css_version
    );

    $js_file = get_template_directory() . '/includes/search/script.js';
    $js_version = file_exists($js_file) ? filemtime($js_file) : '1.0.0';

    wp_enqueue_script(
        'prokopenko-search-js',
        get_template_directory_uri() . '/includes/search/script.js',
        ['jquery'],
        $js_version,
        true
    );

    wp_localize_script('prokopenko-search-js', 'ajax_search', [
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('search-nonce')
    ]);
}

add_action('wp_enqueue_scripts', 'prokopenko_enqueue_search_scripts');

// Подключаем обработчик AJAX
require_once get_template_directory() . '/includes/search/ajax-handler.php';
