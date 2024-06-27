<?php
$header_avatar_title = get_field('header_avatar_title', 'options');
$header_avatar_caption = get_field('header_avatar_caption', 'options');
$header_avatar_image = get_field('header_avatar_image', 'options');

$header_description = get_field('header_description', 'options');

$header_year = get_field('header_year', 'options');
$header_last_update = get_field('header_last-update', 'options');


?>

<header class="header__wrapper">
    <div class="header">
        <div class="header__top">
            <a href="/" class="header__top__logo">
                <h1>
                    prokopenko
                </h1>
            </a>
            <div class="header__top__burger" id="burger-icon">
                <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2H21M0 8.27586H21M0 15H21" stroke="white" stroke-width="2.5" />
                </svg>
            </div>

        </div>
        <div class="header__burger__menu" id="burger-menu">

        </div>
        <div class="header__description">
            <div class="header__description__avatar">
                <a href="<?= esc_html($header_avatar_image['sizes']['medium']); ?>" data-fancybox data-caption="Это я">
                    <img src="<?= esc_html($header_avatar_image['sizes']['thumbnail']); ?>" alt="" class="header__description__avatar__source">
                </a>
                <div class="header__description__avatar__title">
                    <div class="header__description__avatar__title_name">
                        <?= $header_avatar_title ?>
                    </div>
                    <div class="header__description__avatar__title_caption">
                        <?= $header_avatar_caption ?>
                    </div>
                </div>
            </div>
            <div class="header__description__content">
                <?= $header_description ?>
            </div>
            <?
            $args = array(
                'menu' => 'menu_contact',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'header__description__links',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>

        </div>
        <div class="header__bottom">
            <?
            // $args = array(
            //     'menu' => 'menu_contact',
            //     'depth'    => 0,
            //     'container' => 'div',
            //     'menu_class' => 'header__bottom__links',
            //     'fallback_cb' => false
            // );

            // wp_nav_menu($args);
            ?>
            <div class="header__bottom__year">
                <div class="header__bottom__year__title">
                    <?= $header_year ?>
                </div>
                <div class="header__bottom__year__update">
                    Last update: <?= $header_last_update ?>
                </div>
            </div>
        </div>
    </div>
</header>