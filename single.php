<?php
/*
Template Name: Страница описания новостей
Template Post Type: post
*/
$title  = get_the_title();
$thumb = get_the_post_thumbnail_url(get_the_ID(), 'full');
$except = has_excerpt() ? get_the_excerpt() : null;
$post_id = get_the_ID();
?>

<?php get_header() ?>

<div class="single-page">
    <section class="single-page__header main-width main-padding section">
        <div class="single-page__header__content">
            <h1 class="single-page__header__content__heading">
                <?= $title; ?>
            </h1>
            <? if ($except) : ?>
                <div class="single-page__header__content__except">
                    <?= $except; ?>
                </div>
            <? endif ?>
        </div>
        <div class="single-page__header__img">
            <img src="<?= esc_url($thumb) ?>" alt="" class="single-page__header__img__source">
        </div>
    </section>

    <section class="single-page__content section main-padding">
        <?php the_content(); ?>
    </section>

    <section class="single-page__other-news section main-width">
        <h3 class="single-page__other-news__heading main-padding">
            Другие новости
        </h3>
    </section>
</div>

<?php get_footer() ?>