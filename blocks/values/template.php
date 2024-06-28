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

$title = get_field('values-block_title');
$description = get_field('values-block_description');
?>

<section class="values grid_12" id="values">
    <div class="values__title">
        <?= $title ?>
        <!-- Удобно. Полезно. Обдуманно. -->
    </div>
    <div class="values__description">
        <?= $description ?>
    </div>
    <div class="values__description values__description_second">
        <?= $description ?>
    </div>
</section>