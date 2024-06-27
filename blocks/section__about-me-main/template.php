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

$title = get_field('about-me_main-screen_title');
$description = get_field('about-me_main-screen_description');
$img = get_field('about-me_main-screen_image');
?>

<section class="about-me__main-screen grid_12" id="about">
    <h2 class="about-me__main-screen__title"><?= $title ?></h2>
    <div class="about-me__main-screen__description">
        <?= $description ?>
        <?
        $args = array(
            'menu' => 'contact',
            'depth'    => 0,
            'container' => 'div',
            'menu_class' => 'about-me__main-screen__description__links',
            'fallback_cb' => false
        );

        wp_nav_menu($args);
        ?>
    </div>
    <a href="<?= $img['sizes']['large'] ?>" data-fancybox="avatar" class="about-me__main-screen__image">
        <img src="<?= $img['sizes']['large'] ?>" alt="" class="about-me__main-screen__image__source">
    </a>
</section>