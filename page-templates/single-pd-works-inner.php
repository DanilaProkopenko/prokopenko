<?php
/* 
Template name: Одиночная страница Внутренняя 
Template Post Type: pd-works
*/

$title  = get_the_title();
$id = get_the_ID();
$thumb = get_the_post_thumbnail_url(get_the_ID(), 'full');
$except = has_excerpt() ? get_the_excerpt() : null;
$post_id = get_the_ID();

$img_large = get_the_post_thumbnail_url(get_the_ID(), 'large');
$img_medium_large = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');
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


<?php
global $post;

// Работаем только с pd-works
if ($post->post_type === 'pd-works') :

    // Если есть родитель — считаем, что это внутренняя страница
    $parent_id = $post->post_parent ? $post->post_parent : $post->ID;

    // Родительский пост (для заголовка и ссылки)
    $parent_post = get_post($parent_id);

    // ID текущего поста
    $current_id = get_queried_object_id();

    // Дочерние записи родителя (все внутренние страницы)
    $children = get_children([
        'post_type'   => 'pd-works',
        'post_parent' => $parent_id,
        'orderby'     => 'menu_order',
        'order'       => 'ASC',
        'post_status' => 'publish',
    ]);

    $short_description = get_field('post_short-description', $parent_id);

?>
    <div class="single__wrapper single-page--v1">
        <div class="single__content single-page--v1__content">
            <div class="post__navigation-wrapper pd_flex-25">
                <?php echo do_shortcode('[block_post_navigation]'); ?>
            </div>

            <div class="single-page__content pd_flex-75 wp-block-column is-layout-flow">

                <?php
                // Заголовок всегда берём у родителя
                ?>
                <h1 class="wp-block-post-title">
                    <?php echo esc_html(get_the_title($parent_post)); ?>
                </h1>

                <?php if ($children) : ?>
                    <ul class="single__tree title__caption list-style-none">
                        <!-- Родитель -->
                        <li>
                            <a
                                href="<?php echo esc_url(get_permalink($parent_post->ID)); ?>"
                                class="<?php echo $current_id === $parent_post->ID ? 'active' : ''; ?>">
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
                <?php endif; ?>

                <?php
                // Здесь уже контент текущей (внутренней) страницы
                echo do_shortcode('[post_category]');
                the_content();
                ?>
            </div>


        </div>

        <!-- <?php if ($children) : ?>
            <ul class="single__tree title__caption list-style-none pd_width_50">
                <h2>
                    <li>
                        <a
                            href="<?php echo esc_url(get_permalink($parent_post->ID)); ?>"
                            class="<?php echo $current_id === $parent_post->ID ? 'active' : ''; ?>">
                            <?php echo esc_html(get_the_title($parent_post)); ?>
                        </a>
                    </li>
                </h2>
                <?= $short_description ?>
                <ul>
                    <?php foreach ($children as $child) : ?>
                        <li>
                            <a
                                href="<?php echo esc_url(get_permalink($child->ID)); ?>"
                                class="<?php echo $current_id === $child->ID ? 'active' : ''; ?>">
                                <?php echo esc_html(get_the_title($child->ID)); ?>
                            </a>
                        </li>
                </ul>

            <?php endforeach; ?>
            </ul>
        <?php endif; ?> -->

        <p class="has-h-2-font-size pd_width_50 small-margin-top">Другие работы</p>
        <?php echo do_shortcode('[block_archive category=' . $archive_category . ' tag=' . $archive_tag .  ' post_not_in=' . $post_id . ']')
        ?>
    </div>
<?php
endif;
?>

<?php get_footer() ?>