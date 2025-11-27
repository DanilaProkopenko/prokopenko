document.addEventListener("DOMContentLoaded", function () {

    function lazyVideo() {
        let lazyContainer = Array.from(document.getElementsByClassName('lazy_container'));
        lazyContainer.forEach(el => {
            observerVideo(el);
        });

        function observerVideo(el) {
            var img = el.getElementsByClassName("placeholder_image")[0];
            // var lazyContainer = document.getElementById("lazy_container");
            // ✅ Добавь эту проверку
            if (!img) {
                console.warn('placeholder_image не найден:', el);
                return;
            }
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
    lazyVideo();
})