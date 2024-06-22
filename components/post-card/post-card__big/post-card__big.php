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
<div class="post-card__big main-padding">
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
            <div class="post-card__big__meta">
                <div class="post-card__big__meta__item">
                    <div class="post-card__big__meta__item__variable">Год</div>
                    <div class="post-card__big__meta__item__value">2024</div>
                </div>
                <div class="post-card__big__meta__item">
                    <div class="post-card__big__meta__item__variable">Роль</div>
                    <div class="post-card__big__meta__item__value">Дизайнер, разработчик</div>
                </div>
                <div class="post-card__big__meta__item">
                    <div class="post-card__big__meta__item__variable">Делал</div>
                    <div class="post-card__big__meta__item__value">Концепт, UI/UX дизайн, прототип, разработка</div>
                </div>
                <div class="post-card__big__meta__item">
                    <div class="post-card__big__meta__item__variable">Сайт</div>
                    <div class="post-card__big__meta__item__value">nika-yug.ru</div>
                </div>
            </div>
        </div>
        <div class="post-card__meta__team">
            <div class="post-card__meta__team__images__wrapper">
                <img src="" alt="" class="post-card__meta__teaam__imge__source">
                <img src="" alt="" class="post-card__meta__team__image__source">
            </div>
            <div class="post-card__meta__team__name">
                Совместно с <a href="https://www.zerna.design">zerna.design</a>
            </div>
        </div>
    </div>
    <div class="post-card__big__gallery">
        <div class="f-carousel">
            <div class="f-carousel__slide">
                <picture>
                    <source media="(max-width: 768px)" srcset="<?= esc_url($thumb_img_medium_large); ?>" />
                    <source media="(min-width: 769px)" srcset="<?= esc_url($thumb_img_medium_large); ?>" />
                    <img class="post-card__big__gallery__img__source" src="<?= esc_url($thumb_img_medium_large); ?>" alt="Обложка записи <?= $title ?>" loading="lazy">
                </picture>
            </div>
            <?php
            if ($gallery) :
                foreach ($gallery as $image) : ?>
                    <div class="f-carousel__slide">
                        <picture>
                            <source media="(max-width: 768px)" srcset="<?= esc_url($image['sizes']['1536x1536']); ?>" />
                            <source media="(min-width: 769px)" srcset="<?= esc_url($image['sizes']['2048x2048']); ?>" />
                            <img class="post-card__big__gallery__img__source" src="<?php echo esc_url($image['sizes']['2048x2048']); ?>" alt="<?php echo esc_attr($image['alt']) ?>" loading="lazy">
                        </picture>
                    </div>
            <?php endforeach;
            endif;
            ?>
        </div>
    </div>
</div>