// import { Fancybox } from '@fancyapps/ui';

// (function fancyapps() {
//     Fancybox.bind(
//         'a[href*=".jpg"],a[href*=".jpeg"],a[href*=".png"],a[href*=".gif"]',
//         {
//             // Your custom options
//             idle: false,
//             compact: false,
//             dragToClose: true,
//             groupAll: false,

//             Thumbs: {
//                 type: 'classic'
//             },

//             Toolbar: {
//                 absolute: true,

//                 display: {
//                     left: [],
//                     middle: [],
//                     right: ['close'],
//                 },
//             },

//             Carousel: {
//                 transition: 'fadeFast',
//                 preload: 3,
//             },

//             Images: {
//                 zoom: false,
//                 Panzoom: {
//                     panMode: 'mousemove',
//                     mouseMoveFactor: 1.1,
//                 },
//             },
//         }
//     );
//     // console.log('fancyapps')
// })();

import { Fancybox } from '@fancyapps/ui';

function wrapImagesInLinks() {
    const container = document.querySelector('.single-page--v1__content');
    if (!container) return;

    const images = container.querySelectorAll('img:not(a>img), .wp-block-image img:not(a>img)');
    images.forEach(img => {
        if (img.parentElement.tagName === 'A') return;
        const src = img.src;
        if (!src) return;

        const link = document.createElement('a');
        link.href = src;
        link.setAttribute('data-fancybox', 'gallery');
        link.setAttribute('data-type', 'image');

        img.replaceWith(link);
        link.appendChild(img);
    });
}

(function fancyapps() {
    wrapImagesInLinks();

    Fancybox.bind(
        '.single-page--v1__content a[href$=".jpg"], ' +
        '.single-page--v1__content a[href$=".jpeg"], ' +
        '.single-page--v1__content a[href$=".png"], ' +
        '.single-page--v1__content a[href$=".gif"]',
        {

            idle: false,
            compact: false,
            dragToClose: true,
            groupAll: false,
            // Thumbs: { type: 'classic' },
            // Миниатюры (внизу)
            Thumbs: {
                type: 'classic', // или 'classic' — но лучше 'modern' для компактности
                autoStart: true,
            },

            Toolbar: false,
            Carousel: { transition: 'fadeFast', preload: 3 },
            Images: {
                zoom: false,
                Panzoom: { panMode: 'mousemove', mouseMoveFactor: 1.1 },
                initialSize: 'fit',  // Всегда вписывать, не обрезать
                minScale: 0.1,
                maxScale: 1,
            }
        }
    );

    // На случай, если контент загружается позже
    document.addEventListener('DOMContentLoaded', wrapImagesInLinks);
    window.addEventListener('load', wrapImagesInLinks);
})();