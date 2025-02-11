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

$title = get_field('single-post_intro_title');
$caption = get_field('single-post_intro_caption');
$image = get_field('single-post_intro_image');

$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');

$id = get_the_ID();
?>

<section class="section__single-post__intro section" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">

    <? if ($image) : ?>
        <div class="section__single-post__intro__image">
            <img src="<?= ($image['sizes']['large']); ?>" alt="" class="section__single-post__intro__image__source">
        </div>
    <?php endif; ?>

    <div class="section__single-post__intro__content">
        <h1 class="section__single-post__intro__title">
            <?= get_the_title($id) ?>
        </h1>

        <div class="section__single-post__intro__description__wrapper">
            <div class="section__single-post__intro__description">
                <?= $caption ?>
            </div>
            <div class="section__single-post__meta__wrapper">
                <?= do_shortcode('[block_post_meta]') ?>
            </div>
        </div>
    </div>

</section>