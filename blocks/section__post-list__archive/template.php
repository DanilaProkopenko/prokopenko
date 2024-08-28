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


$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');
?>

<section class="posts-list__archive__wrapper grid_12" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">
    <h3 class="posts-list__archive__heading section__heading">
        Архив
    </h3>
    <div class="posts-list__archive f-carousel">
        <?= getPostsArchive(-1); ?>
        <?= getPostsArchive(-1); ?>
    </div>
</section>