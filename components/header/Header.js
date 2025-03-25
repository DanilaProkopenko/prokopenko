
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
        // const sections = document.querySelectorAll('section');
        const sections = document.querySelectorAll('h2, h3, h4, h5, h6');
        // const pageHeadings = Array.from(pageBody.querySelectorAll('h2, h3, h4, h5, h6'));

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


    pageHeading() {
        const navContainer = document.getElementsByClassName('header__page-nav')[0];
        const pageBody = document.getElementsByClassName('single')[0];

        const pageHeadings = Array.from(pageBody.querySelectorAll('h2, h3, h4, h5, h6'));

        // замена заголовка в окне на зголовок страницы
        // function getPageHeadingH1() {
        //     const pageHeadingH1 = document.getElementsByClassName('dan__page-navigation__heading')[0];
        //     pageHeadingH1.innerHTML = Array.from(pageBody.querySelectorAll('h1'))[0].textContent;
        // }

        //Добавляет id к заголовкам
        function writeHeadingId() {
            // const pageHeadings = Array.from(pageBody.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            pageHeadings.forEach((el, index) => {
                el.setAttribute('id', 'element-' + [index]);
                el.setAttribute('tag-name', el.tagName);
            });
            console.log('pageHeadings —', pageHeadings);
            console.log('pageBody — ', pageBody);
        }

        function links(container, name, link, elemClass) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = '#' + link;
            a.title = name;
            a.appendChild(document.createTextNode(name));
            a.setAttribute('uk-scroll', '');
            a.classList.add('dan__page-navigation__item__' + elemClass, 'uk-' + elemClass, 'dan__page-navigation__item__heading');
            console.log('name — ', a.title, 'link — ', a.href)
            li.appendChild(a);
            container.appendChild(li);
        }

        function createPageNavLinks() {
            pageHeadings.forEach((element, index) => {
                const elementId = element.getAttribute('id');
                const elementClass = element.getAttribute('tag-name').toLowerCase();
                const elementNameId = element.textContent;

                console.log('elementId — ', elementId, 'elementNameId—  ', elementNameId)
                // console.log('elementId — ', elementId)
                // if (elementNameId != 0) {
                //         // links(navContainer, elementNameId, elementId);
                // }
                links(navContainer, elementNameId, elementId, elementClass);
            })
        }
        // getPageHeadingH1();
        writeHeadingId();
        createPageNavLinks();
    }








    burger() {
        let burgerIcon = document.getElementById('burger-icon');
        let burgerMenu = document.getElementById('burger-menu');
        let mainPage = document.getElementById('main');
        let body = document.getElementsByTagName('body')[0];

        let header = document.getElementsByClassName('header__wrapper')[0];
        let footer = document.getElementsByClassName('footer')[0];

        // if (window.innerWidth > 767) {
        //     burgerMenuWidth(header, burgerMenu);
        // }

        // Изменение ширины выпадающего меню
        // function burgerMenuWidth(header, burgerMenu) {

        //     let headerWidth = header.offsetWidth;
        //     let windowWidth = window.screen.width;
        //     let burgerMenuWidth = windowWidth - headerWidth

        //     // Проверка ширины экрана
        //     if (window.innerWidth > 767) {
        //         burgerMenu.style.left = headerWidth + 'px';
        //         burgerMenu.style.width = burgerMenuWidth + 'px';
        //     } else {
        //         burgerMenu.style.left = 0 + 'px';
        //         burgerMenu.style.width = 100 + '%'
        //     }
        // }

        function burgerClose() {
            burgerIcon.getElementsByClassName('bar')[0].classList.remove('animate')
            // headerDescription.classList.remove('_hide');
            burgerMenu.classList.remove('_open');
            mainPage.classList.remove('_open');
            body.classList.remove('_open');
            burgerIcon.classList.remove('_open');
            footer.classList.remove('_hide');
        }

        window.addEventListener("resize", (event) => {
            // burgerMenuWidth(header, burgerMenu);
        })

        let burgerCount = 0;

        burgerIcon.addEventListener('click', function () {

            this.getElementsByClassName('bar')[0].classList.toggle('animate');

            // $('.bar').toggleClass('animate');

            this.classList.toggle('_open');
            // burgerMenuWidth(header, burgerMenu);

            burgerMenu.classList.toggle('_open');
            if (burgerMenu.classList.contains('_open')) {
                burgerCount++;
            }
            mainPage.classList.toggle('_open');
            body.classList.toggle('_open');
            // headerDescription.classList.toggle('_hide');
            footer.classList.toggle('_hide');

            // console.log('burgerCount — ', burgerCount)
            if (burgerCount == 8) {
                burgerCount = 1
            }
            switch (burgerCount) {
                case 1:
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_red');
                    // burgerMenu.style.backgroundColor = 'var(--color-red)';
                    break;
                case 2:
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_green');
                    // burgerMenu.style.backgroundColor = 'var(--color-green)';
                    break;
                case 3:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_blue');
                    // burgerMenu.style.backgroundColor = 'var(--color-blue)';
                    break;
                case 4:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_yellow');
                    // burgerMenu.style.backgroundColor = 'var(--color-yellow)';
                    break;
                case 5:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_purple');
                    // burgerMenu.style.backgroundColor = 'var(--color-purple)';
                    break;
                case 6:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_color_5');
                    // burgerMenu.style.backgroundColor = 'var(--color-purple)';
                    break;
                case 7:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.add('_color_6');
                    // burgerMenu.style.backgroundColor = 'var(--color-purple)';
                    break;
                default:
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.add('_blue');
                    // burgerMenu.style.backgroundColor = 'var(--color-blue)';
                    break;
            }

            // if (burgerMenu.classList.contains('_open')) {
            //     // Убедимся, что все ссылки имеют начальное состояние скрытого текста
            //     const links = burgerMenu.querySelectorAll('.header__burger__links li a');
            //     links.forEach((link, index) => {
            //         setTimeout(() => {
            //             link.classList.add('slide-in-text');
            //         }, index * 200); // Задержка между строками в миллисекундах
            //     });
            // } else {
            //     // Если меню закрывается, убираем классы анимации
            //     const links = burgerMenu.querySelectorAll('.header__burger__links li a');
            //     links.forEach(link => {
            //         link.classList.remove('slide-in-text');
            //     });
            // }
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

        // console.log('burger')
    }

    headerOut() {
        const header = jQuery('.header__top__right');
        let scrollPrev = 0;

        jQuery('#main').scroll(function () {
            var scrolled = jQuery('#main').scrollTop();

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
