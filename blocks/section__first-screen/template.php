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

$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');
?>

<section class="section__first-screen main-padding" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">
    <? if ($first_screen_image) : ?>
        <div class="first-screen__image">
            <img src="<?= ($first_screen_image['sizes']['large']); ?>" alt="" class="first-screen__image__source">
        </div>
    <?php endif; ?>

    <div class="section__first-screen__content">
        <h1 class="first-screen__text">
            <?= $first_screen_title ?>
    </h1>
        <div class="first-screen__caption">
            <?= $first_screen_caption ?>
        </div>
    </div>
</section>