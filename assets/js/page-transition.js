// import barba from '@barba/core';
import barba from '@barba/core/dist/barba.js';
import { gsap } from "gsap/all.js";

document.addEventListener('DOMContentLoaded', function () {

    console.log('transition.js')
    // **
    // *
    // 
    // Code V1
    // 
    // *
    // **
    // 
    // 

    function loadjscssfile(filename, filetype) {
        console.log("Перезагрузка скриптов")
        if (filetype == "js") {

            const existingScript = document.querySelector(`script[src="${filename}"]`);
            if (existingScript) {
                existingScript.remove();
            } else {
            }
            var fileref = document.createElement("script");
            fileref.setAttribute("type", "text/javascript");
            fileref.setAttribute("src", filename);
        } else if (filetype == "css") {
            const existingCSS = document.querySelector(`link[href='${filename}']`);
            if (existingCSS) {
                existingCSS.remove();
            }
            var fileref = document.createElement("link");
            fileref.setAttribute("rel", "stylesheet");
            fileref.setAttribute("type", "text/css");
            fileref.setAttribute("href", filename);
        }
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    function deleteOldScripts() {
        console.log("Удаление скриптов")
        const oldScript = document.getElementById('wwzrds-js');
        if (oldScript) {
            oldScript.remove();
        }

        const oldScripts = document.querySelectorAll('.main-script');
        if (oldScripts) {
            oldScripts.forEach(script => script.remove());
        }
    }

    function load_js() {
        loadjscssfile();
        deleteOldScripts();

        var head = document.getElementsByTagName('head')[0];
        var newScript = document.createElement('script');
        newScript.src = '/wp-content/themes/prokopenko/_dist/js/app.min.js?' + (new Date()).getTime();
        newScript.className = "main-script";
        head.appendChild(newScript);

        // Optionally, you can trigger any necessary initialization functions here
        // For example, if WordPress scripts have a specific initialization function, call it here
        if (window.wp && window.wp.init) {
            window.wp.init();
        }
    }
    barba.hooks.beforeEnter(({ current, next }) => {
        if (current.container) {
            let nextHtml = next.html;
            let response = nextHtml.replace(/(<\/?)body( .+?)?>/gi, "$1notbody$2>", nextHtml);
            let bodyClasses = $(response).filter("notbody").attr("class");
            $("body").attr("class", bodyClasses);
        }
    });

    barba.hooks.afterEnter(() => {
        addEvents();
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    function leaveAnimation(e) {
        return new Promise(async (resolve) => {
            await tl
                .to(e, {
                    duration: .5,
                    y: -100,
                    opacity: 0,
                })
                .then();
            resolve();
            setTimeout(function () {
                e.style.opacity = "0";
            }, 4000);
        });
    }

    function enterAnimation(e) {
        return new Promise(async (resolve) => {
            await tl
                .from(e, {
                    duration: .5,
                    y: 100,
                    opacity: 0,
                })
                .then();
            resolve();
        });
    }

    barba.hooks.after((data) => {

        // jQuery(document).trigger('ready'); // Для плагинов,依赖 на jQuery
        // window.dispatchEvent(new Event('load')); // Для других скриптов
        console.log('Хук After')
        load_js();
    });

    // barba.init({
    //     timeout: 5000,
    //     debug: false,
    //     transitions: [
    //         {
    //             sync: false,
    //             leave: ({ current }) => leaveAnimation(current.container),
    //             enter: ({ next }) => {
    //                 window.scrollTo(0, 0);
    //                 enterAnimation(next.container);
    //             },
    //         },
    //     ],
    // });


    // **
    // *
    //
    // Code V2
    //
    // *
    // **
    //
    //
});