<?php

function prokopenko_custom_ajax_search_handler()
{
    check_ajax_referer('search-nonce', 'security');
    $original_query = sanitize_text_field($_GET['q']);
    if (empty($original_query)) {
        wp_send_json(['results' => []]);
    }

    // Разбиваем запрос на слова (исключая стоп-слова)
    $search_words = array_filter(
        preg_split('/\s+/u', mb_strtolower($original_query), -1, PREG_SPLIT_NO_EMPTY),
        function ($word) {
            return !prokopenko_is_stop_word($word) && mb_strlen($word) >= 3;
        }
    );

    if (empty($search_words)) {
        wp_send_json(['results' => []]);
    }

    // Получаем все записи
    $args = [
        'posts_per_page' => -1,
        'post_type' => ['post', 'page', 'works', 'pd-works', 'junk'],
        'post_status' => 'publish'
    ];
    $all_posts = get_posts($args);
    $results = [];
    
    function prokopenko_get_max_distance($len)
    {
        if ($len <= 4) return 1;
        if ($len <= 8) return 2;
        return 3;
    }
    
    foreach ($all_posts as $post) {
        setup_postdata($post);
        $title = mb_strtolower($post->post_title);
        $content = strip_tags($post->post_content);

        // Получаем ACF поля
        $short_description = get_field('post_short-description', $post->ID) ?: '';
        $meta_text = get_field('post_meta', $post->ID) ?: '';
        
        // Получаем категории
        $categories = get_the_category($post->ID);
        $categories_text = '';
        if (!empty($categories)) {
            $category_names = array_map(function($cat) {
                return mb_strtolower($cat->name);
            }, $categories);
            $categories_text = implode(' ', $category_names);
        }

        // Объединяем весь текст для поиска
        $combined = $title . ' ' . $content . ' ' . $short_description . ' ' . $meta_text . ' ' . $categories_text;
        $score = 0;
        $match_excerpt = '';
        $found_words = [];

        foreach ($search_words as $word) {
            $word_lower = mb_strtolower($word);

            // Разбиваем текст на слова для поиска с опечатками
            $title_words = preg_split('/\b/u', $title, -1, PREG_SPLIT_NO_EMPTY);
            $content_words = preg_split('/\b/u', $content, -1, PREG_SPLIT_NO_EMPTY);
            $short_desc_words = preg_split('/\b/u', mb_strtolower($short_description), -1, PREG_SPLIT_NO_EMPTY);
            $meta_text_words = preg_split('/\b/u', mb_strtolower($meta_text), -1, PREG_SPLIT_NO_EMPTY);
            $categories_words = preg_split('/\b/u', $categories_text, -1, PREG_SPLIT_NO_EMPTY);

            // Проверяем точное совпадение в заголовке
            if (mb_stripos($title, $word) !== false) {
                $score += 50;
                $found_words[] = $word;
            } else {
                // Проверяем нечёткое совпадение в заголовке (расстояние Левенштейна)
                $title_fuzzy_matches = [];
                foreach ($title_words as $tw) {
                    $tw = trim($tw);
                    if (mb_strlen($tw) >= 2) {
                        $distance = prokopenko_levenshtein_utf8(mb_strtolower($tw), $word_lower);
                        $max_distance = prokopenko_get_max_distance(mb_strlen($word));

                        if ($distance > 0 && $distance <= $max_distance) {
                            $title_fuzzy_matches[] = $tw;
                        }
                    }
                }

                if (!empty($title_fuzzy_matches)) {
                    $score += 40;
                    $found_words = array_merge($found_words, $title_fuzzy_matches);
                }
            }

            // Проверяем точное совпадение в контенте
            if (mb_stripos($content, $word) !== false) {
                $score += 20;
                $found_words[] = $word;
                if (empty($match_excerpt)) {
                    $match_excerpt = prokopenko_get_search_excerpt($content, $word);
                }
            } else {
                // Проверяем нечёткое совпадение в контенте
                $content_fuzzy_matches = [];
                foreach ($content_words as $cw) {
                    $cw = trim($cw);
                    if (mb_strlen($cw) >= 2) {
                        $distance = prokopenko_levenshtein_utf8(mb_strtolower($cw), $word_lower);
                        $max_distance = prokopenko_get_max_distance(mb_strlen($word));
                        if ($distance > 0 && $distance <= $max_distance) {
                            $content_fuzzy_matches[] = $cw;
                        }
                    }
                }

                if (!empty($content_fuzzy_matches)) {
                    $score += 15;
                    $found_words = array_merge($found_words, $content_fuzzy_matches);
                    if (empty($match_excerpt)) {
                        $match_excerpt = prokopenko_get_search_excerpt($content, $content_fuzzy_matches[0]);
                    }
                }
            }

            // Проверяем точное совпадение в краткое описание (ACF)
            if (mb_stripos($short_description, $word) !== false) {
                $score += 20;
                $found_words[] = $word;
                if (empty($match_excerpt)) {
                    $match_excerpt = prokopenko_get_search_excerpt($short_description, $word);
                }
            } else {
                // Проверяем нечёткое совпадение в краткое описание
                $short_desc_fuzzy_matches = [];
                foreach ($short_desc_words as $sw) {
                    $sw = trim($sw);
                    if (mb_strlen($sw) >= 2) {
                        $distance = prokopenko_levenshtein_utf8(mb_strtolower($sw), $word_lower);
                        $max_distance = prokopenko_get_max_distance(mb_strlen($word));

                        if ($distance > 0 && $distance <= $max_distance) {
                            $short_desc_fuzzy_matches[] = $sw;
                        }
                    }
                }

                if (!empty($short_desc_fuzzy_matches)) {
                    $score += 15;
                    $found_words = array_merge($found_words, $short_desc_fuzzy_matches);
                    if (empty($match_excerpt)) {
                        $match_excerpt = prokopenko_get_search_excerpt($short_description, $short_desc_fuzzy_matches[0]);
                    }
                }
            }

            // Проверяем точное совпадение в мета-данные
            if (mb_stripos($meta_text, $word) !== false) {
                $score += 40;
                $found_words[] = $word;
                if (empty($match_excerpt)) {
                    $meta_clean = preg_replace('/[^\p{L}\p{N}\s\.]+/u', ' ', mb_strtolower($meta_text));
                    $word_clean = preg_replace('/[^\p{L}\p{N}\s\.]+/u', ' ', mb_strtolower($word));

                    if ($word_clean && mb_stripos($meta_clean, $word_clean) !== false) {
                        $score += 12;
                        $found_words[] = $word;
                        $match_excerpt = prokopenko_get_search_excerpt($meta_text, $word);
                    }
                }
            } else {
                // Проверяем нечёткое совпадение в мета-данные
                $meta_fuzzy_matches = [];
                foreach ($meta_text_words as $mw) {
                    $mw = trim($mw);
                    if (mb_strlen($mw) >= 2) {
                        $distance = prokopenko_levenshtein_utf8(mb_strtolower($mw), $word_lower);
                        $max_distance = prokopenko_get_max_distance(mb_strlen($word));

                        if ($distance > 0 && $distance <= $max_distance) {
                            $meta_fuzzy_matches[] = $mw;
                        }
                    }
                }

                if (!empty($meta_fuzzy_matches)) {
                    $score += 15;
                    $found_words = array_merge($found_words, $meta_fuzzy_matches);
                    if (empty($match_excerpt)) {
                        $match_excerpt = prokopenko_get_search_excerpt($meta_text, $meta_fuzzy_matches[0]);
                    }
                }
            }
            
            // Проверяем точное совпадение в категориях
            if (mb_stripos($categories_text, $word) !== false) {
                $score += 25;
                $found_words[] = $word;
            } else {
                // Проверяем нечёткое совпадение в категориях
                $categories_fuzzy_matches = [];
                foreach ($categories_words as $cw) {
                    $cw = trim($cw);
                    if (mb_strlen($cw) >= 2) {
                        $distance = prokopenko_levenshtein_utf8(mb_strtolower($cw), $word_lower);
                        $max_distance = prokopenko_get_max_distance(mb_strlen($word));
                        if ($distance > 0 && $distance <= $max_distance) {
                            $categories_fuzzy_matches[] = $cw;
                        }
                    }
                }
                
                if (!empty($categories_fuzzy_matches)) {
                    $score += 18;
                    $found_words = array_merge($found_words, $categories_fuzzy_matches);
                }
            }
        }

        // Уникализируем найденные слова
        $found_words = array_unique($found_words);

        // Бонус за близость слов друг к другу
        if (count($found_words) > 1) {
            $positions = [];
            foreach ($found_words as $word) {
                $pos = mb_stripos($combined, $word);
                if ($pos !== false) {
                    $positions[] = $pos;
                }
            }
            if (count($positions) > 1) {
                $distance = max($positions) - min($positions);
                $score += max(0, 50 - ($distance / 10));
            }
        }

        if ($score > 15) {
            $results[] = [
                'post' => $post,
                'score' => $score,
                'match_excerpt' => $match_excerpt ?: wp_trim_words(strip_tags($post->post_content), 20, '...'),
                'found_words' => $found_words
            ];
        }
    }

    // Сортируем результаты по релевантности
    usort($results, function ($a, $b) {
        return $b['score'] <=> $a['score'];
    });

    // Форматируем результаты для вывода
    $formatted_results = [];
    foreach ($results as $item) {
        $post = $item['post'];

        // Получаем мета-информацию
        $meta_text = get_field('post_meta', $post->ID) ?: '';
        $meta_display = $meta_text ? mb_substr($meta_text, 0, 100) : '';

        // Получаем категории для вывода
        $post_categories = get_the_category($post->ID);
        $categories_display = '';
        if (!empty($post_categories)) {
            $category_names = array_map(function($cat) {
                return $cat->name;
            }, $post_categories);
            $categories_display = implode(', ', $category_names);
        }

        // Подсвечиваем все найденные слова
        $highlighted_title = $post->post_title;
        $highlighted_excerpt = $item['match_excerpt'];
        $highlighted_categories = $categories_display;

        // Подсвечиваем все найденные слова в заголовке, контенте и категориях
        foreach ($item['found_words'] as $word) {
            $highlighted_title = prokopenko_highlight_fuzzy_match($highlighted_title, $word);
            $highlighted_excerpt = prokopenko_highlight_fuzzy_match($highlighted_excerpt, $word);
            $highlighted_categories = prokopenko_highlight_fuzzy_match($highlighted_categories, $word);
        }
        
        $formatted_results[] = [
            'id' => $post->ID,
            'title' => $highlighted_title,
            'excerpt' => $highlighted_excerpt,
            'url' => get_permalink($post->ID),
            'thumbnail' => get_the_post_thumbnail_url($post->ID, 'large'),
            'type' => $post->post_type,
            'match_excerpt' => $highlighted_excerpt,
            'meta' => $meta_display,
            'categories_text' => $highlighted_categories
        ];
    }

    wp_reset_postdata();

    wp_send_json(['results' => array_slice($formatted_results, 0, 10)]);
}

