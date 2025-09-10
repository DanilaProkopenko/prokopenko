// Управление темами
function initThemeSwitcher() {
    const body = document.body;
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Удаляем старые темы
    body.classList.remove('theme-dark', 'theme-orange');

    if (savedTheme === 'dark') {
        body.classList.add('theme-dark');
    } else if (savedTheme === 'orange') {
        body.classList.add('theme-orange');
    }
    // Если 'light' — ничего не добавляем

    window.switchTheme = function (theme) {
        // Удаляем все темы
        body.classList.remove('theme-dark', 'theme-orange');

        if (theme === 'dark') {
            body.classList.add('theme-dark');
        } else if (theme === 'orange') {
            body.classList.add('theme-orange');
        }

        localStorage.setItem('theme', theme);

        // Опционально: обновить FancyBox, если он зависит от темы
        document.dispatchEvent(new Event('themechange'));
    };
}



document.addEventListener("DOMContentLoaded", function () {
    // Вызов
    // initThemeSwitcher();
})