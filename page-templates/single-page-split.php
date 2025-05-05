<?php
/* 
Template name: Одиночная страница Split 
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


$post_media = get_field('post_media', $id);
?>

<?php get_header() ?>

<div class="single__wrapper">
    <div class="split-container" id="split-container">
        <div class="split-left" id="media-block">
            <div class="content-wrapper">
                <!-- Картинки или видео -->
                <?php
                if ($post_media) :
                    foreach ($post_media as $image) :
                        $data_type = pathinfo($image['url'], PATHINFO_EXTENSION);
                        if ($data_type == 'mp4') : ?>
                            <!-- data-img-src="<?= esc_url($image['url']) ?>"
                     data-thumb-src="<?= esc_url($image['sizes']['thumbnail']) ?>" -->
                            <div
                                class="<?= $data_type ?> lazy_container f-carousel__slide emerge">
                                <video
                                    preload="auto"
                                    no-controls
                                    autoplay
                                    loop
                                    playsinline
                                    muted
                                    class="slide__video-video__source post-card__big__gallery__img__source">
                                    <source
                                        src="<?php echo $image['url']; ?>"
                                        type="video/mp4">
                                </video>
                            </div>
                        <?php else: ?>
                            <a
                                href="<?= $link ?>"
                                data-img-src="<?= esc_url($image['sizes']['medium']) ?>"
                                data-thumb-src="<?= esc_url($image['sizes']['medium']) ?>"
                                class="<?= $data_type ?> f-carousel__slide emerge">
                                <picture>
                                    <source media="(max-width: 768px)" srcset="<?= esc_url($image['sizes']['large']); ?>" />
                                    <source media="(min-width: 769px)" srcset="<?= esc_url($image['sizes']['large']); ?>" />
                                    <img class="post-card__big__gallery__img__source" data-lazy-src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']) ?>" loading="lazy">
                                </picture>
                            </a>
                        <?php endif ?>
                <?php endforeach;
                endif;
                ?>
                <!-- ... -->
            </div>
        </div>

        <div class="split-right" id="text-block">
            <div class="single__content" id="text-block-content">
                <div class="single-page__content pd_flex-75 wp-block-column is-layout-flow">
                    <h1 class="wp-block-post-title">
                        <?php single_post_title(); ?>
                    </h1>
                    <div class="single__short-description">
                        <?= $short_description ?>
                        <?= do_shortcode('[post_category]') ?>
                    </div>
                    <?php //echo do_shortcode('[block_post_meta]') 
                    ?>
                    <div class="single-page-content">
                        <?php the_content();
                        ?>
                    </div>
                    <div class="post__navigation-wrapper pd_flex-25">
                        <?php echo do_shortcode('[block_post_navigation]')
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <p class="_padding has-h-2-font-size small-margin-all">Другие работы</p>
    <?php echo do_shortcode('[block_archive tag=' . $tag_id . ']')
    ?>

</div>

<?php get_footer() ?>