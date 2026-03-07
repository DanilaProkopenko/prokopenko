<?php
if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $post_card_link = $args['post_card_link'];
    $img_large = $args['img_large'];
    $img_medium_large = $args['img_medium_large'];
    $id = $args['id'];
    $width_class = $args['width_class'] ?? ''; // Класс ширины (опционально)
}

// Определяем финальную ссылку: если заполнен post_card_link, используем его вместо обычной ссылки на пост
$final_link = (isset($post_card_link) && !empty($post_card_link['url'])) ? $post_card_link['url'] : $link;
?>
<div class="post-card f-carousel__slide emerge <?= $width_class ?>">
    <a href=" <?= esc_html($final_link) ?>" class="post-card__thumb">
        <picture>
            <source media="(max-width: 768px)" srcset="<?= esc_html($img_medium_large) ?>" />
            <source media="(min-width: 769px)" srcset="<?= esc_html($img_large) ?>" />
            <img class="post-card__thumb__source" src="<?= esc_html($img_large) ?>" alt='Обложка записи' loading="lazy">
        </picture>
    </a>
    <p class="">
        <a href="<?= esc_html($final_link) ?>" class="post-card__content">
            <?= $title ?>
        </a>
    </p>
    <?= do_shortcode('[post_category]') ?>
</div>