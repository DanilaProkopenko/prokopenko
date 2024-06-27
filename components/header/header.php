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
                <div class="bar"></div>
            </div>
        </div>
        <div class="header__burger__menu" id="burger-menu">
            <?
            $args = array(
                'menu' => 'burger',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'header__burger__links',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>
        </div>
        <div class="header__navigation">
            <?
            $args = array(
                'menu' => 'main',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'header__navigation__links',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>

        </div>
        <div class="header__description">
            <!-- <div class="header__description__avatar">
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
            </div> -->
            <!-- <div class="header__description__content">
                <?= $header_description ?>
            </div> -->
            <?
            // $args = array(
            //     'menu' => 'menu_contact',
            //     'depth'    => 0,
            //     'container' => 'div',
            //     'menu_class' => 'header__description__links',
            //     'fallback_cb' => false
            // );

            // wp_nav_menu($args);
            ?>

        </div>
        <div class="header__bottom">
            <?
            $args = array(
                'menu' => 'contact',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'header__bottom__links',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
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