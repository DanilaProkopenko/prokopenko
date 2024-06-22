<?php
// функции, необходимые для блока и только для блока
function getPostsCardBig($posts_per_page = 50, $post__not_in = null)
{
    ob_start();
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
        'post__not_in' => [$post__not_in],
    );

    $loop = new WP_Query($args);
    $counter = 0;
    while ($loop->have_posts()) : $loop->the_post();
        $id = get_the_ID();

        $img_large = get_the_post_thumbnail_url(get_the_ID(), 'large');
        $img_medium_large = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');
        $short_description = get_field('post_short-description', $id);

        get_template_part('components/post-card/post-card__big/post-card__big', null, array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
            'id' => $id,

            'img_large' => $img_large,
            'img_medium_large' => $img_medium_large,
            'short_description' => $short_description,

            'except' =>  has_excerpt() ? get_the_excerpt() : null,
            'gallery' => get_field('post_card_gallery', $id),
        ));

        $counter++;
    endwhile;

    wp_reset_query();
    return ob_get_clean();
}
