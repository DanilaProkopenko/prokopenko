<?
$footer_disclaimer = get_field('footer-disclaimer', 'Options');
$footer_date = get_field('footer-date', 'Options');
?>
<!-- .pd_width_50 {
    width: calc(50% - 5px);
}

.pd_margin-auto {
    margin: 0 auto;
}

.pd_margin-right {
    margin-right: 0;
    margin-left: auto;
} -->
<footer class="footer">
    <div class="pd_block-text pd_margin-top_1">
        <!-- <div class="footer__content pd_width_50 pd-margin-auto"> -->
        <?php if ($footer_disclaimer) : ?>
            <!-- <div class="footer__disclaimer"> -->
            <?= $footer_disclaimer ?>
            <!-- </div> -->
        <?php endif ?>
        <?php if ($footer_date) : ?>
            <!-- <div class="footer__caption"> -->
            <?= $footer_date ?>
            <?php //do_shortcode('[search_button]') 
            ?>
            <!-- </div> -->
        <?php endif ?>
        <!-- </div>  -->
    </div>

    <div class="theme-switcher" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000; display: none; gap: 8px;">
        <button onclick="switchTheme('light')" title="Светлая" style="width: 36px; height: 36px; border: none; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">Светлая</button>
        <button onclick="switchTheme('dark')" title="Тёмная" style="width: 36px; height: 36px; border: none; border-radius: 50%; background: #121212; color: #fff;">Темная</button>
        <button onclick="switchTheme('orange')" title="Оранжевая" style="width: 36px; height: 36px; border: none; border-radius: 50%; background: #e65100; color: #fff;">Оранжевая</button>
        <!-- <button onclick="switchTheme('light')" title="Светлая" style="width: 36px; height: 36px; border: none; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">⚪</button>
        <button onclick="switchTheme('dark')" title="Тёмная" style="width: 36px; height: 36px; border: none; border-radius: 50%; background: #121212; color: #fff;">⚫</button>
        <button onclick="switchTheme('orange')" title="Оранжевая" style="width: 36px; height: 36px; border: none; border-radius: 50%; background: #e65100; color: #fff;">🟠</button> -->
    </div>
</footer>