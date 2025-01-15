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

<!-- <div class="single-page main-padding"> -->
    <?php the_content(); ?>
<!-- </div> -->

<?php get_footer() ?>