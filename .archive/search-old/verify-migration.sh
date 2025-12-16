#!/bin/bash
# Script для проверки миграции поиска

echo "🔍 Проверка миграции поиска..."
echo ""

# Проверка файлов
echo "📁 Проверка файлов:"
SEARCH_DIR="/wp-content/themes/prokopenko/includes/search"

files=(
    "init.php"
    "ajax-handler.php"
    "script.js"
    "style.css"
    "README.md"
    "QUICKSTART.md"
    "MIGRATION_REPORT.md"
    "CHECKLIST.md"
    "MIGRATION_COMPLETE.md"
)

for file in "${files[@]}"; do
    if [ -f ".$SEARCH_DIR/$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - НЕ НАЙДЕН"
    fi
done

echo ""
echo "📝 Проверка функций в ajax-handler.php:"

php -r "
\$file = '.$SEARCH_DIR/ajax-handler.php';
\$content = file_get_contents(\$file);
\$functions = [
    'prokopenko_custom_ajax_search_handler',
    'prokopenko_levenshtein_utf8',
    'prokopenko_highlight_fuzzy_match',
    'prokopenko_get_search_excerpt',
    'prokopenko_get_max_distance',
    'prokopenko_is_stop_word'
];

foreach (\$functions as \$func) {
    if (strpos(\$content, 'function ' . \$func) !== false) {
        echo \"✅ \$func\n\";
    } else {
        echo \"❌ \$func - НЕ НАЙДЕНА\n\";
    }
}
"

echo ""
echo "🔄 Проверка AJAX action:"

php -r "
\$file = '.$SEARCH_DIR/script.js';
\$content = file_get_contents(\$file);

if (strpos(\$content, 'action=prokopenko_search') !== false) {
    echo \"✅ AJAX action = prokopenko_search\n\";
} else {
    echo \"❌ AJAX action не найден\n\";
}
"

echo ""
echo "✨ Проверка functions.php:"

php -r "
\$file = '/wp-content/themes/prokopenko/functions.php';
\$content = file_get_contents(\$file);

if (strpos(\$content, 'includes/search/init.php') !== false) {
    echo \"✅ Подключение поиска в functions.php найдено\n\";
} else {
    echo \"❌ Подключение поиска не найдено\n\";
}
"

echo ""
echo "🎉 Миграция завершена!"
echo ""
echo "📋 Следующие шаги:"
echo "1. Деактивировать плагин 'Custom AJAX Search' в админпанели"
echo "2. Проверить работу поиска на фронте"
echo "3. Удалить плагин (если всё работает)"
echo ""
