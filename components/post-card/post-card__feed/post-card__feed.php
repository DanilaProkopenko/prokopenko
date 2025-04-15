<?php
if ($args) {
    $title = $args['title'];
    $link = $args['link'];
    $img_large = $args['img_large'];
    $img_medium_large = $args['img_medium_large'];

    $feed_thumb = $args['feed_thumb'];
    $feed_link = $args['feed_link'];
    $id = $args['id'];
}
?>
<div class="feed-post-card emerge">
    <!-- <div class="post-card__thumb">
        <picture>
            <source media="(max-width: 768px)" srcset="<?= esc_html($img_medium_large) ?>" />
            <source media="(min-width: 769px)" srcset="<?= esc_html($img_large) ?>" />
            <img class="post-card__thumb__source" src="<?= esc_html($img_large) ?>" alt='Обложка записи' loading="lazy">
        </picture>
    </div> -->
    <?php
    $file = $feed_thumb;
    // var_dump($feed_thumb);
    if ($file):

        // Extract variables.
        $url = $file['url'];
        $title = $file['filename'];
        $caption = $file['caption'];
        $icon = $file['icon'];

        // Display image thumbnail when possible.
        if ($file['type'] == 'image') :
            $icon =  $file['sizes']['large']; ?>
            <? // Begin caption wrap.
            if ($caption): ?>
                <div class="wp-caption">
                <?php endif; ?>

                <img src="<?php echo esc_attr($icon); ?>" />

                <?php
                // End caption wrap.
                if ($caption): ?>
                    <p class="wp-caption-text"><?php echo esc_html($caption); ?></p>
                </div>
            <?php endif; ?>
        <?php endif; ?>

        <? if ($file['type'] == 'video'): ?>
            <video
                preload="auto"
                no-controls
                autoplay
                loop
                playsinline
                muted
                class="slide__video-video__source post-card__big__gallery__img__source _cover">
                <source
                    src="<?php echo $file['url']; ?>"
                    type="video/mp4">
            </video>
        <?php endif; ?>
    <?php endif; ?>
    <? if ($feed_link == 1): ?>
        <a href="<?= $link ?>" class="post-card-heading">
            <?= $title ?>
        </a>
    <? else: ?>
        <div class="post-card-heading">
            <?= $title ?>
        </div>
    <? endif ?>
    <div>
        <!-- <?= $feed_thumb ?> -->
    </div>
    <?php // echo do_shortcode('[post_category]') ?>
</div>