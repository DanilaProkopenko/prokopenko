import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";

import "@fancyapps/ui/dist/carousel/carousel.css";

const initBlockTemplate = () => {
    const postList = document.getElementsByClassName('section__post-list__big')[0];
    if (postList) {
        gsap.registerPlugin(ScrollTrigger);
        // postListAnimation();
    }

    //Проверка ширины окна
    // 767
    // if (window.innerWidth > 1024) {
    //     postListAnimation();
    // } else {
    //     postListGallery();
    // }

    // window.addEventListener("resize", (event) => {
    //     if (window.innerWidth > 1024) {
    //         postListAnimation();
    //     } else {
    //         postListGallery();
    //     }
    // })
    
    function postListAnimation() {
        const postList = document.getElementsByClassName('section__post-list__big')[0];
        postList.classList.add('section__post-list__big__animation')
        // if (window.innerWidth > 1024) {
        //     postList.classList.add('section__post-list__big__animation')
        //     postList.classList.remove('f-carousel')
        // } else {
        //     postList.classList.remove('section__post-list__big__animation')
        //     postList.classList.add('f-carousel')
        // }

        let tl = gsap.timeline({
            scrollTrigger: {
                // trigger: ".cards",
                trigger: ".section__post-list__big__animation",
                pin: true,
                pinSpacing: true,
                markers: false,
                start: "top-=90rem top", // when the top of the trigger hits the top of the viewport
                end: "+=2500", // end after scrolling 1000px beyond the start
                scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            }
        });
        tl.to('.card1', {
            yPercent: 0,
            opacity: 1
        })

        tl.from('.card2', {
            yPercent: 120,
            opacity: 1,
        })
        // set the active section based on the direction, 
        // and position it part-way through the transition because 
        // that's more intuitive
        tl.to('.card1', {
            scale: 0.95,
            yPercent: -8,
            // opacity: 0.7
        }, "-=0.3")

        tl.to('.card2', {
            yPercent: 0,
            opacity: 1
        })

        tl.from('.card3', {
            yPercent: 120,
            opacity: 1,
        })

        tl.to('.card2', {
            scale: 0.95,
            yPercent: -8,
            // opacity: 0.7
        }, "-=0.3")

        tl.to('.card1', {
            // scale: 0.7,
            scale: 0.9,
            // yPercent: -0.5/,
            yPercent: -15,
            // opacity: 0
        }, "-=0.3")

        tl.to('.card3', {
            yPercent: 0,
            opacity: 1
        })
        // tl.to('.card1', {
        //     // scale: 0.7,
        //     scale: 0.8,
        //     // yPercent: -0.5/,
        //     yPercent: -0.5,
        //     // opacity: 0
        // }, "-=0.3")
        // tl.to('.card2', {
        //     scale: 0.8,
        //     yPercent: -0.5,
        //     // yPercent: -10,
        //     // opacity: 0
        // }, "-=0.3")

        // tl.to('.card3', {});
    }

    function postListGallery() {
        const postList = document.getElementsByClassName('section__post-list__big')[0];
        if (window.innerWidth > 1024) {
            postList.classList.add('section__post-list__big__animation')
            postList.classList.remove('f-carousel')
        } else {
            postList.classList.remove('section__post-list__big__animation')
            postList.classList.add('f-carousel')
        }
        // let postCardBig = Array.from(document.getElementsByClassName('post-card__big'));
        // postList.forEach((item) => {
        let gallery = document.getElementsByClassName('section__post-list__big')[0];
        const options = {
            infinite: false,
            transition: 'crossfade',
            Dots: true,
            Navigation: false,
            center: true,
        };
        let mainCarousel = new Carousel(gallery, options);
        // })
    }
};

initBlockTemplate();