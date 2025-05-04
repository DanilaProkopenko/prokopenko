<?php

if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $short_description = $args['short_description'];

    $img_thumbnail = $args['img_thumbnail'];
    $img_medium = $args['img_medium'];
    $img_medium_large = $args['img_medium_large'];
    $img_large = $args['img_large'];
    $id = $args['id'];

    $except = $args['except'];
    $gallery = $args['gallery'];
    $posts_count = $args['posts_count'];
    $post_thumb_video = $args['post_thumb_video'];

    $counter = $args['counter'] + 1;
}
?>
<div class="post-card__big f-carousel__slide custom-card card<?= $counter ?>" style="z-index: <?= $counter + 1 ?>">
    <div class="post-card__big__gallery">
        <div class="post-card__big__gallery__background">
            <img src="<?= esc_url($img_medium); ?>" alt="" class="post-card__big__gallery__background__source">
        </div>

        <div class="f-carousel post-card__big__gallery_carousel" data-gallery="<?= $id ?>" id="<?= $id ?>">
            <?php if ($post_thumb_video): ?>
                <div
                    data-img-src="<?= esc_url($img_medium); ?>"
                    data-thumb-src="<?= esc_url($post_thumb_video['sizes']['thumbnail']) ?>"
                    class="lazy_container f-carousel__slide _cover emerge">
                    <video
                        preload="auto"
                        no-controls
                        autoplay
                        loop
                        playsinline
                        muted
                        class="slide__video-video__source post-card__big__gallery__img__source _cover">
                        <source
                            src="<?php echo $post_thumb_video['url']; ?>"
                            type="video/mp4">
                    </video>
                </div>
            <?php else: ?>
                <div class="f-carousel__slide _cover emerge"
                    
                    data-img-src="<?= esc_url($img_medium); ?>"
                    data-thumb-src="<?= esc_url($img_medium); ?>">
                    <a href="<?= $link ?>"
                        class="post-card__big__gallery__img">
                        <picture>
                            <source media="(max-width: 768px)" srcset="<?= esc_url($img_large); ?>" />
                            <source media="(min-width: 769px)" srcset="<?= esc_url($img_large); ?>" />
                            <img class="post-card__big__gallery__img__source _cover" data-lazy-src="<?= esc_url($img_large); ?>" alt="Обложка записи" loading="lazy">
                        </picture>
                    </a>
                </div>
            <?php endif; ?>
            <?php
            if ($gallery) :
                foreach ($gallery as $image) :
                    $data_type = pathinfo($image['url'], PATHINFO_EXTENSION);
                    if ($data_type == 'mp4') : ?>
                        <div
                            data-img-src="<?= esc_url($image['url']) ?>"
                            data-thumb-src="<?= esc_url($image['sizes']['thumbnail']) ?>"
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
        </div>
    </div>
    <div class="post-card__big__content__wrapper">
        <div class="post-card__big__content">
            <!-- <a href="<?= $link ?> "class=" post-card__big__title">
                <h4 class="post-card__big__heading">
                    <?= $title ?>
                </h4>
            </a> -->
            <h4 class="post-card__big__heading">
                <a href="<?= $link ?> ">
                    <?= $title ?>
                </a>
            </h4>
            <div class="post-card__big__short-description">
                <?= $short_description ?>
                <?= do_shortcode('[post_category]') ?>
            </div>

            <?= do_shortcode('[block_post_meta]') ?>
        </div>
    </div>
</div>