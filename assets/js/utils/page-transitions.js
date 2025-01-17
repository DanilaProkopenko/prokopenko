import barba from '@barba/core';
import { gsap } from "gsap";

// This function helps add and remove js and css files during a page transition
function loadjscssfile(filename, filetype) {
    if (filetype == "js") {
        //if filename is a external JavaScript file
        const existingScript = document.querySelector('script[src="${filename}"]');
        if (existingScript) {
            existingScript.remove();
        }
        var fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", filename);
    } else if (filetype == "css") {
        //if filename is an external CSS file
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


barba.hooks.beforeEnter(({ current, next }) => {
    // Set <body> classes for the 'next' page
    if (current.container) {
        // // only run during a page transition - not initial load
        let nextHtml = next.html;
        let response = nextHtml.replace(
            /(<\/?)body( .+?)?>/gi,
            "$1notbody$2>",
            nextHtml
        );
        let bodyClasses = $(response).filter("notbody").attr("class");
        $("body").attr("class", bodyClasses);

        // ELEMENTOR
        // Where the magic happens - this loads the new Elementor styles and removes the old styles
        // if (bodyClasses.includes("elementor-page")) {
        //     let currentPageId = current.container
        //         .querySelector(".elementor")
        //         .getAttribute("data-elementor-id");
        //     let nextPageId = next.container
        //         .querySelector(".elementor")
        //         .getAttribute("data-elementor-id");
        //     let oldScriptURL =
        //         "/wp-content/uploads/elementor/css/post-" + currentPageId + ".css";
        //     let newScriptURL =
        //         "/wp-content/uploads/elementor/css/post-" + nextPageId + ".css"; // Add this for cache fix: ?cachebuster=' + new Date().getTime()
        //     const oldElementorScript = document.querySelector(
        //         'link[src="' + oldScriptURL + '"]'
        //     );
        //     if (oldElementorScript) {
        //         oldElementorScript.remove();
        //     }
        // }
    }

    // GRAVITY FORMS
    const baseURL = window.location.hostname;
    const protocol = window.location.protocol;

    // Here we are manually reloading the gravity form scripts and styles. If you find that you get errors in future with missing assets, simply add them below.
    const gravityFormJS =
        "/wp-content/themes/prokopenko/_dist/js/app.min.js";
    // const gformWrapper = next.container.querySelectorAll(".container");
    const gformWrapper = document.querySelectorAll(".container");
    //  const gformSomethingElse = '/wp-content/plugins/gravityforms/css/somethingElse.min.css';

    // loadjscssfile(gravityFormJS, "js");
    // if (gformWrapper) {
    //     // run if the page contains a form
    //     // const gformVariablesScript = document.createElement("script");
    //     // gformVariablesScript.innerHTML = gravityFormJS;
    //     // gformVariablesScript.innerHTML = gformVariables;
    //     // document.body.appendChild(gformVariablesScript);

    //     // loadjscssfile(gravityFormJS, "js");
    //     // loadjscssfile(gformSomethingElse, 'css')

    //     // if (window["gformInitDatepicker"]) {
    //     //     gformInitDatepicker();
    //     // }

    //     // gformWrapper.forEach((element) => {
    //     //     const parent = element.parentElement;
    //     //     const scripts = parent.querySelectorAll("script");
    //     //     scripts.forEach((script) => {
    //     //         const scriptCode = script.innerHTML;
    //     //         const newScript = document.createElement("script");
    //     //         script.remove();
    //     //         newScript.innerHTML = scriptCode;
    //     //         parent.appendChild(newScript);
    //     //     });
    //     // });

    //     if (current.container) {
    //         // only run during a page transition - not initial load
    //         // add any custom JS here that you would like to load on each page
    //         // loadjscssfile(gravityFormJS, "js");
    //     }
    // }
    killEvents();

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
            // add any animation you like here
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
            // add any animation you like here
            .then();
        resolve();
    });
}

// Работает перезагрузка js файла. Но он только добавляет его заного в head
// те не перезгружает его, а создает новый. В итоге проблема с тем, что не работает js
// при повторном перезоде на страницу ушла, но он добавялет новый файл js каждый раз
// 
// Совет:
// надо попробовать перезаписывать или удалять прошлый
// 
barba.hooks.after((data) => {

    function deleteFirstOldScript() {
        let oldScript = document.querySelector('#wwzrds-js');
        console.log('deleteFirstOldScript');
        if (oldScript) {
            oldScript.remove();
        }
    };

    function deleteOldScript(name) {
        name.remove();
    };

    function load_js(count) {
        var head = document.getElementsByTagName('head')[0];
        var newScript = document.createElement('script');
        newScript.src = '/wp-content/themes/prokopenko/_dist/js/app.min.js' + '?' + (new Date()).getTime();
        newScript.className = "main-script";
        head.appendChild(newScript);

        const oldScript = Array.from(document.getElementsByClassName("main-script"));
        // console.log('oldscript — ', oldScript);
        if (oldScript[1]) {
            console.log('oldscript 1 — ', oldScript[1]);
            oldScript[0].remove()
        } else {
            console.log('oldscript 0 — ', oldScript[0]);
            deleteFirstOldScript();
        }


        // deleteOldScript(newScript);

        // const bottomDOM = document.getElementsByTagName("head")[0]
        // const newScript = document.createElement("script")
        // const oldScript = document.querySelector("main-script")
        // newScript.src = "/wp-content/themes/prokopenko/_dist/js/app.min.js"
        // newScript.className = "main-script"
        // oldScript.remove()
        // // newScript.id = "#wwzrds-js"
        // bottomDOM.appendChild(newScript)
        console.log('load_js')
    }
    function load_js(count) {
        var head = document.getElementsByTagName('head')[0];
        var newScript = document.createElement('script');
        newScript.src = '/wp-content/themes/prokopenko/_dist/js/app.min.js' + '?' + (new Date()).getTime();
        newScript.className = "main-script";
        head.appendChild(newScript);

        const oldScript = Array.from(document.getElementsByClassName("main-script"));
        // console.log('oldscript — ', oldScript);
        if (oldScript[1]) {
            console.log('oldscript 1 — ', oldScript[1]);
            oldScript[0].remove()
        } else {
            console.log('oldscript 0 — ', oldScript[0]);
            deleteFirstOldScript();
        }


        // deleteOldScript(newScript);

        // const bottomDOM = document.getElementsByTagName("head")[0]
        // const newScript = document.createElement("script")
        // const oldScript = document.querySelector("main-script")
        // newScript.src = "/wp-content/themes/prokopenko/_dist/js/app.min.js"
        // newScript.className = "main-script"
        // oldScript.remove()
        // // newScript.id = "#wwzrds-js"
        // bottomDOM.appendChild(newScript)
        console.log('load_js')
    }
    load_js();
});

// barba.hooks.afterLeave((data) => {
//     let js = document.querySelectorAll('#wwzrds-js');
//     // const js = data.next.container.querySelectorAll("script.reload-on-ajax");
//     console.log('afterLeave js — ', js);
//     [].forEach.call(js, function (script) {
//         console.log('afterLeave script — ', script);
//         script.src = script.src += (new Date()).getTime();
//         // window.eval(script.innerHTML);
//     });
// });



// barba.init({
//     timeout: 5000,
//     debug: false, // turn this to "true" to debug
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

