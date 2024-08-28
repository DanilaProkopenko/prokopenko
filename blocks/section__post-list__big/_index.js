const initBlockTemplate = () => {

    gsap.registerPlugin(ScrollTrigger);

    //let links = gsap.utils.toArray("nav a");

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".cards",
            pin: true,
            pinSpacing: true,
            markers: false,
            start: "top-=70rem top", // when the top of the trigger hits the top of the viewport
            end: "+=2000", // end after scrolling 1000px beyond the start
            scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        }
    });
    tl.to('.card1', {
        yPercent: 0,
        opacity: 1
    })

    tl.from('.card2', {
        yPercent: 75,
        opacity: 0,
    })
    // set the active section based on the direction, and position it part-way through the transition because that's more intuitive
    tl.to('.card1', {
        scale: 0.95,
        yPercent: -0.5,
        opacity: 0.7
    }, "-=0.3")

    tl.to('.card2', {
        yPercent: 0,
        opacity: 1
    })

    tl.from('.card3', {
        yPercent: 75,
        opacity: 0,
    })

    tl.to('.card2', {
        scale: 0.98,
        yPercent: -0.4,
        opacity: 0.7
    }, "-=0.3")

    tl.to('.card3', {
        yPercent: 0,
        opacity: 1
    })

    tl.to('.card3', {});

    console.log('gsap post lists');
};

initBlockTemplate();