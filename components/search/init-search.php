<?php

/**
 * Search Component Initialization
 * Регистрация и подключение поиска в теме
 */

function prokopenko_enqueue_search_scripts()
{
    // // Enqueue CSS
    // $css_file = get_template_directory() . '/components/search/search.css';
    // $css_version = file_exists($css_file) ? filemtime($css_file) : '1.0.0';

    // wp_enqueue_style(
    //     'prokopenko-search',
    //     get_template_directory_uri() . '/components/search/search.css',
    //     [],
    //     $css_version
    // );

    // Enqueue JavaScript - jQuery dependency for search functionality
    wp_enqueue_script(
        'prokopenko-search-js',
        get_template_directory_uri() . '/components/search/Search.js',
        ['jquery'],
        '1.0.0',
        true  // in_footer
    );

    wp_localize_script('prokopenko-search-js', 'ajax_search', [
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('search-nonce')
    ]);
}

add_action('wp_enqueue_scripts', 'prokopenko_enqueue_search_scripts');

// Регистрируем shortcodes
require_once get_template_directory() . '/components/search/search.php';

// Подключаем AJAX handler
require_once get_template_directory() . '/components/search/ajax-handler.php';
