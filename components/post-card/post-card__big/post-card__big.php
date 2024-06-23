<?php
if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $short_description = $args['short_description'];

    $img_large = $args['img_large'];
    $thumb_img_medium_large = $args['img_medium_large'];
    $id = $args['id'];

    $except = $args['except'];
    $gallery = $args['gallery'];
}

?>
<div class="post-card__big">
    <div class="post-card__big__content__wrapper">
        <div class="post-card__big__content">
            <div class="post-card__big__title">
                <div class="post-card__big__heading">
                    <?= $title ?>
                </div>
                <div class="post-card__big__short-description">
                    <?= $short_description ?>
                    <?
                    // echo '<pre>';
                    // var_dump($gallery);
                    // echo '</pre>';
                    ?>
                    <!-- Сделал в команде в студии zerna.design новый сайт для производителя водосточных систем. Упор был направлен на продвижения покрытий.
                    Дизайнер в широком смысле этого слова Работаю и с сайтами, и с различной полиграфией, и также со всяким промо–продуктом, по типу: баннеры, стенды, вывески. -->
                </div>
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
        </div>
        <?
        $users = get_field("post_meta_team", $id);
        if ($users) :
        ?>
            <div class="post-card__meta__team">
                <div class="post-card__meta__team__images__wrapper">
                    <img src="<?= esc_attr(get_avatar_url('danilaprok20@gmail.com')); ?>" alt="Аватар пользователя" class="post-card__meta__teaam__imge__source">
                    <? foreach ($users as $user) : ?>
                        <img src="<?= esc_attr(get_avatar_url($user['ID'])); ?>" alt="Аватар пользователя" class="post-card__meta__teaam__imge__source">
                    <? endforeach; ?>
                </div>
                <div class="post-card__meta__team__name">
                    Совместно с
                    <? foreach ($users as $user) : ?>
                        <a href="<?= esc_attr($user['user_url']) ?>">
                            <?= esc_attr($user['nickname']) ?>
                        </a>
                    <? endforeach; ?>
                </div>
            </div>
        <? endif; ?>
    </div>

    <div class="post-card__big__gallery">
        <div class="post-card__big__gallery__background f-carousel" data-gallery="<?= $id ?>" id="1">
            <div class="f-carousel__slide">
                <picture>
                    <source media="(max-width: 768px)" srcset="<?= esc_url($thumb_img_medium_large); ?>" />
                    <source media="(min-width: 769px)" srcset="<?= esc_url($thumb_img_medium_large); ?>" />
                    <img class="post-card__big__gallery__img__source _cover" src="<?= esc_url($thumb_img_medium_large); ?>" alt="Обложка записи <?= $title ?>" loading="lazy">
                </picture>
            </div>
            <?php
            if ($gallery) :
                foreach ($gallery as $image) : ?>
                    <div class=" f-carousel__slide">
                        <picture>
                            <source media="(max-width: 768px)" srcset="<?= esc_url($image['sizes']['medium']); ?>" />
                            <source media="(min-width: 769px)" srcset="<?= esc_url($image['sizes']['medium']); ?>" />
                            <img class="post-card__big__gallery__img__source" src="<?php echo esc_url($image['sizes']['medium']); ?>" alt="<?php echo esc_attr($image['alt']) ?>" loading="lazy">
                        </picture>
                    </div>
            <?php endforeach;
            endif;
            ?>
        </div>
        <div class="f-carousel post-card__big__gallery_carousel" data-gallery="<?= $id ?>" id="2">
            <a href="<?= esc_url($thumb_img_medium_large); ?> " data-fancybox="<?= $id ?>" class="f-carousel__slide">
                <picture>
                    <source media="(max-width: 768px)" srcset="<?= esc_url($thumb_img_medium_large); ?>" />
                    <source media="(min-width: 769px)" srcset="<?= esc_url($thumb_img_medium_large); ?>" />
                    <img class="post-card__big__gallery__img__source _cover" src="<?= esc_url($thumb_img_medium_large); ?>" alt="Обложка записи <?= $title ?>" loading="lazy">
                </picture>
            </a>
            <?php
            if ($gallery) :
                foreach ($gallery as $image) : ?>
                    <a href="<?= esc_url($image['sizes']['2048x2048']); ?>" data-fancybox="<?= $id ?>" class=" f-carousel__slide">
                        <picture>
                            <source media="(max-width: 768px)" srcset="<?= esc_url($image['sizes']['1536x1536']); ?>" />
                            <source media="(min-width: 769px)" srcset="<?= esc_url($image['sizes']['2048x2048']); ?>" />
                            <img class="post-card__big__gallery__img__source" src="<?php echo esc_url($image['sizes']['2048x2048']); ?>" alt="<?php echo esc_attr($image['alt']) ?>" loading="lazy">
                        </picture>
                    </a>
            <?php endforeach;
            endif;
            ?>
        </div>
    </div>
</div>