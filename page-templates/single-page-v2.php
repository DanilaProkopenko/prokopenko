<?php
/* 
Template name: Одиночная страница V2
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

$category_id = null;
if (!empty($categories)) {
    $first_category = $categories[0];
    // Если у категории есть родитель, используем его ID, иначе используем саму категорию
    $category_id = $first_category->parent ? $first_category->parent : $first_category->term_id;
}

$tag_id = null;
if (!empty($tags)) {
    $first_tag = reset($tags); // Берём первый элемент массива
    $tag_id = $first_tag->term_id; // Выводим название
}
?>

<?php get_header() ?>

<div class="single__wrapper single-page--v1 ">
    <div class="single__content">
        <!-- <div class="post__navigation-wrapper pd_flex-25">
            <?php //echo do_shortcode('[block_post_navigation]')
            ?>
        </div>
        <div class="single-page__content pd_flex-75 wp-block-column is-layout-flow">
            <h1 class="wp-block-post-title">
                <?php single_post_title(); ?>
            </h1>
            <?php // echo do_shortcode('[post_category]') 
            ?>
            <?= $short_description ?>
            <?php //echo do_shortcode('[block_post_meta]') 
            ?>
        </div> -->
        <?php the_content();
        ?>
    </div>

    <p class="_padding has-h-2-font-size small-margin-all">Другие работы</p>
    <?php echo do_shortcode('[block_archive tag=' . $tag_id . ' post_not_in=' . $post_id . ']') ?>

</div>

<?php get_footer() ?>