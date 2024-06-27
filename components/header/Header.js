
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
        let headerDescription = document.getElementsByClassName('header__description')[0];
        let footer = document.getElementsByClassName('footer')[0];

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
            this.getElementsByClassName('bar')[0].classList.toggle('animate')

            // $('.bar').toggleClass('animate');

            this.classList.toggle('_open');
            burgerMenuWidth(header, burgerMenu);

            burgerMenu.classList.toggle('_open');
            mainPage.classList.toggle('_open');
            headerDescription.classList.toggle('_hide');
            footer.classList.toggle('_hide');
        })
        
        document.addEventListener(`keyup`, (e) => {
            if (e.keyCode === 27) { // если нажали на ESC
                // код при нажатии на ESC
                burgerIcon.getElementsByClassName('bar')[0].classList.remove('animate')
                headerDescription.classList.remove('_hide');
                burgerMenu.classList.remove('_open');
                mainPage.classList.remove('_open');
                burgerIcon.classList.remove('_open');
                footer.classList.remove('_hide');
            }
        });
    }

}

export { Header };
