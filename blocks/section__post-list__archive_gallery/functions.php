<?php
// функции, необходимые для блока и только для блока
function getPostsArchiveGallery($posts_per_page = 50, $post__not_in = null, $tag = null, $category = null)
{
    ob_start();
    $args = array(
        'post_type' => 'post',
        'posts_per_page' => $posts_per_page,
        'post_status' => 'publish',
        'orderby' => 'date',
        'order' => 'DESC',
        // 'post__not_in' => [$post__not_in],
        'post__not_in' => [17],
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'relation' => 'OR',
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
        )
    );

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
