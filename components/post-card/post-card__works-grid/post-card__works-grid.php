<?php

if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $post_card_link = $args['post_card_link'];

    $img_thumbnail = $args['img_thumbnail'] ?? '';
    $img_medium = $args['img_medium'] ?? '';
    $img_large = $args['img_large'] ?? '';
    $id = $args['id'] ?? '';
    $counter = $args['counter'] ?? 0;
    $width_class = $args['width_class'] ?? 'pd_work_width-25';

    $post_thumb_video = $args['post_thumb_video'] ?? null;
}

// Определяем финальную ссылку: если заполнен post_card_link, используем его вместо обычной ссылки на пост
$final_link = (isset($post_card_link) && !empty($post_card_link['url'])) ? $post_card_link['url'] : $link;
?>
<div class="f-carousel__slide post-card__works-grid active <?= $width_class ?>" data-post-id="<?= $id ?>">
    <div class="post-card__works-grid__image-wrapper">
        <?php if ($post_thumb_video): ?>
            <a href="<?= $final_link ?>" class="post-card__works-grid__image">
                <video
                    preload="auto"
                    no-controls
                    autoplay
                    loop
                    playsinline
                    muted
                    class="post-card__works-grid__image__source">
                    <source src="<?php echo $post_thumb_video['url']; ?>" type="video/mp4">
                </video>
            </a>
        <?php else: ?>
            <a href="<?= $final_link ?>" class="post-card__works-grid__image">
                <picture>
                    <source media="(max-width: 768px)" srcset="<?= esc_url($img_large); ?>" />
                    <source media="(min-width: 769px)" srcset="<?= esc_url($img_large); ?>" />
                    <img class="post-card__works-grid__image__source" src="<?= esc_url($img_large); ?>" alt="<?= esc_attr($title); ?>" loading="lazy">
                </picture>
            </a>
        <?php endif; ?>
    </div>
    <div class="post-card__works-grid__content">
        <p class="post-card__works-grid__title">
            <a href="<?= $final_link ?>">
                <?= $title ?>
            </a>
        </p>
        <?php echo do_shortcode('[post_category]') ?>
    </div>
</div>