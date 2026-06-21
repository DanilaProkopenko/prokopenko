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
$page_id          = is_singular() ? get_queried_object_id() : 0;
$page_color_value = 'white';

if ( $page_id ) {
    $page_color = get_field_object('page_color', $page_id);

    if ( is_array($page_color) && isset($page_color['value']) && is_array($page_color['value']) ) {
        $page_color_value = $page_color['value']['value'] ?? $page_color_value;
    }
}

$body_classes = array(
    'container',
    'page__color-' . sanitize_html_class($page_color_value),
);

if ( $page_id ) {
    $body_classes[] = (string) $page_id;
}
?>

<body data-barba="wrapper" id="barba-wrapper" <?php body_class($body_classes); ?>>

    <?php wp_body_open();
    get_template_part('components/header/header'); ?>

    <main id="main" data-barba="container" data-barba-namespace="one-pager">
