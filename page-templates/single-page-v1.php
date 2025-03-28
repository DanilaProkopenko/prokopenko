<?php
/* 
Template name: Одиночная страница V1 
Template Post Type: post
*/

$title  = get_the_title();
$id = get_the_ID();
$thumb = get_the_post_thumbnail_url(get_the_ID(), 'full');
$except = has_excerpt() ? get_the_excerpt() : null;
$post_id = get_the_ID();

$img_large = get_the_post_thumbnail_url(get_the_ID(), 'large');
$img_medium_large = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');
$short_description = get_field('post_short-description', $id);

$categories = get_the_category();
if (!empty($categories)) {
    $category_id = $categories[0]->term_id; // ID первой категории
}
?>

<?php get_header() ?>

<div class="single__wrapper single-page--v1">
    <div class="single__content main-padding">
        <div class="single__title">

            <?= do_shortcode('[post_category]') ?>
            <div class="single__title-heading">
                <h1 class="wp-block-post-title">
                    <?php single_post_title(); ?>
                </h1>
            </div>
            <div class="pd_flex pd_flex-row pd_flex-column-mob pd_flex-aligned-bottom">
                <div class="single__title-img pd_flex-75">
                    <picture>
                        <source media="(max-width: 768px)" srcset="<?= esc_html($img_medium_large) ?>" />
                        <source media="(min-width: 769px)" srcset="<?= esc_html($img_large) ?>" />
                        <img class=" wp-block-image size-full" fetchpriority="high" decoding="async" src="<?= esc_html($img_large) ?>" alt='Обложка записи' loading="lazy">
                    </picture>
                </div>
                <div class="single__title-meta pd_flex-25">
                    <div class="single__title-meta wp-block-column is-vertically-aligned-bottom is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:25%">
                        <?= do_shortcode('[block_post_meta]') ?>
                    </div>
                </div>
            </div>
        </div>
        <?= do_shortcode('[pd_spacer]') ?>
        <!-- <div class="pd_flex pd_flex-row pd_flex-column-mob pd_flex-aligned-bottom">
            <div class="post__navigation-wrapper pd_flex-25">
                <?php // do_shortcode('[block_post_navigation]') 
                ?>
            </div>
            <div class="single-page__content single__title-img pd_flex-75">
                <?php //the_content(); 
                ?>
            </div>
        </div> -->

        <div class="wp-block-columns is-layout-flex wp-container-core-columns-is-layout-2 wp-block-columns-is-layout-flex">
            <div class="post__navigation-wrapper wp-block-column is-layout-flow wp-block-column-is-layout-flow" style="flex-basis:25%">
                <?php echo do_shortcode('[block_post_navigation]') ?>
            </div>

            <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow single-page__content" style="flex-basis:75%">
                <?= $short_description ?>

                <?php the_content(); ?>
                <?php //previous_post_link('%link','← Предыдущая статья из категории %title',true );
                ?>
                <?php //next_post_link('%link', 'Следующая статья из категории →', true); 
                ?>
            </div>
        </div>
    </div>
    <?php echo do_shortcode('[block_archive category=' . $category_id . ']') ?>
</div>

<?php get_footer() ?>