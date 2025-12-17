<?php
// функции, необходимые для блока и только для блока

/**
 * Получить работы с многоуровневой фильтрацией
 * 
 * Логика:
 * 1. Если есть тег → показать работы по тегу + смежной категории, потом по родительской
 * 2. Если нет тега → показать работы по смежной категории, потом по родительской
 * 3. Если категорий несколько → показать по этим категориям, потом по родительской
 */
function getPostsArchiveGallery($posts_per_page = 50, $post__not_in = null, $tag = null, $category = null)
{
    ob_start();

    // Преобразуем $category в массив если это не массив
    $categories = is_array($category) ? $category : ($category ? [$category] : []);
    
    // Базовый args
    $base_args = array(
        'post_type' => ['post', 'pd-works'],
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
        'post_parent' => 0,
    );

    // Подготавливаем post__not_in массив
    $excluded_posts = [17]; // Дефолтный ID
    
    // Добавляем текущий пост ID
    if (is_singular(['post', 'pd-works'])) {
        $excluded_posts[] = get_the_ID();
    }
    
    // Добавляем переданные исключения
    if ($post__not_in) {
        $post__not_in_array = is_array($post__not_in) ? $post__not_in : [$post__not_in];
        $excluded_posts = array_merge($excluded_posts, $post__not_in_array);
    }
    
    $base_args['post__not_in'] = array_unique($excluded_posts);

    // Массив ID постов которые уже показали (для избежания дубликатов)
    $shown_posts = isset($base_args['post__not_in']) ? $base_args['post__not_in'] : [];

    // Шаг 1: Попытаемся получить посты с точной фильтрацией (тег + категория)
    if ($tag && !empty($categories)) {
        $args = $base_args;
        $args['tax_query'] = array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'post_tag',
                'field' => 'id',
                'terms' => $tag
            ),
            array(
                'taxonomy' => 'category',
                'field' => 'id',
                'terms' => $categories,
                'include_children' => true
            )
        );
        
        $loop = new WP_Query($args);
        while ($loop->have_posts()) : $loop->the_post();
            renderPost();
            $shown_posts[] = get_the_ID();
        endwhile;
        wp_reset_query();
    }

    // Шаг 2: Если есть тег - получаем работы только по тегу (без категории)
    if ($tag) {
        $args = $base_args;
        $args['post__not_in'] = array_unique($shown_posts);
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'post_tag',
                'field' => 'id',
                'terms' => $tag
            )
        );
        
        $loop = new WP_Query($args);
        while ($loop->have_posts()) : $loop->the_post();
            renderPost();
            $shown_posts[] = get_the_ID();
        endwhile;
        wp_reset_query();
    }

    // Шаг 3: Если есть категории - получаем работы по этим категориям
    if (!empty($categories)) {
        $args = $base_args;
        $args['post__not_in'] = array_unique($shown_posts);
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'category',
                'field' => 'id',
                'terms' => $categories,
                'include_children' => true
            )
        );
        
        $loop = new WP_Query($args);
        while ($loop->have_posts()) : $loop->the_post();
            renderPost();
            $shown_posts[] = get_the_ID();
        endwhile;
        wp_reset_query();
    }

    // Шаг 4: Если есть категории - получаем работы по родительской категории
    if (!empty($categories)) {
        // Получаем родительские категории
        $parent_categories = [];
        foreach ($categories as $cat_id) {
            $cat = get_term($cat_id, 'category');
            if ($cat && $cat->parent) {
                $parent_categories[] = $cat->parent;
            }
        }
        
        if (!empty($parent_categories)) {
            $parent_categories = array_unique($parent_categories);
            $args = $base_args;
            $args['post__not_in'] = array_unique($shown_posts);
            $args['tax_query'] = array(
                array(
                    'taxonomy' => 'category',
                    'field' => 'id',
                    'terms' => $parent_categories,
                    'include_children' => false  // Только сама родительская категория
                )
            );
            
            $loop = new WP_Query($args);
            while ($loop->have_posts()) : $loop->the_post();
                renderPost();
                $shown_posts[] = get_the_ID();
            endwhile;
            wp_reset_query();
        }
    }

    // Если все еще нет результатов, показываем все последние посты (кроме исключенных)
    if (count($shown_posts) <= (isset($base_args['post__not_in']) ? count($base_args['post__not_in']) : 1)) {
        $args = $base_args;
        $args['post__not_in'] = array_unique($shown_posts);
        
        $loop = new WP_Query($args);
        while ($loop->have_posts()) : $loop->the_post();
            renderPost();
            $shown_posts[] = get_the_ID();
        endwhile;
        wp_reset_query();
    }

    return ob_get_clean();
}

/**
 * Вспомогательная функция для отрисовки одного поста
 */
function renderPost()
{
    $img_large = get_the_post_thumbnail_url(get_the_ID(), 'large');
    $img_medium_large = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');

    get_template_part('components/post-card/post-card', null, array(
        'title' => get_the_title(),
        'link' => get_the_permalink(),
        'id' => get_the_ID(),
        'img_large' => $img_large,
        'img_medium_large' => $img_medium_large,
        'except' => has_excerpt() ? get_the_excerpt() : null,
    ));
}
