<?php
// функции, необходимые для блока и только для блока

/**
 * Получить работы (pd-works) для сетки с фильтрацией
 */
function getWorksGrid($posts_per_page = 50, $post__not_in = null, $tag = null, $category = null)
{
    ob_start();

    $args = array(
        'post_type' => 'pd-works',
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
        'post__not_in' => $post__not_in ? [$post__not_in] : [],
        'post_parent' => 0,
    );

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
    $posts_count = $loop->found_posts;

    $counter = 0;
    while ($loop->have_posts()) : $loop->the_post();
        $id = get_the_ID();

        $img_thumbnail = get_the_post_thumbnail_url(get_the_ID(), 'thumbnail');
        $img_medium = get_the_post_thumbnail_url(get_the_ID(), 'medium');
        $img_large = get_the_post_thumbnail_url(get_the_ID(), 'large');
        $img_medium_large = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');
        $post_thumb_video = get_field('post_thumb_video', $id);
        $post_work_width = get_field('post_work_width', $id) ?: '25'; // Дефолт 25%
        $width_class = 'pd_work_width-' . $post_work_width;
        $post_card_link = get_field('post_card_link', $id);

        get_template_part('components/post-card/post-card__works-grid/post-card__works-grid', null, array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
            'id' => $id,
            'post_card_link' => $post_card_link,

            'img_thumbnail' => $img_thumbnail,
            'img_large' => $img_large,
            'img_medium_large' => $img_medium_large,
            'img_medium' => $img_medium,

            'posts_count' => $posts_count,
            'post_thumb_video' => $post_thumb_video,
            'counter' => $counter,
            'width_class' => $width_class,
        ));

        $counter++;
    endwhile;

    wp_reset_query();
    return ob_get_clean();
}
