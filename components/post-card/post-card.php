<?php
if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $img_large = $args['img_large'];
    $img_medium_large = $args['img_medium_large'];

    $except = $args['except'];
}
?>
<div class="post-card">
    <a href=" <?= esc_html($link) ?>" class="post-card__thumb">
        <picture>
            <source media="(max-width: 768px)" srcset="<?= esc_html($img_medium_large) ?>" />
            <source media="(min-width: 769px)" srcset="<?= esc_html($img_large) ?>" />
            <img class="post-card__thumb__source" src="<?= esc_html($img_large) ?>" alt="Изображение новости «<?= $title ?>»" loading="lazy">
        </picture>
    </a>
    <a href="<?= esc_html($link) ?>" class="post-card__content">
        <div class="post-card__heading h5">
            <?= $title ?>
        </div>
        <? if ($except) : ?>
            <div class="post-card__except">
                <?= $except ?>
            </div>
        <? endif ?>
    </a>
</div>