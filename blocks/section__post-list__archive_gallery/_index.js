
import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import '@fancyapps/ui/dist/carousel/carousel.css';

const initBlockTemplate = () => {
    let postList = Array.from(document.getElementsByClassName('posts-list__archive-gallery'));
    postList.forEach((item) => {
        // let postCardGallery = item.getElementsByClassName('post-card__big__gallery_carousel')[0];
        // let postCardGalleryBackImg = item.getElementsByClassName('post-card__big__gallery__background__source')[0];
        const options = {
            infinite: false,
            transition: 'crossfade',
            Dots: false,
            Navigation: true,
            center: true,
            // Thumbs: {
            //     // type: "modern",
            //     type: 'classic',
            //     Carousel: {
            //         slidesPerPage: 'auto',

            //         Navigation: false,
            //         center: false,
            //         fill: false,
            //         dragFree: true,
            //         axis: 'x',
            //         // breakpoints: {
            //         //     '(min-width: 768px)': {
            //         //         axis: 'y',
            //         //     },
            //         // },
            //     },
            // },
            breakpoints: {
                "(max-width: 1220px)": {
                    Navigation: false
                },
            },
        };
        let mainCarousel = new Carousel(item, options);
    })
};

initBlockTemplate();