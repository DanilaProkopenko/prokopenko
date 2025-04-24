import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
// import '@fancyapps/ui/dist/fancybox/fancybox.css';

const initBlockTemplate = () => {


    Fancybox.bind('[data-fancybox]', {
        idle: false,
        compact: false,
        dragToClose: true,
        groupAll: false,

        Thumbs: {
            type: 'classic'
        },

        Toolbar: {
          absolute: true,

            display: {
                left: [],
                middle: [],
                right: ['close'],
            },
        },

        Carousel: {
            transition: 'fadeFast',
            preload: 3,
        },

        Images: {
            zoom: false,
            Panzoom: {
                panMode: 'mousemove',
                mouseMoveFactor: 1.1,
            },
        },
    });

};

initBlockTemplate();

