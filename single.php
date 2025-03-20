<?php
/*
Template Name: Страница описания новостей
Template Post Type: post
*/
$title  = get_the_title();
$thumb = get_the_post_thumbnail_url(get_the_ID(), 'full');
$except = has_excerpt() ? get_the_excerpt() : null;
$post_id = get_the_ID();
?>

<?php get_header() ?>

<h1 class="wp-block-post-title">
    <?php single_post_title(); ?>
</h1>
<?php the_content(); ?>

<?php get_footer() ?>