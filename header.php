<!DOCTYPE html>
<!--suppress HtmlRequiredLangAttribute -->
<html <?php language_attributes(); ?>>
<!--suppress HtmlRequiredTitleElement -->

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
    <?php wp_head(); ?>
</head>

<?php
$id         = get_the_ID();
$page_color = get_field_object('page_color', $id);

$page_color_value = 'white'; // дефолт
$page_color_label = 'White';

if ( is_array($page_color) && isset($page_color['value']) && is_array($page_color['value']) ) {
    // в value лежит массив с value/label
    $page_color_value = $page_color['value']['value'] ?? $page_color_value;
    $page_color_label = $page_color['value']['label'] ?? $page_color_label;
}
?>

<body data-barba="wrapper" id="barba-wrapper" <?php body_class("container page__color-" . esc_attr($page_color_value) . ' ' . $id); ?>>
    <!-- 
    в body добавляем различные классы, для смены стилистики
    style-text-indent — Шрифт с вытяжкой 
    -->

    <?php wp_body_open();
    get_template_part('components/header/header'); ?>

    <main id="main" data-barba="container" data-barba-namespace="one-pager">