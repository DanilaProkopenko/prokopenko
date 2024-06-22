// import { Carousel } from "../js/library/fancyapps/ui/dist/carousel/carousel.esm.js";
import { Thumbs } from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js";
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";
import "@fancyapps/ui/dist/carousel/carousel.css";

(function gallery() {
    systemElements();
    function systemElements() {
        const system = Array.from(document.getElementsByClassName('f-carousel'));
        if (system) {
            system.forEach((item) => {
                const options = {
                    infinite: true,
                    transition: false,
                    Dots: true,
                    Navigation: false,
                    center: true
                }

                new Carousel(item, options);
                Fancybox.bind('[data-fancybox="post-gallery"]', {
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
            })
        }
    }
}())