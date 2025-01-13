import barba from '@barba/core';

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

    console.log('barba')

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
        if (bodyClasses.includes("elementor-page")) {
            let currentPageId = current.container
                .querySelector(".elementor")
                .getAttribute("data-elementor-id");
            let nextPageId = next.container
                .querySelector(".elementor")
                .getAttribute("data-elementor-id");
            let oldScriptURL =
                "/wp-content/uploads/elementor/css/post-" + currentPageId + ".css";
            let newScriptURL =
                "/wp-content/uploads/elementor/css/post-" + nextPageId + ".css"; // Add this for cache fix: ?cachebuster=' + new Date().getTime()
            const oldElementorScript = document.querySelector(
                'link[src="' + oldScriptURL + '"]'
            );
            if (oldElementorScript) {
                oldElementorScript.remove();
            }
            // loadjscssfile(newScriptURL, "css");
        }
    }

    // GRAVITY FORMS
    const baseURL = window.location.hostname;
    const protocol = window.location.protocol;

    // Here we are manually reloading the gravity form scripts and styles. If you find that you get errors in future with missing assets, simply add them below.
    const gravityFormJS =
        "/wp-content/plugins/gravityforms/js/gravityforms.min.js";
    const gravityFormsJquery =
        "/wp-content/plugins/gravityforms/js/jquery.json.min.js";
    const gformReset = "/wp-content/plugins/gravityforms/css/formreset.min.css";
    const gformMainCSS = "/wp-content/plugins/gravityforms/css/formsmain.min.css";
    const gformReadyclass =
        "/wp-content/plugins/gravityforms/css/readyclass.min.css";
    const gformBrowser = "/wp-content/plugins/gravityforms/css/browsers.min.css";
    const gformVariables =
        'var gf_global = {"gf_currency_config":{"name":"Australian Dollar","symbol_left":"$","symbol_right":"","symbol_padding":" ","thousand_separator":",","decimal_separator":".","decimals":2},"base_url":"' +
        protocol +
        "//" +
        baseURL +
        '/wp-content/plugins/gravityforms","number_formats":[],"spinnerUrl":"' +
        protocol +
        "//" +
        baseURL +
        '/wp-content/plugins/gravityforms/images/spinner.gif"};';
    const gformWrapper = next.container.querySelectorAll(".gform_wrapper");
    //  const gformSomethingElse = '/wp-content/plugins/gravityforms/css/somethingElse.min.css';

    if (gformWrapper) {
        // run if the page contains a form
        const gformVariablesScript = document.createElement("script");
        gformVariablesScript.innerHTML = gformVariables;
        document.body.appendChild(gformVariablesScript);

        // loadjscssfile(gravityFormJS, "js");
        // loadjscssfile(gravityFormsJquery, "js");
        // loadjscssfile(gformReset, "css");
        // loadjscssfile(gformMainCSS, "css");
        // loadjscssfile(gformReadyclass, "css");
        // loadjscssfile(gformBrowser, "css");
        // loadjscssfile(gformSomethingElse, 'css')

        if (window["gformInitDatepicker"]) {
            gformInitDatepicker();
        }

        gformWrapper.forEach((element) => {
            const parent = element.parentElement;
            const scripts = parent.querySelectorAll("script");
            scripts.forEach((script) => {
                const scriptCode = script.innerHTML;
                const newScript = document.createElement("script");
                script.remove();
                newScript.innerHTML = scriptCode;
                parent.appendChild(newScript);
            });
        });

        // ALLOW ELEMENTOR VIDEOS TO AUTOPLAY AFTER TRANSITION
        let elementorVideos = document.querySelectorAll(".elementor-video");
        if (typeof elementorVideos != "undefined" && elementorVideos != null) {
            elementorVideos.forEach((video) => {
                video.play();
            });
        }

        if (current.container) {
            // only run during a page transition - not initial load
            // add any custom JS here that you would like to load on each page
            elementorFrontend.init();
        }
    }
});

const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

function leaveAnimation(e) {
    return new Promise(async (resolve) => {
        await tl
            .to(e, {
                duration: 1.5,
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
                duration: 1.5,
                y: 100,
                opacity: 0,
            })
            // add any animation you like here
            .then();
        resolve();
    });
}

barba.init({
    timeout: 5000,
    debug: false, // turn this to "true" to debug
    transitions: [
        {
            sync: false,
            leave: ({ current }) => leaveAnimation(current.container),
            enter: ({ next }) => enterAnimation(next.container),
        },
    ],

});