<?
?>
<footer class="footer main-padding">
    <div class="footer__content">
        <div class="footer__links__wrapper">
            <?
            $args = array(
                'menu' => 'footer_first',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'footer__links',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>
            <?
            $args = array(
                'menu' => 'footer_second',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'footer__links',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>
        </div>
        <div class="footer__caption">
            <a href="/wp-admin/">Войти</a>
            <p>© 2001...2025</p>
        </div>
    </div>

</footer>