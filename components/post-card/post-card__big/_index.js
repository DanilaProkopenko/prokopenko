// import { Thumbs } from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js";
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
// import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";

import "@fancyapps/ui/dist/carousel/carousel.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

(function gallery() {
    const system = Array.from(document.getElementsByClassName('f-carousel'));
    if (system) {
        system.forEach((item) => {
            let itemDataGallery = item.getAttribute('data-gallery');
            const options = {
                infinite: true,
                transition: false,
                Dots: true,
                Navigation: true,
                center: true,
                breakpoints: {
                    "(max-width: 769px)": {
                        Navigation: false
                    },
                },
            }

            new Carousel(item, options);
            Fancybox.bind('[data-fancybox="' + itemDataGallery + '"]', {
                idle: false,
                compact: false,
                dragToClose: true,
                groupAll: false,

                Thumbs: {
                    type: 'classic'
                },


                Toolbar: {
                    display: {
                        left: [],
                        middle: [],
                        right: ["close"],
                    }
                },

                Carousel: {
                    transition: 'slide',
                    preload: 3,
                },

                // Images: {
                //     zoom: false,
                //     Panzoom: {
                //         panMode: 'mousemove',
                //         mouseMoveFactor: 1.1,
                //     },
                // },
            });
        })
    }
}())