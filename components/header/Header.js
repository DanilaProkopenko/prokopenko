
class Header {
    domElement;
    constructor(headerDomElement) {
        if (!headerDomElement) {
            return;
        }
        this.domElement = headerDomElement;
        this.init();
    }

    init = () => {
    };

    burger() {
        let burgerIcon = document.getElementById('burger-icon');
        let burgerMenu = document.getElementById('burger-menu');
        let mainPage = document.getElementById('main');
        let header = document.getElementsByClassName('header__wrapper')[0];

        if (window.innerWidth > 767) {
            burgerMenuWidth(header, burgerMenu);
        }

        // Изменение ширины выпадающего меню
        function burgerMenuWidth(header, burgerMenu) {
            let headerWidth = header.offsetWidth;
            let windowWidth = window.screen.width;
            let burgerMenuWidth = windowWidth - headerWidth

            // Проверка ширины экрана
            if (window.innerWidth > 767) {
                burgerMenu.style.left = headerWidth + 'px';
                burgerMenu.style.width = burgerMenuWidth + 'px';
            } else {
                burgerMenu.style.left = 0 + 'px';
                burgerMenu.style.width = 100 + '%'
            }
        }

        window.addEventListener("resize", (event) => {
            burgerMenuWidth(header, burgerMenu);
        })

        burgerIcon.addEventListener('click', function () {
            this.classList.toggle('_open');
            burgerMenuWidth(header, burgerMenu);

            burgerMenu.classList.toggle('_open');
            mainPage.classList.toggle('_open');

        })
    }

}

export { Header };
