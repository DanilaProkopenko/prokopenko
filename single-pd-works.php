<?php
/* 
Template name: Одиночная страница V1 
Template Post Type: post, pd-works
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
$tag_id = null;

// Получаем категорию с её родителем если есть
if (!empty($categories)) {
    $first_category = $categories[0];
    $category_id = $first_category->parent ? $first_category->parent : $first_category->term_id;
}

// Получаем первый тег
if (!empty($tags)) {
    $first_tag = reset($tags);
    $tag_id = $first_tag->term_id;
}

// Логика выбора фильтра:
// 1. Если есть тег - используем тег И родительскую категорию
// 2. Если нет тега но есть категория - используем родительскую категорию
// 3. Если нет категории но есть тег - используем тег
$archive_category = null;
$archive_tag = null;

if ($tag_id) {
    // Есть тег - используем его с категорией
    $archive_tag = $tag_id;
    $archive_category = $category_id;
} elseif ($category_id) {
    // Нет тега, но есть категория
    $archive_category = $category_id;
} elseif ($tag_id) {
    // Только тег
    $archive_tag = $tag_id;
}
?>

<?php get_header() ?>

<div class="single__wrapper single-page--v1 ">
    <div class="single__content single-page--v1__content">
        <div class="post__navigation-wrapper pd_flex-25">
            <?php echo do_shortcode('[block_post_navigation]')
            ?>
        </div>
        <div class="single-page__content pd_flex-75 wp-block-column is-layout-flow">
            <h1 class="wp-block-post-title">
                <?php single_post_title(); ?>
            </h1>

            <?php
            global $post;

            if ($post->post_type === 'pd-works') :

                // ID текущего поста
                $current_id = get_queried_object_id();

                $children = get_children([
                    'post_type'   => 'pd-works',
                    'post_parent' => $post->ID,
                    'orderby'     => 'menu_order',
                    'order'       => 'ASC',
                    'post_status' => 'publish',
                ]);

                if ($children) : ?>
                    <ul class="single__tree title__caption list-style-none">
                        <li>
                            <!-- Родитель -->
                            <a
                                href="<?php echo esc_url(get_permalink($post->ID)); ?>"
                                class="<?php echo $current_id === $post->ID ? 'active' : ''; ?>">
                                <?php //echo esc_html(get_the_title($post->ID)); 
                                ?>
                                Описание
                            </a>
                        </li>

                        <?php foreach ($children as $child) : ?>
                            <li>
                                <a
                                    href="<?php echo esc_url(get_permalink($child->ID)); ?>"
                                    class="<?php echo $current_id === $child->ID ? 'active' : ''; ?>">
                                    <?php echo esc_html(get_the_title($child->ID)); ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
            <?php endif;

            endif;
            ?>


            <?php echo do_shortcode('[post_category]')
            ?>
            <?= $short_description ?>

            <?php the_content(); ?>
            <?php //echo do_shortcode('[block_post_meta]')?>
        </div>
    </div>

    <p class="has-h-2-font-size pd_width_50 small-margin-top">Другие работы</p>
    <?php echo do_shortcode('[block_archive category=' . $archive_category . ' tag=' . $archive_tag .  ' post_not_in=' . $post_id . ']') ?>

</div>

<?php get_footer() ?>