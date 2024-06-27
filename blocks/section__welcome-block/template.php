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

$custom_block_heading = get_field('custom-block_heading');
$header_avatar_image = get_field('header_avatar_image', 'options');
?>

<section class="section__welcome-block" id="welcome">
    <div class="welcome-block__content">
        <!-- <h1 class="welcome-block__title">Данила Прокопенко</h1> -->
        <!-- <div class="welcome-block__caption">Графический и веб–дизайнер в <a href="">zerna.design</a></div> -->
        <!-- <div class="welcome-block__caption">Дизайнер и разработчик в <a href="">zerna.design</a></div> -->
        <div class="welcome-block__text">
            Привет, я Данил, дизайнер в <a href="">zerna.design</a> с фокусом на веб, полиграфию и коммуникацию (промо). Люблю создавать понятные и дружелюбные решения.
        </div>
        <!-- <div class="welcome-block__caption">Работаю в <a href="">zerna.design</a></div>
        <a href="<?= esc_html($header_avatar_image['sizes']['medium']); ?>" data-fancybox data-caption="Это я">
            <img src="<?= esc_html($header_avatar_image['sizes']['thumbnail']); ?>" alt="" class="header__description__avatar__source">
        </a> -->
    </div>
</section>