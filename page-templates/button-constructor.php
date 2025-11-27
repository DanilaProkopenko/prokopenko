<?php
/* Template name: Конструктор кнопок */

get_header();
?>
<div class=" pd_width_50 pd_section">
    <h1 class="wp-block-post-title">
        <?php single_post_title(); ?>
    </h1>
    <div class="pd_block mode-switch">
        <button class="mode-btn active" data-mode="button">Кнопка</button>
        <button class="mode-btn" data-mode="text">Только текст</button>
    </div>

    <div class="pd_block controls">
        <!-- Общее -->
        <p class="control-group">
            <label for="content">Текст</label>
            <input type="text" id="content" value="Нажми меня" placeholder="Введите текст...">
        </p>

        <!-- Для кнопки -->
        <p class="control-group button-only">
            <label for="width">Ширина</label>
            <input type="text" id="width" value="200px" placeholder="200px">
        </p>

        <p class="control-group button-only">
            <label for="height">Высота</label>
            <input type="text" id="height" value="50px" placeholder="50px">
        </p>

        <p class="control-group button-only">
            <label for="radius">Радиус скругления</label>
            <input type="text" id="radius" value="10px" placeholder="10px">
        </p>

        <p class="control-group button-only">
            <label for="bgColor">Цвет фона</label>
            <input type="color" id="bgColor" value="#007bff">
        </p>

        <p class="control-group button-only">
            <label for="textColor">Цвет текста</label>
            <input type="color" id="textColor" value="#ffffff">
        </p>

        <!-- Только для текста -->
        <p class="control-group text-only hidden">
            <label for="fontSize">Размер шрифта</label>
            <input type="text" id="fontSize" value="24px" placeholder="24px">
        </p>

        <p class="control-group text-only hidden">
            <label for="fontFamily">Шрифт</label>
            <select id="fontFamily">
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Lato', sans-serif">Lato</option>
                <option value="'Oswald', sans-serif">Oswald</option>
                <option value="'Raleway', sans-serif">Raleway</option>
                <option value="'Poppins', sans-serif">Poppins</option>
                <option value="'Inter', sans-serif">Inter</option>
                <option value="'Ubuntu', sans-serif">Ubuntu</option>
                <option value="'Noto Sans', sans-serif">Noto Sans</option>
            </select>
        </p>

        <p class="control-group text-only hidden">
            <label for="textColorPlain">Цвет текста</label>
            <input type="color" id="textColorPlain" value="#333333">
        </p>
    </div>

    <div class="preview pd_block">
        <div id="preview-element" class="button-preview">Нажми меня</div>
    </div>

    <script>
        const modeButtons = document.querySelectorAll('.mode-btn');
        const buttonOnlyControls = document.querySelectorAll('.button-only');
        const textOnlyControls = document.querySelectorAll('.text-only');
        const previewElement = document.getElementById('preview-element');

        // Поля ввода
        const contentInput = document.getElementById('content');
        const widthInput = document.getElementById('width');
        const heightInput = document.getElementById('height');
        const radiusInput = document.getElementById('radius');
        const bgColorInput = document.getElementById('bgColor');
        const textColorInput = document.getElementById('textColor');

        const fontSizeInput = document.getElementById('fontSize');
        const fontFamilySelect = document.getElementById('fontFamily');
        const textColorPlainInput = document.getElementById('textColorPlain');

        let currentMode = 'button';

        // Переключение режимов
        modeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentMode = btn.dataset.mode;

                if (currentMode === 'button') {
                    buttonOnlyControls.forEach(el => el.classList.remove('hidden'));
                    textOnlyControls.forEach(el => el.classList.add('hidden'));
                    previewElement.className = 'button-preview';
                } else {
                    buttonOnlyControls.forEach(el => el.classList.add('hidden'));
                    textOnlyControls.forEach(el => el.classList.remove('hidden'));
                    previewElement.className = 'text-preview';
                }

                updatePreview();
            });
        });

        // Функция безопасного парсинга значения с единицами
        function parseDimension(value) {
            value = value.trim();
            if (!value) return 'auto';
            // Проверяем, заканчивается ли на известную единицу
            const units = ['px', 'pt', 'mm', '%', 'em', 'rem', 'vw', 'vh'];
            for (let unit of units) {
                if (value.endsWith(unit)) {
                    const num = parseFloat(value);
                    if (!isNaN(num)) return `${num}${unit}`;
                }
            }
            // Если не нашли — возвращаем как есть (или px по умолчанию)
            const num = parseFloat(value);
            return !isNaN(num) ? `${num}px` : 'auto';
        }

        // Обновление превью
        function updatePreview() {
            previewElement.innerText = contentInput.value || ' ';

            if (currentMode === 'button') {
                previewElement.style.width = parseDimension(widthInput.value);
                previewElement.style.height = parseDimension(heightInput.value);
                previewElement.style.borderRadius = parseDimension(radiusInput.value);
                previewElement.style.backgroundColor = bgColorInput.value;
                previewElement.style.color = textColorInput.value;
                previewElement.style.lineHeight = parseDimension(heightInput.value); // вертикальное центрирование
                previewElement.style.fontFamily = 'inherit';
            } else {
                previewElement.style.width = 'auto';
                previewElement.style.height = 'auto';
                previewElement.style.borderRadius = '0';
                previewElement.style.backgroundColor = 'transparent';
                previewElement.style.padding = '0';
                previewElement.style.fontSize = parseDimension(fontSizeInput.value);
                previewElement.style.fontFamily = fontFamilySelect.value;
                previewElement.style.color = textColorPlainInput.value;
                previewElement.style.lineHeight = 'normal';
            }
        }

        // Слушатели
        const allInputs = [
            contentInput, widthInput, heightInput, radiusInput, bgColorInput, textColorInput,
            fontSizeInput, fontFamilySelect, textColorPlainInput
        ];

        allInputs.forEach(input => {
            input.addEventListener('input', updatePreview);
        });

        // Инициализация
        updatePreview();
    </script>


    <style>
        .button-preview {
            text-align: center;
        }

        .text-preview {
            text-align: left;

        }

        .hidden {
            display: none !important;
        }

        /* Цветные инпуты */
        input[type="color"] {
            height: 40px;
            padding: 4px;
            border-radius: 4px;
        }
    </style>
</div>



<?
get_footer();
