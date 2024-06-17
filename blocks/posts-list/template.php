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

?>

<div class="posts-list__wrapper main-padding">
    <div class="grid-2-1-1">
        <h3 class="grid-item">Работы</h3>
        <div class="grid-item">2022-2024</div>
        <a href="" class="grid-item">Смотреть все</a>
    </div>
    <div class="posts-list">
        <?= getPosts(-1); ?>
        <?= getPosts(-1); ?>
        <?= getPosts(-1); ?>
    </div>
</div>