// Расстояние Левенштейна для UTF-8
function prokopenko_levenshtein_utf8($s1, $s2)
{
    $s1 = preg_split('//u', $s1, -1, PREG_SPLIT_NO_EMPTY);
    $s2 = preg_split('//u', $s2, -1, PREG_SPLIT_NO_EMPTY);

    $len1 = count($s1);
    $len2 = count($s2);

    if ($len1 == 0) return $len2;
    if ($len2 == 0) return $len1;

    $matrix = array_fill(0, $len1 + 1, array_fill(0, $len2 + 1, 0));

    for ($i = 0; $i <= $len1; $i++) {
        $matrix[$i][0] = $i;
    }

    for ($j = 0; $j <= $len2; $j++) {
        $matrix[0][$j] = $j;
    }

    for ($i = 1; $i <= $len1; $i++) {
        for ($j = 1; $j <= $len2; $j++) {
            $cost = ($s1[$i - 1] == $s2[$j - 1]) ? 0 : 1;
            $matrix[$i][$j] = min(
                $matrix[$i - 1][$j] + 1,
                $matrix[$i][$j - 1] + 1,
                $matrix[$i - 1][$j - 1] + $cost
            );
        }
    }

    return $matrix[$len1][$len2];
}

function prokopenko_highlight_fuzzy_match($text, $word)
{
    if (mb_strlen($word) < 3) {
        return $text;
    }

    $word_len = mb_strlen($word);
    $pattern = '/\b(';

    $pattern .= preg_quote($word, '/') . '|';

    for ($i = 0; $i < $word_len; $i++) {
        $variant = mb_substr($word, 0, $i) . mb_substr($word, $i + 1);
        if (mb_strlen($variant) >= 2) {
            $pattern .= preg_quote($variant, '/') . '|';
        }

        for ($c = 0; $c < mb_strlen($word); $c++) {
            $variant = mb_substr($word, 0, $i) . mb_substr($word, $i, 1) . mb_substr($word, $i);
            if (mb_strlen($variant) >= 2) {
                $pattern .= preg_quote($variant, '/') . '|';
            }
        }
    }

    $pattern = rtrim($pattern, '|') . ')\b/ui';

    $text = preg_replace($pattern, '<mark>$1</mark>', $text);

    $partial_pattern = '/' . preg_quote($word, '/') . '/iu';

    $text = preg_replace_callback($partial_pattern, function ($matches) {
        return '<mark>' . $matches[0] . '</mark>';
    }, $text);

    return $text;
}

