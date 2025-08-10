import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
// import '@fancyapps/ui/dist/fancybox/fancybox.css';

const initBlockTemplate = () => {
    let scrollPosition = 0;

    Fancybox.bind('[data-fancybox]', {
        // 🔥 Отключаем группировку, даже если data-fancybox одинаковый
        getGroupSettings: () => ({
            groupAttr: null, // Игнорируем data-fancybox → нет галереи
        }),

        // 🔥 Отключаем возврат фокуса (чтобы не скроллило)
        returnFocus: false,

        // Управление скроллом
        on: {
            beforeShow: () => {
                scrollPosition = window.pageYOffset;
            },
            destroy: () => {
                // Возвращаем скролл на место ПОСЛЕ закрытия
                setTimeout(() => {
                    window.scrollTo({ top: scrollPosition, behavior: 'auto' });
                }, 50);
            }
        },

        // ⚠️ preventScroll: true может мешать — лучше убрать или оставить false
        preventScroll: false,

        idle: false,
        compact: false,
        dragToClose: true,
        groupAll: false, // уже не так важно, но пусть будет

        // 🖼️ Миниатюры — ОСТАВЛЯЕМ, ЕСЛИ НУЖНЫ
        // Если ты хочешь, чтобы миниатюры были, но только для одного изображения — они будут пустые
        // Лучше отключить, если галереи нет
        Thumbs: false, // ✅ Рекомендую отключить, если нет галереи

        // Если всё же хочешь оставить миниатюры (например, для будущих галерей) — оставь:
        // Thumbs: { type: 'classic', autoStart: true },

        Toolbar: false,

        // 🔺 Отключаем стрелки навигации
        Carousel: {
            transition: 'fadeFast',
            preload: 3,
            Navigation: false, // 🔥 Убираем стрелки влево/вправо
        },

        Images: {
            zoom: false,
            Panzoom: { panMode: 'mousemove', mouseMoveFactor: 1.1 },
            initialSize: 'fit',
            minScale: 0.1,
            maxScale: 1,
        }
    });

};

initBlockTemplate();

