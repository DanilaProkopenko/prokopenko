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

<section class="posts-list__archive__wrapper">
    <div class="posts-list__archive__heading grid_12">
        <h3 class="posts-list__archive__title">
            Архив
        </h3>
        <div class="posts-list__archive__caption">
            (Не кликается. Пока в разработке)
        </div>
    </div>
    <div class="posts-list__archive f-carousel">
        <?= getPostsArchive(-1); ?>
    </div>
</section>