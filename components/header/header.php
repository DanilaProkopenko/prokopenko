<?php
$header_year = get_field('header_year', 'options');
$header_last_update = get_field('header_last-update', 'options');


?>

<header class="header__wrapper">
    <div class="header">
        <div class="header__top main-padding">
            <a href="/" class="header__top__logo">
                <!-- Данила Прокопенко -->
                 prokopenko
            </a>
            <div class="header__top__right">
                <div class="header__column header__navigation _main">
                    <?php
                    $args = array(
                        'menu' => 'main',
                        'depth'    => 0,
                        'container' => 'nav',
                        'menu_class' => 'header__navigation__links list-style-none',
                        'fallback_cb' => false
                    );

                    wp_nav_menu($args);
                    ?>
                </div>
                <div class="header__column">
                    <div class="header__navigation _contact">
                        <?php
                        $args = array(
                            'menu' => 'header_contact',
                            'depth'    => 0,
                            'container' => 'nav',
                            'menu_class' => 'header__navigation__links list-style-none',
                            'fallback_cb' => false
                        );

                        wp_nav_menu($args);
                        ?>
                    </div>
                    <div class="header__top__burger" id="burger-icon">
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="header__burger__menu" id="burger-menu">
    <div class="header__burger__menu-list">
        <?php
        $args = array(
            'menu' => 'burger',
            'depth'    => 0,
            'container' => 'div',
            'menu_class' => 'header__burger__links list-style-none',
            'fallback_cb' => false
        );
        wp_nav_menu($args);
        ?>
    </div>
</div>