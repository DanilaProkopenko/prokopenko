<?
$footer_disclaimer = get_field('footer-disclaimer', 'Options');
$footer_date = get_field('footer-date', 'Options');
?>
<footer class="footer">
    <div class="footer__content">
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