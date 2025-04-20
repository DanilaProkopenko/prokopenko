document.querySelectorAll('.more-button').forEach(button => {
    button.addEventListener('click', () => {
        // Находим следующий элемент с классом 'more-content'
        const content = button.nextElementSibling;

        if (content && content.classList.contains('more-content')) {
            // Если контент уже раскрыт, сворачиваем его
            if (content.style.height) {
                content.style.height = null; // Сбрасываем высоту до auto
                button.textContent = 'Читать далее';
            } else {
                // Иначе раскрываем контент
                content.style.height = content.scrollHeight + 'px'; // Устанавливаем высоту по содержимому
                button.textContent = 'Свернуть';
            }
        }
    });
});