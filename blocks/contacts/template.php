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
?>

<section class="contacts-block grid_12" id="about">
    <div class="contacts-block__top">
        <h2 class="contacts-block__title"><?= $title ?></h2>
        <div class="contacts-block__description">
            <?= $description ?>
        </div>
    </div>
    <div class="contacts-block__links">
        <?
        $args = array(
            'menu' => 'contact',
            'depth'    => 0,
            'container' => 'div',
            'menu_class' => 'contacts-block__description__links',
            'fallback_cb' => false
        );

        wp_nav_menu($args);
        ?>
    </div>
    <? if ($img) : ?>
        <a href="<?= $img['sizes']['large'] ?>" data-fancybox="avatar" class="contacts-block__image">
            <img src="<?= $img['sizes']['large'] ?>" alt="" class="contacts-block__image__source">
        </a>
    <? endif ?>
</section>