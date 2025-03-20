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



<div class="single-post__meta__wrapper">
    <?php
    $post_meta = get_field('post_meta', $id);
    if ($post_meta):
    ?>
        <div class="post__meta">
            <?= $post_meta ?>
        </div>
    <?php endif; ?>
</div>