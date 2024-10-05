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

<section class="intro main-padding" data-id-name="<?= $block_id_name ?>" id="<?= $block_id ?>">
    <div class="intro__title section__title">
        Стараюсь создавать то, что будет полезно, удобно и красиво пользователю
    </div>
    <div class="intro__description">
        <p>
            Именно такого подхода я придерживаюсь при работе над дизайном. Мне нравится, когда конечный
            продукт помимо красоты еще и полезен пользователю; когда с ним взаимодействуют без лишних вопросов.
        </p>
        <p>
            Часто, в работе, я задаюсь вопросом: «А как бы улучшить?» — и бывает, конечно, что сразу решения не найдешь,
            но пройдет время и оно появится на поверхности. В такие моменты случается маленькая победа.
        </p>
        <p>
            Ну, а дальше остается сделать это все красивым и порадоваться.
        </p>
    </div>
</section>