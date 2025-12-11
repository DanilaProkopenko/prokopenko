<?php
// функции, необходимые для блока и только для блока
function getPostsCardFeed($posts_per_page = 50, $post__not_in = null, $tag = null, $category = null)
{
    ob_start();


    $args = array(
        'post_type' => ['post', 'pd-works'],
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
        'post__not_in' => [$post__not_in],
        // 'tax_query' => array(
        //     'relation' => 'AND',
        //     // array(
        //     //     'taxonomy' => 'category',
        //     //     'field' => 'id',
        //     //     'terms' => $category,
        //     //     'include_children' => true
        //     // ),
        //     array(
        //         'taxonomy' => 'post_tag',
        //         'field' => 'id',
        //         'terms' => $tag,
        //     )
        // )
    );

    $loop = new WP_Query($args);
    $posts_count = $loop->found_posts;

    $counter = 0;
    while ($loop->have_posts()) : $loop->the_post();
        $id = get_the_ID();

        $short_description = get_field('archive_short-description', $id);
        $archive_link = get_field('archive_link', $id);

        $feed_thumb = get_field('pd_worksfeed_thumb', $id);
        $feed_link = get_field('pd_worksfeed_link', $id);

        get_template_part('components/post-card/post-card__feed/post-card__feed', null, array(
            'title' => get_the_title(),
            'link' => get_the_permalink(),
            'id' => $id,
            // 'short_description' => $short_description,

            'feed_thumb' => $feed_thumb,
            'feed_link' => $feed_link,
            'counter' => $counter,

            'short_description' => $short_description,
            'archive_link' => $archive_link,
        ));

        $counter++;
    endwhile;

    wp_reset_query();
    return ob_get_clean();
}
