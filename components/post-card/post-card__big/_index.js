import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
// import '@fancyapps/ui/dist/carousel/carousel.css';

import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';
// import '@fancyapps/ui/dist/carousel/carousel.thumbs.css';
const initBlockTemplate = () => {

    // ленивая загрузка видео
    function lazyVideo() {
        let lazyContainer = Array.from(document.getElementsByClassName('lazy_container'));
        lazyContainer.forEach(el => {
            observerVideo(el);
        });

        function observerVideo(el) {
            var img = el.getElementsByClassName("placeholder_image")[0];
            // var lazyContainer = document.getElementById("lazy_container");

            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 0.5 // Trigger when img is 50% visible
            };

            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        // remove the img
                        el.removeChild(img);
                        // create a video instead

                        const videoElement = document.createElement("video");
                        videoElement.src = img.getAttribute('data-src-video');
                        videoElement.className += img.getAttribute('data-src-class');

                        videoElement.alt = "Lazy-loaded Video";
                        videoElement.poster = img.getAttribute('data-src-img');
                        if (img.getAttribute('data-video-controls') == '1') {
                            videoElement.controls = true;
                        }
                        if (img.getAttribute('data-video-autoplay') == '1') {
                            videoElement.autoplay = true;
                        }
                        if (img.getAttribute('data-video-muted') == '1') {
                            videoElement.muted = true;
                        }
                        if (img.getAttribute('data-video-loop') == '1') {
                            videoElement.loop = true;
                        }
                        videoElement.playsInline = true;

                        videoElement.preload = "auto";

                        // swap it in for the img
                        el.appendChild(videoElement);
                        // load video
                        videoElement.load();
                        // disconnect observer
                        observer.unobserve(img);
                    }
                });
            }, options);

            observer.observe(img);
        }
    }
    // lazyVideo();
    function cardGallery() {
        let postCardBig = Array.from(document.getElementsByClassName('post-card__big'));

        postCardBig.forEach((item) => {
            let postCardGallery = item.getElementsByClassName('post-card__big__gallery_carousel')[0];
            let postCardGalleryBackImg = item.getElementsByClassName('post-card__big__gallery__background__source')[0];
            const postCardGalleryOptions = {
                infinite: true,
                transition: 'crossfade',
                Dots: false,
                Navigation: false,
                center: true,
                Thumbs: {
                    // type: "modern",
                    type: 'classic',
                    Carousel: {
                        slidesPerPage: 'auto',

                        Navigation: false,
                        center: false,
                        fill: false,
                        dragFree: true,
                        axis: 'x',
                        // breakpoints: {
                        //     '(min-width: 768px)': {
                        //         axis: 'y',
                        //     },
                        // },
                    },
                },
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
            let mainCarousel = new Carousel(postCardGallery, postCardGalleryOptions, { Thumbs });

            let itemDataGallery = postCardGallery.getAttribute('data-gallery');


            function changeThumbHover() {
                const carouselThumbs = Array.from(item.getElementsByClassName('f-thumbs'));
                // console.log('carouselThumbs — ', carouselThumbs);
                carouselThumbs.forEach((item) => {
                    // console.log('thumbSlide — ')
                    const thumbSlide = Array.from(item.getElementsByClassName('f-thumbs__slide__button'));
                    thumbSlide.forEach((item) => {
                        item.addEventListener(
                            'mouseover',
                            (event) => {
                                item.classList.add('is-nav-selected');
                                const thumbIndex = item.getAttribute('data-carousel-index')
                                // console.log('thumbSlide item — ', item);
                                // console.log('thumbIndex — ', thumbIndex);
                                mainCarousel.slideTo(thumbIndex)
                            },
                        )
                        item.addEventListener(
                            'mouseout',
                            (event) => {
                                // console.log('event — ', event);
                                item.classList.remove('is-nav-selected');
                            }
                        )
                    })
                })
            }
            setTimeout(() => {
                changeThumbHover();
            }, 500);
        })
    }

    let postCardBig = Array.from(document.getElementsByClassName('post-card__big'));
    if (postCardBig) {
        setTimeout(() => {
            cardGallery();
        }, 500);
    }
};

initBlockTemplate();

