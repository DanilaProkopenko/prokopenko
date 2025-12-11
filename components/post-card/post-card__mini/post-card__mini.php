<?php

if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $short_description = $args['short_description'] ?? '';

    $img_thumbnail = $args['img_thumbnail'] ?? '';
    $img_medium = $args['img_medium'] ?? '';
    $img_medium_large = $args['img_medium_large'] ?? '';
    $img_large = $args['img_large'] ?? '';
    $id = $args['id'] ?? '';
    $counter = $args['counter'] ?? 0;

    $except = $args['except'] ?? '';
    $gallery_big = $args['gallery_big'] ?? [];
    $gallery_mini = $args['gallery_mini'] ?? [];
    $posts_count = $args['posts_count'] ?? 0;
    $post_thumb_video = $args['post_thumb_video'] ?? null;
}
?>
<!-- <div class="post-card__mini custom-card card <?= $counter ?> active"> -->

<!-- <div class="post-card__mini__image"> -->
<?php
if ($gallery_mini) :
    $value_counter = 0;
    foreach ($gallery_mini as $image) :
        $data_type = pathinfo($image['url'], PATHINFO_EXTENSION);
        $value_counter++;
        if ($value_counter == 1): ?>
            <? if ($data_type == 'mp4') : ?>
                <div class="post-card__mini__image-link__wrapper" data-counter="<?= $value_counter ?>">
                    <div class="post-card__mini__content">
                        <h3 class="post-card__mini__heading">
                            <a href="<?= $link ?>">
                                <?= $title ?>
                                <?= do_shortcode('[post_category]') ?>
                            </a>
                        </h3>
                    </div>
                    <a
                        href="<?= $link ?>"
                        data-img-src="<?= esc_url($image['url']) ?>"
                        data-thumb-src="<?= esc_url($image['sizes']['thumbnail']) ?>"
                        class="<?= $data_type ?> post-card__mini__image-link emerge">
                        <video
                            preload="auto"
                            no-controls
                            autoplay
                            loop
                            playsinline
                            muted
                            class="slide__video-video__source post-card__mini__gallery__img__source">
                            <source
                                src="<?php echo $image['url']; ?>"
                                type="video/mp4">
                        </video>
                        <?= do_shortcode('[post_category]') ?>

                    </a>
                </div>
            <?php else: ?>
                <div class="post-card__mini__image-link__wrapper" data-counter="<?= $value_counter ?>">
                    <div class="post-card__mini__content">
                        <h3 class="post-card__mini__heading">
                            <a href="<?= $link ?>">
                                <?= $title ?>
                                <?= do_shortcode('[post_category]') ?>
                            </a>
                        </h3>
                    </div>
                    <a
                        href="<?= $link ?>"
                        data-img-src="<?= esc_url($image['sizes']['medium']) ?>"
                        data-thumb-src="<?= esc_url($image['sizes']['medium']) ?>"
                        class="<?= $data_type ?> post-card__mini__image-link emerge">
                        <picture>
                            <source media="(max-width: 768px)" srcset="<?= esc_url($image['sizes']['large']); ?>" />
                            <source media="(min-width: 769px)" srcset="<?= esc_url($image['sizes']['large']); ?>" />
                            <img class="post-card__mini__gallery__img__source" src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']) ?>" loading="lazy">
                        </picture>
                    </a>
                </div>
            <?php endif ?>
        <? else: ?>
            <? if ($data_type == 'mp4') : ?>
                <div class="post-card__mini__image-link__wrapper"
                    data-counter="<?= $value_counter ?>">
                    <?= do_shortcode('[post_category]') ?>

                    <a
                        href="<?= $link ?>"
                        data-img-src="<?= esc_url($image['url']) ?>"
                        data-thumb-src="<?= esc_url($image['sizes']['thumbnail']) ?>"
                        class="<?= $data_type ?> post-card__mini__image-link emerge">
                        <video
                            preload="auto"
                            no-controls
                            autoplay
                            loop
                            playsinline
                            muted
                            class="slide__video-video__source post-card__mini__gallery__img__source">
                            <source
                                src="<?php echo $image['url']; ?>"
                                type="video/mp4">
                        </video>
                        <?= do_shortcode('[post_category]') ?>
                    </a>
                </div>
            <?php else: ?>
                <div class="post-card__mini__image-link__wrapper"
                    data-counter="<?= $value_counter ?>">
                    <?= do_shortcode('[post_category]') ?>

                    <a
                        href="<?= $link ?>"
                        data-img-src="<?= esc_url($image['sizes']['medium']) ?>"
                        data-thumb-src="<?= esc_url($image['sizes']['medium']) ?>"
                        class="<?= $data_type ?> post-card__mini__image-link emerge">
                        <picture>
                            <source media="(max-width: 768px)" srcset="<?= esc_url($image['sizes']['large']); ?>" />
                            <source media="(min-width: 769px)" srcset="<?= esc_url($image['sizes']['large']); ?>" />
                            <img class="post-card__mini__gallery__img__source" src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']) ?>" loading="lazy">
                        </picture>
                    </a>
                </div>
            <?php endif ?>
        <? endif; ?>
<?php endforeach;
endif;
?>
<!-- </div> -->


<!-- </div> -->