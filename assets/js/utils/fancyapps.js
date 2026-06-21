// import { Fancybox } from '@fancyapps/ui';

// function wrapImagesInLinks() {
//     const container = document.querySelector('.single-page--v1__content');
//     if (!container) return;

//     const images = container.querySelectorAll('img:not(a>img), .wp-block-image img:not(a>img)');
//     images.forEach(img => {
//         if (img.parentElement.tagName === 'A') return;
//         const src = img.src;
//         if (!src) return;

//         const link = document.createElement('a');
//         link.href = src;
//         link.setAttribute('data-fancybox', 'gallery');
//         link.setAttribute('data-type', 'image');

//         img.replaceWith(link);
//         link.appendChild(img);
//     });
// }

// (function fancyapps() {
//     let scrollPosition = 0;

//     const fancyboxConfig = {
//         // 🔥 Отключаем возврат фокуса (это вызывает скролл наверх)
//         returnFocus: false,

//         // 🔥 Отключаем встроенное управление скроллом
//         preventScroll: false,

//         // Управление скроллом: сохраняем позицию ДО показа и восстанавливаем ПОСЛЕ закрытия
//         on: {
//             reveal: () => {
//                 // Запоминаем текущую позицию скролла перед открытием
//                 scrollPosition = window.scrollY || window.pageYOffset;
//             },
//             destroy: () => {
//                 // Восстанавливаем позицию скролла с задержкой (даёт время на анимацию закрытия)
//                 setTimeout(() => {
//                     window.scrollTo({ top: scrollPosition, left: 0, behavior: 'auto' });
//                 }, 100);
//             }
//         },

//         // Остальные параметры
//         idle: false,
//         compact: false,
//         dragToClose: true,
//         groupAll: false,

//         Thumbs: false,
//         Toolbar: false,

//         Carousel: {
//             transition: 'fadeFast',
//             preload: 3,
//             Navigation: false,
//         },

//         Images: {
//             zoom: false,
//             Panzoom: { panMode: 'mousemove', mouseMoveFactor: 1.1 },
//             initialSize: 'fit',
//             minScale: 0.1,
//             maxScale: 1,
//         }
//     };

//     Fancybox.bind('[data-fancybox]', fancyboxConfig);

//     wrapImagesInLinks();

//     Fancybox.bind(
//         '.single-page--v1__content a[href$=".jpg"], ' +
//         '.single-page--v1__content a[href$=".jpeg"], ' +
//         '.single-page--v1__content a[href$=".png"], ' +
//         '.single-page--v1__content a[href$=".gif"]',
//         fancyboxConfig
//     );

//     // На случай, если контент загружается позже
//     document.addEventListener('DOMContentLoaded', wrapImagesInLinks);
//     window.addEventListener('load', wrapImagesInLinks);
// })();