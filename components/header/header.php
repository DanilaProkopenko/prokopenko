<?php
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
        <!-- <nav class="header__page-nav"></nav> -->
        <div class="header__navigation">
            <?
            $args = array(
                'menu' => 'main',
                'depth'    => 0,
                'container' => 'nav',
                'menu_class' => 'header__navigation__links',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>

        </div>
    </div>
</header>