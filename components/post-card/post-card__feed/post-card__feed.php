<?php
if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $feed_thumb = $args['feed_thumb'];
    $feed_link = $args['feed_link'];
    $id = $args['id'];

    $short_description = $args['short_description'];
    $archive_link = $args['archive_link'];
}
?>
<div class="feed-post-card emerge">
    <?php
    $file = $feed_thumb;

// если прилетела строка (URL/ID), не даём упасть
    if (is_string($file)) {
        $file = [
            'url'  => $file,
            'type' => 'image', // поменяй на 'video', если нужно
        ];
    }

    if (is_array($file)) :

        $url     = isset($file['url']) ? $file['url'] : '';
        $caption = isset($file['caption']) ? $file['caption'] : '';
        $icon    = isset($file['icon']) ? $file['icon'] : '';

        if (isset($file['type']) && $file['type'] === 'image') :
            $icon    = isset($file['sizes']['large']) ? $file['sizes']['large'] : $url;
            $img_url = $url;
            ?>
            <?php if ($caption): ?>
                <div class="wp-caption">
            <?php endif; ?>

                <a
                    href="<?php echo esc_attr($img_url); ?>"
                    data-fancybox="<?= esc_attr($id); ?>"
                    class="post-card-img link-border-none">
                    <img src="<?php echo esc_attr($icon); ?>" />
                </a>

            <?php if ($caption): ?>
                    <p class="wp-caption-text"><?php echo esc_html($caption); ?></p>
                </div>
            <?php endif; ?>

        <?php elseif (isset($file['type']) && $file['type'] === 'video'): ?>
            <a
                href="<?php echo esc_url($url); ?>"
                data-fancybox="<?= esc_attr($id); ?>"
                class="post-card-img link-border-none">
                <video
                    preload="auto"
                    no-controls
                    autoplay
                    loop
                    playsinline
                    muted
                    class="slide__video-video__source post-card__big__gallery__img__source _cover">
                    <source
                        src="<?php echo esc_url($url); ?>"
                        type="video/mp4">
                </video>
            </a>
        <?php endif; ?>
    <?php endif; ?>

    <? if ($feed_link):
        $link_url = $feed_link['url'];
        $link_title = $feed_link['title'];
        $link_target = $feed_link['target'] ? $feed_link['target'] : '_self';
    ?>
        <a class="post-card-heading" href="<?php echo esc_url($link_url); ?>" target="<?php echo esc_attr($link_target); ?>">
            <?= $title ?>
            <?php //echo $short_description 
            ?>
        </a>
    <? else: ?>
        <div class="post-card-heading">
            <?= $title ?>
        </div>
    <? endif ?>
    <div>
        <!-- <?= $feed_thumb ?> -->
    </div>
    <?php // echo do_shortcode('[post_category]') 
    ?>
</div>