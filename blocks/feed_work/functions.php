<?php
// функции, необходимые для блока и только для блока
function getPostsCardFeed($posts_per_page = 50, $post__not_in = null, $tag = null, $category = null)
{
    ob_start();


    $args = array(
        'post_type' => 'post',
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
        'post__not_in' => [$post__not_in],
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'category',
                'field' => 'id',
                'terms' => $category,
                'include_children' => true
            ),
            array(
                'taxonomy' => 'post_tag',
                'field' => 'id',
                'terms' => $tag,
            )
        )
    );

    $loop = new WP_Query($args);
    $posts_count = $loop->found_posts;

    $counter = 0;
    while ($loop->have_posts()) : $loop->the_post();
        $id = get_the_ID();

        $img_thumbnail = get_the_post_thumbnail_url(get_the_ID(), 'thumbnail');
        $img_medium = get_the_post_thumbnail_url(get_the_ID(), 'medium');
        $img_large = get_the_post_thumbnail_url(get_the_ID(), 'large');
        $img_medium_large = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');
        $short_description = get_field('post_short-description', $id);
        $post_thumb_video = get_field('post_thumb_video', $id);

        $feed_thumb = get_field('feed-thumb', $id);
        $feed_link = get_field('feed-link', $id);

        get_template_part('components/post-card/post-card__feed/post-card__feed', null, array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
            'id' => $id,

            'img_thumbnail' => $img_thumbnail,
            'img_large' => $img_large,
            'img_medium_large' => $img_medium_large,
            'img_medium' => $img_medium,
            'short_description' => $short_description,

            'except' =>  has_excerpt() ? get_the_excerpt() : null,
            'gallery' => get_field('post_card_gallery', $id),
            'posts_count' => $posts_count,
            'post_thumb_video' => $post_thumb_video,

            'feed_thumb' => $feed_thumb,
            'feed_link' => $feed_link,
            'counter' => $counter,
        ));

        $counter++;
    endwhile;

    wp_reset_query();
    return ob_get_clean();
}
