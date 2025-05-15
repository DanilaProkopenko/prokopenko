import { Fancybox } from '@fancyapps/ui';

(function fancyapps() {
    Fancybox.bind(
        'a[href*=".jpg"],a[href*=".jpeg"],a[href*=".png"],a[href*=".gif"]',
        {
            // Your custom options
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
        }
    );
    // console.log('fancyapps')
})();