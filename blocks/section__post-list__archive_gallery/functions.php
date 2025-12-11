<?php
// функции, необходимые для блока и только для блока
function getPostsArchiveGallery($posts_per_page = 50, $post__not_in = null, $tag = null, $category = null)
{
    ob_start();
    
    $args = array(
        'post_type' => ['post', 'pd-works'],
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
    );

    // Добавляем post__not_in если он передан
    if ($post__not_in) {
        $args['post__not_in'] = is_array($post__not_in) ? $post__not_in : [$post__not_in];
    } else {
        $args['post__not_in'] = [17]; // Дефолтный ID который исключаем
    }

    // Подготавливаем tax_query
    $tax_query = [];

    if ($category) {
        $tax_query[] = array(
            'taxonomy' => 'category',
            'field' => 'id',
            'terms' => $category,
            'include_children' => true
        );
    }

    if ($tag) {
        $tax_query[] = array(
            'taxonomy' => 'post_tag',
            'field' => 'id',
            'terms' => $tag
        );
    }

    // Добавляем tax_query только если он не пустой
    if (!empty($tax_query)) {
        $tax_query['relation'] = $tag && $category ? 'AND' : 'OR';
        $args['tax_query'] = $tax_query;
    }

    $loop = new WP_Query($args);
    $counter = 0;

    while ($loop->have_posts()) : $loop->the_post();

        $img_large = get_the_post_thumbnail_url(get_the_ID(), 'large');
        $img_medium_large = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');
        
        get_template_part('components/post-card/post-card', null, array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
            'id' => get_the_ID(),

            'img_large' => $img_large,
            'img_medium_large' => $img_medium_large,

            'except' =>  has_excerpt() ? get_the_excerpt() : null,
        ));

        $counter++;
    endwhile;

    wp_reset_query();
    return ob_get_clean();
}
