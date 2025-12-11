<?php
get_header();
?>

<div class="wp-block-columns _padding section is-layout-flex wp-container-core-columns-is-layout-28f84493 wp-block-columns-is-layout-flex">
    <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow"></div>
    <div class="wp-block-column is-layout-flow wp-block-column-is-layout-flow">
        <h1 class="wp-block-heading">
            Результаты поиска
        </h1>
    </div>
    <h1>Результаты поиска по запросу: «<?php the_search_query(); ?>»</h1>

    <?php
    // Получаем оригинальный запрос
    $original_query = get_search_query();
    $normalized_query = normalize_search_query($original_query);

    // Берём все записи
    $args = [
        'posts_per_page' => -1,
        'post_type' => ['post', 'page', 'works', 'pd-works'],
        'post_status' => 'publish'
    ];
    $all_posts = get_posts($args);

    $results = [];

    foreach ($all_posts as $post) {
        setup_postdata($post);

        $title = mb_strtolower($post->post_title);
        $content = mb_strtolower(strip_tags($post->post_content));
        $combined = $title . ' ' . $content;

        // Нормализуем заголовок и контент
        $normalized_title = normalize_search_query($title);
        $normalized_content = normalize_search_query($content);

        // Подсчёт релевантности
        similar_text($normalized_title, $normalized_query, $title_similarity);
        similar_text($combined, $normalized_query, $content_similarity);
        $lev_distance = levenshtein($normalized_title, $normalized_query);

        $score = $title_similarity * 2 + $content_similarity + (40 - $lev_distance * 5);

        if ($score > 40) {
            $results[] = [
                'post' => $post,
                'score' => $score
            ];
        }
    }

    // Сортировка по релевантности
    usort($results, function ($a, $b) {
        return $b['score'] <=> $a['score'];
    });

    wp_reset_postdata();

    if (!empty($results)) : ?>
        <div class="search-results">
            <?php foreach ($results as $item) :
                $post = $item['post'];
                setup_postdata($post);
                $type = get_post_type();
                $excerpt = get_the_excerpt();
                $highlighted_excerpt = preg_replace("/(" . preg_quote($original_query, '/') . ")/iu", '<mark>$0</mark>', $excerpt);
            ?>
                <article class="search-item post-type-<?php echo esc_attr($type); ?>">
                    <h2>
                        <?php echo preg_replace("/(" . preg_quote($original_query, '/') . ")/iu", '<mark>$0</mark>', get_the_title()); ?>
                    </h2>
                    <p><?php echo wp_kses_post($highlighted_excerpt); ?></p>
                    <a href="<?php the_permalink(); ?>">Перейти</a>
                </article>
            <?php endforeach; ?>
        </div>
    <?php else : ?>
        <p>Ничего не найдено.</p>
    <?php endif; ?>
</div>

<?php
get_footer();
