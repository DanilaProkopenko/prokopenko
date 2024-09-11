
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

    pageNavLinks() {
        const navContainer = document.getElementsByClassName('header__page-nav')[0];
        const sections = document.querySelectorAll('section');

        function createPageNavLinks() {
            sections.forEach((section, index) => {
                const sectionId = section.getAttribute('id');
                const sectionNameId = section.getAttribute('data-id-name');

                console.log('sectionId — ', sectionId, 'sectionNameId—  ', sectionNameId)
                if (sectionNameId != 0) {
                    links(navContainer, sectionNameId, sectionId);
                }
            })
        }

        function links(container, name, link) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = '#' + link;
            a.title = name;
            a.appendChild(document.createTextNode(name));
            console.log('name — ', a.title, 'link — ', a.href)
            li.appendChild(a);
            container.appendChild(li);
        }
        createPageNavLinks();
    }


    highlightLink() {
        // Выбираем все разделы и ссылки
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('header nav a');
        // Функция, которая проверяет, какой раздел виден в окне просмотра
        function updateNavigation() {
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    navLinks[index].classList.add('active');
                } else {
                    navLinks[index].classList.remove('active');
                }
            });
        }

        // Слушаем событие прокрутки страницы и обновляем навигацию
        window.addEventListener('scroll', updateNavigation);
        // Инициализируем навигацию при загрузке страницы
        updateNavigation();
    }

    burger() {
        let burgerIcon = document.getElementById('burger-icon');
        let burgerMenu = document.getElementById('burger-menu');
        let mainPage = document.getElementById('main');

        let header = document.getElementsByClassName('header__wrapper')[0];
        let footer = document.getElementsByClassName('footer')[0];

        // if (window.innerWidth > 767) {
        //     burgerMenuWidth(header, burgerMenu);
        // }

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

        function burgerClose() {
            burgerIcon.getElementsByClassName('bar')[0].classList.remove('animate')
            // headerDescription.classList.remove('_hide');
            burgerMenu.classList.remove('_open');
            mainPage.classList.remove('_open');
            burgerIcon.classList.remove('_open');
            footer.classList.remove('_hide');
        }

        window.addEventListener("resize", (event) => {
            // burgerMenuWidth(header, burgerMenu);
        })

        burgerIcon.addEventListener('click', function () {
            this.getElementsByClassName('bar')[0].classList.toggle('animate')

            // $('.bar').toggleClass('animate');

            this.classList.toggle('_open');
            // burgerMenuWidth(header, burgerMenu);

            burgerMenu.classList.toggle('_open');
            mainPage.classList.toggle('_open');
            // headerDescription.classList.toggle('_hide');
            footer.classList.toggle('_hide');


        })

        document.addEventListener(`keyup`, (e) => {
            if (e.keyCode === 27) { // если нажали на ESC
                // код при нажатии на ESC
                burgerClose();
            }
        });

        document.addEventListener('click', (e) => {
            const withinBoundaries = e.composedPath().includes(header);

            if (!withinBoundaries) {
                burgerClose();
            }
        })

        burgerMenu.addEventListener('click', function () {
            burgerClose();
        })
    }

    headerOut() {
        const header = jQuery('.header__wrapper');
        let scrollPrev = 0;

        jQuery(window).scroll(function () {
            var scrolled = jQuery(window).scrollTop();

            if (scrolled > 100 && scrolled > scrollPrev) {
                header.addClass('out');
            } else {
                header.removeClass('out');
            }
            scrollPrev = scrolled;
        });
    }
}

export { Header };