add_action('wp_ajax_prokopenko_search', 'prokopenko_custom_ajax_search_handler');
add_action('wp_ajax_nopriv_prokopenko_search', 'prokopenko_custom_ajax_search_handler');

function prokopenko_get_search_excerpt($content, $query, $radius = 70)
{
    if (empty($content) || empty($query)) return '';

    $words = preg_split('/\s+/u', mb_strtolower($query), -1, PREG_SPLIT_NO_EMPTY);
    if (empty($words)) return '';

    $positions = [];
    foreach ($words as $word) {
        $pos = mb_stripos($content, $word);
        if ($pos !== false) {
            $positions[] = $pos;
        }
    }

    if (empty($positions)) {
        return wp_trim_words(strip_tags($content), 20, '...');
    }

    $first_pos = min($positions);
    $start = max(0, $first_pos - $radius);
    $end = min(mb_strlen($content), $first_pos + $radius * 2);

    $excerpt = '...' . mb_substr($content, $start, $end - $start) . '...';

    foreach ($words as $word) {
        if (mb_stripos($excerpt, $word) !== false) {
            $excerpt = str_ireplace($word, '<mark>' . $word . '</mark>', $excerpt);
        }
    }

    return $excerpt;
}

function prokopenko_is_stop_word($word)
{
    $stop_words = ['и', 'в', 'на', 'с', 'как', 'что', 'не', 'он', 'она', 'оно', 'мы', 'вы', 'они'];
    return in_array(mb_strtolower($word), $stop_words);
}
