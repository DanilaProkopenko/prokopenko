<?php
if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $img_large = $args['img_large'];
    $img_medium_large = $args['img_medium_large'];
    $id = $args['id'];
}
?>
<div class="post-card f-carousel__slide emerge">
    <a href=" <?= esc_html($link) ?>" class="post-card__thumb">
        <picture>
            <source media="(max-width: 768px)" srcset="<?= esc_html($img_medium_large) ?>" />
            <source media="(min-width: 769px)" srcset="<?= esc_html($img_large) ?>" />
            <img class="post-card__thumb__source" src="<?= esc_html($img_large) ?>" alt='Обложка записи' loading="lazy">
        </picture>
    </a>
    <p class="">
        <a href="<?= esc_html($link) ?>" class="post-card__content">
            <?= $title ?>
        </a>
    </p>
    <?= do_shortcode('[post_category]') ?>
</div>