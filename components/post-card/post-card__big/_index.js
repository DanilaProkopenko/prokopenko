// import { Thumbs } from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js";
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
// import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";

import "@fancyapps/ui/dist/carousel/carousel.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

(function gallery() {
    // const postGalleryCarousel = Array.from(document.getElementsByClassName('post-card__big__gallery_carousel'));
    // if (postGalleryCarousel) {
    //     postGalleryCarousel.forEach((item) => {
    //         let itemDataGallery = item.getAttribute('data-gallery');
    //         const options = {
    //             infinite: true,
    //             transition: false,
    //             Dots: true,
    //             Navigation: true,
    //             center: true,
    //             breakpoints: {
    //                 "(max-width: 769px)": {
    //                     Navigation: false
    //                 },
    //             },
    //         }

    //         new Carousel(item, options);
    //         Fancybox.bind('[data-fancybox="' + itemDataGallery + '"]', {
    //             idle: false,
    //             compact: false,
    //             dragToClose: true,
    //             groupAll: false,

    //             Thumbs: {
    //                 type: 'classic'
    //             },


    //             Toolbar: {
    //                 display: {
    //                     left: [],
    //                     middle: [],
    //                     right: ["close"],
    //                 }
    //             },

    //             Carousel: {
    //                 transition: 'slide',
    //                 preload: 3,
    //             },

    //             // Images: {
    //             //     zoom: false,
    //             //     Panzoom: {
    //             //         panMode: 'mousemove',
    //             //         mouseMoveFactor: 1.1,
    //             //     },
    //             // },
    //         });
    //     })
    // }

    let postCardBig = Array.from(document.getElementsByClassName('post-card__big'));
    postCardBig.forEach((item) => {
        console.log(item);
        let postCardGallery = item.getElementsByClassName('post-card__big__gallery_carousel')[0];
        const postCardGalleryOptions = {
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
        };
        let mainCarousel = new Carousel(postCardGallery, postCardGalleryOptions);

        let postCardGalleryBackground = item.getElementsByClassName('post-card__big__gallery__background')[0];
        const postCardGalleryBackgroundOptions = {
            infinite: false,
            transition: false,
            center: true,
            fill: true,
            slidesPerPage: 1,
            dragFree: true,
            Navigation: false,
            Dots: false,

            Sync: {
                target: mainCarousel,
            },
        };

        new Carousel(postCardGalleryBackground, postCardGalleryBackgroundOptions);

        let itemDataGallery = postCardGallery.getAttribute('data-gallery');
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
        });
    })
}())