<?php
// Fix PhpStorm inspection on undefined variable.
if (empty($args)) {
    $args = [];
}

$defaults = [
    'label'         => '',
    'checked'       => false,
    'disabled'      => false,
    'custom_class'  => '',
    'id'            => '',
    'name'          => '',
    'value'         => '',
];

// Fill args with defaults to avoid errors.
$args = wp_parse_args($args, $defaults);

// Unpack arguments to variables for better readability.
// Should be in the same order as the keys in `$defaults` array.
[
    'label'         => $label,
    'checked'       => $checked,
    'disabled'      => $disabled,
    'custom_class'  => $custom_class,
    'id'            => $id,
    'name'          => $name,
    'value'         => $value,
] = $args;

$first_screen_title = get_field('first-screen_title');
$first_screen_caption = get_field('first-screen_caption');
$first_screen_image = get_field('first-screen_image');
$first_screen_video = get_field('first-screen_video');

$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');
?>

<section class="section__first-screen main-padding emerge" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">
    <!-- <div class="section__first-screen__content"> -->
    <div class="pd_flex pd_flex-column pd_width_50 pd_margin-right">
        <h1 class="first-screen__text pd_flex-50">
            <!-- <?= $first_screen_title ?> -->
             Данила Прокопенко
        </h1>
        <div class="first-screen__caption pd_flex-50">
            <!-- <?= $first_screen_caption ?> -->
            Веб и графический дизайнер
        </div>
    </div>
    <?php if ($first_screen_video): ?>
        <div class="lazy_container first-screen__image">
            <video
                preload="auto"
                no-controls
                autoplay
                loop
                playsinline
                muted
                class="first-screen__image__source"
                poster="<?= esc_url($first_screen_video['url']) ?>">
                <source
                    src="<?php echo $first_screen_video['url']; ?>"
                    type="video/mp4">
            </video>
        </div>
    <?php elseif ($first_screen_image) : ?>
        <div class="first-screen__image">
            <img src="<?= ($first_screen_image['sizes']['large']); ?>" alt="" class="first-screen__image__source">
        </div>
    <?php endif; ?>
    <div class="first-screen__about">
        Разрабатываю сайты и различную коммуникационную продукцию: баннеры, каталоги, роллапы, меню, календари и тд.
    </div>
    <!-- </div> -->
</section>