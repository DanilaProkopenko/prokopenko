// Функция для обновления высоты контента
function updateContentHeight(content) {
    content.style.height = 'auto';
    const targetHeight = content.scrollHeight;
    requestAnimationFrame(() => {
        content.style.height = `${targetHeight}px`;
    });
}

// Функция debounce для оптимизации события resize
function debounce(fn, ms) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, arguments), ms);
    };
}

// Обработчик клика на кнопку "Свернуть/Развернуть"
document.querySelectorAll('.more-button').forEach(button => {
    const buttonContentFirst = button.textContent;

    button.addEventListener('click', () => {
        const content = button.nextElementSibling;

        if (content && content.classList.contains('more-content')) {
            const isActive = content.classList.contains('active');

            // Если контент уже открыт — сворачиваем
            if (isActive) {
                content.style.height = content.scrollHeight + 'px'; // Устанавливаем текущую высоту
                setTimeout(() => {
                    content.style.height = '0px'; // Анимируем сворачивание
                }, 20);

                content.classList.remove('active');
                button.textContent = buttonContentFirst;
            } else {
                // Раскрываем
                content.classList.add('active');
                content.style.height = '0px'; // Сначала 0, чтобы начать анимацию

                // Делаем reflow, чтобы браузер "увидел" новое значение height
                void content.offsetWidth;

                // Устанавливаем финальную высоту с небольшой задержкой
                setTimeout(() => {
                    content.style.height = content.scrollHeight + 'px';
                }, 20);

                button.textContent = 'Свернуть ▲';
            }
        }
    });
});

document.querySelectorAll('.more-content.active img').forEach(img => {
    if (!img.complete) {
        img.addEventListener('load', () => {
            updateContentHeight(img.closest('.more-content'));
        });
    }
});

// Наблюдаем за изменением размера окна и обновляем высоту активных блоков
window.addEventListener('resize', debounce(() => {
    document.querySelectorAll('.more-content.active').forEach(content => {
        // Устанавливаем height = auto чтобы пересчитать scrollHeight
        content.style.height = 'auto';

        // Запрашиваем scrollHeight — это заставит браузер выполнить reflow
        const targetHeight = content.scrollHeight;

        // Обязательно вызываем requestAnimationFrame, чтобы обновление высоты было синхронизировано с кадром
        requestAnimationFrame(() => {
            content.style.height = `${targetHeight}px`;
        });
    });
}, 200));