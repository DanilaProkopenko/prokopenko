// import { Thumbs } from "@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js";
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';
// import { Autoplay } from "@fancyapps/ui/dist/carousel/carousel.autoplay.esm.js";
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";

import "@fancyapps/ui/dist/carousel/carousel.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

(function gallery() {

    let postCardBig = Array.from(document.getElementsByClassName('post-card__big'));
    postCardBig.forEach((item) => {
        let postCardGallery = item.getElementsByClassName('post-card__big__gallery_carousel')[0];
        let postCardGalleryBackImg = item.getElementsByClassName('post-card__big__gallery__background__source')[0];
        const postCardGalleryOptions = {
            infinite: true,
            transition: 'crossfade',
            Dots: true,
            Navigation: true,
            center: true,
            breakpoints: {
                "(max-width: 1220px)": {
                    Navigation: false
                },
            },
            on: {
                change: (instance) => {
                    // Current page
                    const page = instance.page;
                    // Page count
                    const pages = instance.pages.length;
                    // Current page slides
                    const slides = instance.pages[page].slides;
                    const slide = Array.from(slides);
                    const slideImgSrc = slide[0].el.getAttribute('data-img-src');

                    postCardGalleryBackImg.setAttribute('src', slideImgSrc)
                },
            },
        };
        let mainCarousel = new Carousel(postCardGallery, postCardGalleryOptions);

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