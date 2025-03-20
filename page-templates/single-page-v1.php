<?php
/* 
Template name: Одиночная страница V1 
Template Post Type: post
*/

$title  = get_the_title();
$thumb = get_the_post_thumbnail_url(get_the_ID(), 'full');
$except = has_excerpt() ? get_the_excerpt() : null;
$post_id = get_the_ID();
?>

<?php get_header() ?>

<div class="single__wrapper single-page--v1">
    <div class="single__content main-padding">
        <h1 class="wp-block-post-title">
            <?php single_post_title(); ?>
        </h1>
        <div class="wp-block-columns are-vertically-aligned-bottom is-layout-flex wp-container-core-columns-is-layout-1 wp-block-columns-is-layout-flex">
            <div class="wp-block-column is-vertically-aligned-bottom is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:75%">
                <figure class="wp-block-image size-full"><img fetchpriority="high" decoding="async" width="1847" height="1580" src="http://localhost/local-prokopenko/wp-content/uploads/2024/06/porfolio_pinta_cover_small.jpg" alt="" class="wp-image-910" style="aspect-ratio:16/9;object-fit:cover" srcset="http://localhost/local-prokopenko/wp-content/uploads/2024/06/porfolio_pinta_cover_small.jpg 1847w, http://localhost/local-prokopenko/wp-content/uploads/2024/06/porfolio_pinta_cover_small-300x257.jpg 300w, http://localhost/local-prokopenko/wp-content/uploads/2024/06/porfolio_pinta_cover_small-1024x876.jpg 1024w, http://localhost/local-prokopenko/wp-content/uploads/2024/06/porfolio_pinta_cover_small-768x657.jpg 768w, http://localhost/local-prokopenko/wp-content/uploads/2024/06/porfolio_pinta_cover_small-1536x1314.jpg 1536w" sizes="(max-width: 1847px) 100vw, 1847px"></figure>
            </div>

            <div class="wp-block-column is-vertically-aligned-bottom is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:25%">
                <?= do_shortcode('[block_post_meta]') ?>
            </div>
        </div>
        <?= do_shortcode('[pd_spacer]') ?>
        <div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-2 wp-block-columns-is-layout-flex">
            <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:25%">
                <?= do_shortcode('[block_post_navigation]') ?>
            </div>

            <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow single-page__content" style="flex-basis:75%">
                <?php the_content(); ?>
            </div>
        </div>
    </div>
</div>
<?= do_shortcode('[block_archive]') ?>

<?php get_footer() ?>