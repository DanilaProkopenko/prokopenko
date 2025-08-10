
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








    // Начальная версия
    burger_1() {
        let burgerIcon = document.getElementById('burger-icon');
        let burgerMenu = document.getElementById('burger-menu');
        let mainPage = document.getElementById('main');
        let body = document.getElementsByTagName('body')[0];

        let header = document.getElementsByClassName('header__wrapper')[0];
        let footer = document.getElementsByClassName('footer')[0];

        function burgerClose() {
            burgerIcon.getElementsByClassName('bar')[0].classList.remove('animate');
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

            // jQuery('.bar').toggleClass('animate');

            this.classList.toggle('_open');
            // burgerMenuWidth(header, burgerMenu);

            burgerMenu.classList.toggle('_open');

            if (burgerMenu.classList.contains('_open')) {
                burgerCount++;
            }
            mainPage.classList.toggle('_open');
            body.classList.toggle('_open');
            footer.classList.toggle('_hide');

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
                    break;
                case 2:
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_green');
                    break;
                case 3:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_blue');
                    break;
                case 4:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_yellow');
                    break;
                case 5:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_purple');
                    break;
                case 6:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.add('_color_5');
                    break;
                case 7:
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_blue');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.add('_color_6');
                    break;
                default:
                    burgerMenu.classList.remove('_color_6');
                    burgerMenu.classList.remove('_color_5');
                    burgerMenu.classList.remove('_red');
                    burgerMenu.classList.remove('_green');
                    burgerMenu.classList.remove('_yellow');
                    burgerMenu.classList.remove('_purple');
                    burgerMenu.classList.add('_blue');
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
            if (e.keyCode === 27 && burgerMenu.classList.contains('_open')) {
                burgerClose();
            }
        });
        document.addEventListener('click', (e) => {
            // Проверяем, открыто ли бургер-меню
            if (!burgerMenu.classList.contains('_open')) {
                return; // Если не открыто — ничего не делаем
            }
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
    // С переключением иконки поиска
    burger_2() {
        // === Обработчик клика по бургеру и поиску ===
        jQuery('#burger-icon, .search-trigger-icon').on('click', function (e) {
            e.stopPropagation();

            const isSearchOpen = jQuery('.search-modal').hasClass('_open');
            const isBurgerOpen = jQuery('#burger-menu').hasClass('_open');

            // Нажали на бургер
            if (jQuery(this).is('#burger-icon')) {
                if (isSearchOpen) {
                    // Поиск открыт → закрываем и открываем бургер
                    jQuery('.search-modal').removeClass('_open');
                    jQuery('#main').removeClass('_open');
                    jQuery('.search-trigger-icon').removeClass('_open');
                    jQuery('.search-trigger-icon .search-icon__circle').removeClass('animate');

                    jQuery('#burger-menu').addClass('_open');
                    jQuery('#main').addClass('_open');
                    jQuery('.footer').addClass('_hide');
                    jQuery('#burger-icon').addClass('_open');
                    jQuery('#burger-icon .bar').addClass('animate');
                } else {
                    jQuery('#burger-menu').toggleClass('_open');
                    jQuery('#main').toggleClass('_open');
                    jQuery('.footer').toggleClass('_hide');
                    jQuery('#burger-icon').toggleClass('_open');
                    jQuery('#burger-icon .bar').toggleClass('animate');
                }
            }

            // Нажали на иконку поиска
            if (jQuery(this).is('.search-trigger-icon')) {
                if (isBurgerOpen) {
                    // Бургер открыт → закрываем его и открываем поиск
                    jQuery('#burger-menu').removeClass('_open');
                    jQuery('#main').removeClass('_open');
                    jQuery('.footer').removeClass('_hide');
                    jQuery('#burger-icon .bar').removeClass('animate');

                    jQuery('.search-modal').addClass('_open');
                    jQuery('#main').addClass('_open');
                    jQuery('#search-input').focus();
                    jQuery('.search-trigger-icon').addClass('_open');
                } else {
                    // Бургер закрыт → просто открываем поиск
                    jQuery('.search-modal').toggleClass('_open');
                    jQuery('#main').toggleClass('_open');
                    jQuery('.search-trigger-icon').toggleClass('_open');
                }
            }
        });

        jQuery(document).on('keydown', function (e) {
            if (e.key === 'Escape') {
                jQuery('.search-modal').removeClass('_open');
                jQuery('#main').removeClass('_open');
                jQuery('.search-trigger-icon').removeClass('_open');
                jQuery('.search-trigger-icon .search-icon__circle').removeClass('animate');

                jQuery('#burger-menu').removeClass('_open');
                jQuery('#main').removeClass('_open');
                jQuery('.footer').removeClass('_hide');
                jQuery('#burger-icon .bar').removeClass('animate');
            }
        });
    }
    // С переключением иконки поиска и цвета меню
    burger() {
        let burgerIcon = document.getElementById('burger-icon');
        let burgerMenu = document.getElementById('burger-menu');
        let mainPage = document.getElementById('main');
        let body = document.getElementsByTagName('body')[0];
        let header = document.getElementsByClassName('header__wrapper')[0];
        let footer = document.getElementsByClassName('footer')[0];
        let burgerCount = 0;

        function burgerClose() {
            if (burgerMenu) burgerMenu.classList.remove('_open');
            if (mainPage) mainPage.classList.remove('_open');
            if (body) body.classList.remove('_open');
            if (footer) footer.classList.remove('_hide');
            if (burgerIcon) {
                burgerIcon.classList.remove('_open');
                burgerIcon.querySelector('.bar').classList.remove('animate');
            }
        }

        // === Обработчик клика по бургеру и поиску ===
        jQuery('#burger-icon, .search-trigger-icon').on('click', function (e) {
            e.stopPropagation();

            const isSearchOpen = jQuery('.search-modal').hasClass('_open');
            const isBurgerOpen = jQuery('#burger-menu').hasClass('_open');

            // Нажали на бургер
            if (jQuery(this).is('#burger-icon')) {
                if (isSearchOpen) {
                    // Поиск открыт → закрываем его и открываем бургер
                    jQuery('.search-modal').removeClass('_open');
                    jQuery('#main').removeClass('_open');
                    jQuery('.search-trigger-icon').removeClass('_open');
                    jQuery('.search-trigger-icon .search-icon__circle').removeClass('animate');
                }

                // Переключаем состояние бургера
                jQuery('#burger-menu').toggleClass('_open');
                jQuery('#main').toggleClass('_open');
                jQuery('.footer').toggleClass('_hide');
                jQuery('#burger-icon').toggleClass('_open');
                jQuery('#burger-icon .bar').toggleClass('animate');

                if (jQuery('#burger-menu').hasClass('_open')) {
                    burgerCount++;
                }

                // === Смена цвета меню ===
                if (burgerCount === 8) {
                    burgerCount = 1;
                }

                switch (burgerCount) {
                    case 1:
                        burgerMenu.classList.remove('_blue', '_green', '_yellow', '_purple', '_color_5', '_color_6');
                        burgerMenu.classList.add('_red');
                        break;
                    case 2:
                        burgerMenu.classList.remove('_red', '_green', '_yellow', '_purple', '_color_5', '_color_6');
                        burgerMenu.classList.add('_green');
                        break;
                    case 3:
                        burgerMenu.classList.remove('_red', '_green', '_yellow', '_blue', '_color_5', '_color_6');
                        burgerMenu.classList.add('_blue');
                        break;
                    case 4:
                        burgerMenu.classList.remove('_red', '_green', '_blue', '_yellow', '_color_5', '_color_6');
                        burgerMenu.classList.add('_yellow');
                        break;
                    case 5:
                        burgerMenu.classList.remove('_red', '_green', '_blue', '_yellow', '_color_5', '_color_6');
                        burgerMenu.classList.add('_purple');
                        break;
                    case 6:
                        burgerMenu.classList.remove('_red', '_green', '_blue', '_yellow', '_purple', '_color_6');
                        burgerMenu.classList.add('_color_5');
                        break;
                    case 7:
                        burgerMenu.classList.remove('_red', '_green', '_blue', '_yellow', '_purple', '_color_5');
                        burgerMenu.classList.add('_color_6');
                        break;
                    default:
                        burgerMenu.classList.remove('_red', '_green', '_blue', '_yellow', '_purple', '_color_5', '_color_6');
                        burgerMenu.classList.add('_red');
                        break;
                }
            }

            // Нажали на иконку поиска
            if (jQuery(this).is('.search-trigger-icon')) {
                if (isBurgerOpen) {
                    // Бургер открыт → закрываем его и открываем поиск
                    jQuery('#burger-menu').removeClass('_open');
                    jQuery('#main').removeClass('_open');
                    jQuery('.footer').removeClass('_hide');
                    jQuery('#burger-icon').removeClass('_open');
                    jQuery('#burger-icon .bar').removeClass('animate');
                }

                // Открываем/закрываем поиск
                jQuery('.search-modal').toggleClass('_open');
                jQuery('#main').toggleClass('_open');
                jQuery('.search-trigger-icon').toggleClass('_open');
                jQuery('.search-trigger-icon .search-icon__circle').toggleClass('animate');
            }
        });

        // === Закрытие поиска при клике вне области ===
        jQuery(document).on('click', function (e) {
            const jQuerytarget = jQuery(e.target);
            if (jQuery('.search-modal._open').length && !jQuerytarget.closest('.search-modal, .search-trigger-icon').length) {
                jQuery('.search-modal').removeClass('_open');
                jQuery('#main').removeClass('_open');
                jQuery('.search-trigger-icon').removeClass('_open');
                jQuery('.search-trigger-icon .search-icon__circle').removeClass('animate');
            }

            if (jQuery('#burger-menu._open').length && !jQuerytarget.closest('#burger-menu, #burger-icon').length) {
                jQuery('#burger-menu').removeClass('_open');
                jQuery('#main').removeClass('_open');
                jQuery('.footer').removeClass('_hide');
                jQuery('#burger-icon').removeClass('_open');
                jQuery('#burger-icon .bar').removeClass('animate');
            }
        });

        // === Закрытие поиска/бургера по Escape ===
        jQuery(document).on('keydown', function (e) {
            if (e.key === 'Escape') {
                jQuery('.search-modal').removeClass('_open');
                jQuery('#main').removeClass('_open');
                jQuery('.search-trigger-icon').removeClass('_open');
                jQuery('.search-trigger-icon .search-icon__circle').removeClass('animate');

                jQuery('#burger-menu').removeClass('_open');
                jQuery('#main').removeClass('_open');
                jQuery('.footer').removeClass('_hide');
                jQuery('#burger-icon').removeClass('_open');
                jQuery('#burger-icon .bar').removeClass('animate');
            }
        });
    }
    headerOut() {
        const header = jQuery('.header__top__right .header__navigation._main');
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
