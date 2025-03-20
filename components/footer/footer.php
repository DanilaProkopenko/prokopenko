<?
?>
<footer class="footer main-padding">
    <div class="footer__content">
        <div class="footer__links__wrapper">
            <?php
            $args = array(
                'menu' => 'footer_first',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'footer__links list-style-none',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>
            <?php
            $args = array(
                'menu' => 'footer_second',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'footer__links list-style-none',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>
        </div>
        <div class="footer__caption">
            <a href="/wp-admin/">Войти</a>
            <div>© 2001...сейчас</div>
        </div>
    </div>

</footer>