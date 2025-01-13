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
    $post_card_link = $args['post_card_link'];
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
            <? if ($post_thumb_video): ?>
                <div
                    data-img-src="<?= esc_url($img_medium); ?>"
                    data-thumb-src="<?= esc_url($post_thumb_video['sizes']['thumbnail']) ?>"
                    data-fancybox="<?= $id ?>"
                    class="lazy_container f-carousel__slide _cover">
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
            <? else: ?>
                <div class="f-carousel__slide _cover"
                    data-fancybox="<?= $id ?>"
                    data-img-src="<?= esc_url($img_medium); ?>"
                    data-thumb-src="<?= esc_url($img_medium); ?>">
                    <a href="<?= $link ?>"
                        class="post-card__big__gallery__img">
                        <picture>
                            <source media="(max-width: 768px)" srcset="<?= esc_url($img_large); ?>" />
                            <source media="(min-width: 769px)" srcset="<?= esc_url($img_large); ?>" />
                            <img class="post-card__big__gallery__img__source _cover" data-lazy-src="<?= esc_url($img_large); ?>" alt="Обложка записи <?= $title ?>" loading="lazy">
                        </picture>
                    </a>
                </div>
            <? endif; ?>
            <?php
            if ($gallery) :
                foreach ($gallery as $image) :
                    $data_type = pathinfo($image['url'], PATHINFO_EXTENSION);
                    if ($data_type == 'mp4') : ?>
                        <div
                            data-img-src="<?= esc_url($image['url']) ?>"
                            data-thumb-src="<?= esc_url($image['sizes']['thumbnail']) ?>"
                            data-fancybox="<?= $id ?>"
                            class="<?= $data_type ?> lazy_container f-carousel__slide">
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
                    <? else: ?>
                        <a
                            href="<?= $link ?>"
                            data-img-src="<?= esc_url($image['sizes']['medium']) ?>"
                            data-thumb-src="<?= esc_url($image['sizes']['medium']) ?>"
                            data-fancybox="<?= $id ?>" class="<?= $data_type ?> f-carousel__slide">
                            <picture>
                                <source media="(max-width: 768px)" srcset="<?= esc_url($image['sizes']['large']); ?>" />
                                <source media="(min-width: 769px)" srcset="<?= esc_url($image['sizes']['large']); ?>" />
                                <img class="post-card__big__gallery__img__source" data-lazy-src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']) ?>" loading="lazy">
                            </picture>
                        </a>
                    <? endif ?>
            <?php endforeach;
            endif;
            ?>
        </div>
    </div>
    <div class="post-card__big__content__wrapper">
        <div class="post-card__big__content">
            <a href="<?= $link ?> "
                class=" post-card__big__title">
                <h4 class="post-card__big__heading">
                    <?= $title ?>
                </h4>
            </a>
            <div class="post-card__big__short-description">
                <?= $short_description ?>
            </div>
            <?
            $post_meta_repeater = get_field('post_meta-repeater', $id);
            if (have_rows('post_meta-repeater', $id)) :
            ?>
                <div class="post-card__big__meta">
                    <?
                    while (have_rows('post_meta-repeater', $id)) : the_row();
                        $post_meta_variable = get_sub_field('post_meta-variable');
                        $post_meta_value = get_sub_field('post_meta-value');
                    ?>
                        <div class="post-card__big__meta__item">
                            <div class="post-card__big__meta__item__variable"><?= $post_meta_variable ?></div>
                            <div class="post-card__big__meta__item__value"><?= $post_meta_value ?></div>
                        </div>
                    <? endwhile; ?>
                </div>
            <? endif ?>
            <?
            $users = get_field("post_meta_team", $id);
            if ($users) :
            ?>
                <div class="post-card__meta__team">
                    <div class="post-card__meta__team__images__wrapper">
                        <? foreach ($users as $user) : ?>
                            <img src="<?= esc_attr(get_avatar_url($user['ID'])); ?>" alt="Аватар пользователя" class="post-card__meta__teaam__imge__source">
                        <? endforeach; ?>
                        <img src="<?= esc_attr(get_avatar_url('danilaprok20@gmail.com')); ?>" alt="Аватар пользователя" class="post-card__meta__teaam__imge__source">
                    </div>
                    <div class="post-card__meta__team__name">
                        Совместно с
                        <? foreach ($users as $user) : ?>
                            <a href="<?= esc_attr($user['user_url']) ?>" target="_blank">
                                <?= esc_attr($user['nickname']) ?>
                            </a>
                        <? endforeach; ?>
                    </div>
                </div>
            <? endif; ?>
        </div>
        <? if ($post_card_link) : ?>
            <div class="post-card__big__content__bottom">
                <?
                $link = $post_card_link;
                $link_url = $link['url'];
                $link_title = $link['title'];
                $link_target = $link['target'] ? $link['target'] : '_self';
                ?>
                <a class="link-button link-button_blue _big" href="<?php echo esc_url($link_url); ?>" target="<?php echo esc_attr($link_target); ?>">
                    <?php echo esc_html($link_title); ?>
                    <i class="link-button__border"></i>
                </a>
            </div>
        <? endif; ?>
    </div>
</div>