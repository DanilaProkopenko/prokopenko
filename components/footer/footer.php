<?
$footer_disclaimer = get_field('footer-disclaimer', 'Options');
$footer_date = get_field('footer-date', 'Options');
?>
<footer class="footer">
    <div class="footer__content">
        <!-- <div class="footer__links__wrapper">
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
        </div> -->
        <?php if ($footer_disclaimer) : ?>
            <div class="footer__disclaimer">
                <?= $footer_disclaimer ?>
            </div>
        <?php endif ?>
        <?php if ($footer_date) : ?>
            <div class="footer__caption">
                <?= $footer_date ?>
            </div>
        <?php endif ?>
    </div>
</footer>