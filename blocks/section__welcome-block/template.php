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

$welcome_block_text = get_field('welcome-block_text');
$welcome_block_caption = get_field('welcome-block_caption');

$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');
?>

<section class="section__welcome-block grid_12" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">
    <div class="section__welcome-block__content">
        <div class="welcome-block__text">
            <?= $welcome_block_text ?>
        </div>
        <div class="welcome-block__caption">
            <?= $welcome_block_caption ?>
        </div>
    </div>
</section>