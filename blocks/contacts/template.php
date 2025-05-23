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

$title = get_field('contacts-block_title');
$description = get_field('contacts-block_description');
$img = get_field('contacts-block_image');

$block_id = get_field('block_id');
$block_id_name = get_field('block_id_name');
?>

<section class="contacts-block main-padding emerge" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">

    <div class="contacts-block__content">
        <h2 class="contacts-block__title"><?= $title ?></h2>
        <div class="contacts-block__description">
            <?= $description ?>
        </div>
        <div class="contacts-block__links">
            <?php
            $args = array(
                'menu' => 'contact',
                'depth'    => 0,
                'container' => 'div',
                'menu_class' => 'contacts-block__description__links list-style-none',
                'fallback_cb' => false
            );

            wp_nav_menu($args);
            ?>
        </div>
    </div>
    <?php if ($img) : ?>
        <div class="contacts-block__image">
            <img src="<?= $img['sizes']['large'] ?>" alt="" class="contacts-block__image__source">
        </div>
    <?php endif ?>
</section>