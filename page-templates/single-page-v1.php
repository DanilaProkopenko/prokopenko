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
$tags = get_the_tags();
if (!empty($categories)) {
    $category_id = $categories[0]->term_id; // ID первой категории
}
if (!empty($tags)) {
    $first_tag = reset($tags); // Берём первый элемент массива
    $tag_id = $first_tag->term_id; // Выводим название
}
?>

<?php get_header() ?>

<div class="single__wrapper single-page--v1 ">
    <section class="single__title section _padding">
        <div class="single__title-heading">
            <h1 class="wp-block-post-title">
                <?php single_post_title(); ?>
            </h1>
        </div>
        <div class="pd_flex pd_flex-column">
            <div class="single__title-img emerge">
                <picture>
                    <source media="(max-width: 768px)" srcset="<?= esc_html($img_medium_large) ?>" />
                    <source media="(min-width: 769px)" srcset="<?= esc_html($img_large) ?>" />
                    <img class=" wp-block-image size-full" fetchpriority="high" decoding="async" src="<?= esc_html($img_large) ?>" alt='Обложка записи' loading="lazy">
                </picture>
                <?= do_shortcode('[post_category]') ?>
            </div>
            <div class="single__title-meta">
                <?= do_shortcode('[block_post_meta]') ?>
            </div>
        </div>
    </section>
    <div class="single__content small-margin-top">
        <div class="post__navigation-wrapper pd_flex-25">
            <?php echo do_shortcode('[block_post_navigation]')
            ?>
        </div>
        <div class="single-page__content pd_flex-75 wp-block-column is-layout-flow">
            <?php the_content();
            ?>

        </div>
        <!-- </div> -->
    </div>

    <h2 class="_padding">Другие работы</h2>
    <div style="height:var(--wp--preset--spacing--30)" aria-hidden="true" class="wp-block-spacer"></div>
    <?php echo do_shortcode('[block_archive tag=' . $tag_id . ']') ?>

</div>

<?php get_footer() ?>