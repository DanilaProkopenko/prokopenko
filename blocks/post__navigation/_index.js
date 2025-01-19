const initBlockTemplate = () => {
    function pageNavLinks() {
        const navContainer = document.getElementsByClassName('post__navigation')[0];
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


    // function highlightLink() {
    //     // Выбираем все разделы и ссылки
    //     const sections = document.querySelectorAll('h2, h3, h4, h5, h6');

    //     const navLinks = document.querySelectorAll('.post__navigation a');
    //     // Функция, которая проверяет, какой раздел виден в окне просмотра
    //     function updateNavigation() {
    //         sections.forEach((section, index) => {
    //             const rect = section.getBoundingClientRect();
    //             if (rect.top <= 500 && rect.bottom >= 10) {
    //                 navLinks[index].classList.add('active');
    //             } else {
    //                 navLinks[index].classList.remove('active');
    //             }
    //         });
    //     }

    //     // Слушаем событие прокрутки страницы и обновляем навигацию
    //     window.addEventListener('scroll', updateNavigation);
    //     // Инициализируем навигацию при загрузке страницы
    //     updateNavigation();
    // }

    // function highlightLink() {
    //     const sections = document.querySelectorAll('h2, h3, h4, h5, h6'); // Все заголовки
    //     const navLinks = document.querySelectorAll('.post__navigation a'); // Все ссылки навигации

    //     let lastActiveIndex = 0; // Храним индекс последнего активного заголовка
    //     let manualScroll = false; // Флаг для отключения автообновления при клике

    //     function updateNavigation() {
    //         if (manualScroll) return; // Если управление вручную, пропускаем обновление

    //         let activeIndex = -1;

    //         // Определяем текущий активный заголовок
    //         sections.forEach((section, index) => {
    //             const rect = section.getBoundingClientRect();

    //             // Если текущий заголовок в зоне видимости
    //             if (rect.top <= 500 && rect.bottom > 0) {
    //                 activeIndex = index;
    //             }
    //         });

    //         // Если ни один заголовок не виден, сохраняем последний активный
    //         if (activeIndex === -1) {
    //             activeIndex = lastActiveIndex;
    //         } else {
    //             lastActiveIndex = activeIndex; // Обновляем последний активный заголовок
    //         }

    //         // Обновляем классы для ссылок
    //         navLinks.forEach((link, index) => {
    //             if (index === activeIndex) {
    //                 link.classList.add('active'); // Выделяем активный заголовок
    //             } else {
    //                 link.classList.remove('active'); // Убираем выделение с остальных
    //             }
    //         });
    //     }

    //     // Обработчик клика на ссылки
    //     navLinks.forEach((link, index) => {
    //         link.addEventListener('click', (e) => {
    //             e.preventDefault(); // Останавливаем стандартное поведение якоря
    //             manualScroll = true; // Устанавливаем флаг ручного управления

    //             // Прокручиваем к нужному заголовку
    //             sections[index].scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'start',
    //             });

    //             // Обновляем активное состояние ссылки
    //             navLinks.forEach((l) => l.classList.remove('active'));
    //             link.classList.add('active');

    //             // Сбрасываем флаг через небольшой таймаут после завершения скролла
    //             setTimeout(() => {
    //                 manualScroll = false;
    //             }, 1000);
    //         });
    //     });

    //     // Слушаем событие прокрутки страницы и сразу обновляем навигацию
    //     window.addEventListener('scroll', updateNavigation);

    //     // Вызываем сразу при загрузке страницы, чтобы правильно выделить заголовок
    //     window.addEventListener('load', updateNavigation);
    //     updateNavigation(); // Также вызываем сразу после загрузки, если страница уже прокручена
    // }

    // Версия работает. До анимации
    // function highlightLink() {
    //     const sections = document.querySelectorAll('h2, h3, h4, h5, h6'); // Все заголовки
    //     const navLinks = document.querySelectorAll('.post__navigation a'); // Все ссылки навигации
    
    //     let lastActiveIndex = -1; // Храним индекс последнего активного заголовка
    //     let manualScroll = false; // Флаг для отключения автообновления при клике
    
    //     function updateNavigation() {
    //         if (manualScroll) return; // Если управление вручную, пропускаем обновление
    
    //         let activeIndex = -1;
    
    //         // Определяем текущий активный заголовок
    //         sections.forEach((section, index) => {
    //             const rect = section.getBoundingClientRect();
                
    //             // Проверяем, находится ли заголовок в зоне видимости
    //             if (rect.top <= 500 && rect.bottom > 0) {
    //                 activeIndex = index;
    //             }
    //         });
    
    //         // Если ни один заголовок не виден, выделяем последний активный заголовок
    //         if (activeIndex === -1 && lastActiveIndex !== -1) {
    //             activeIndex = lastActiveIndex;
    //         } else if (activeIndex !== -1) {
    //             lastActiveIndex = activeIndex; // Обновляем последний активный заголовок
    //         }
    
    //         // Обновляем классы для ссылок
    //         navLinks.forEach((link, index) => {
    //             if (index === activeIndex) {
    //                 link.classList.add('active'); // Выделяем активный заголовок
    //             } else {
    //                 link.classList.remove('active'); // Убираем выделение с остальных
    //             }
    //         });
    //     }
    
    //     // Обработчик клика на ссылки
    //     navLinks.forEach((link, index) => {
    //         link.addEventListener('click', (e) => {
    //             e.preventDefault(); // Останавливаем стандартное поведение якоря
    //             manualScroll = true; // Устанавливаем флаг ручного управления
    
    //             // Прокручиваем к нужному заголовку
    //             sections[index].scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'start',
    //             });
    
    //             // Обновляем активное состояние ссылки
    //             navLinks.forEach((l) => l.classList.remove('active'));
    //             link.classList.add('active');
    
    //             // Сбрасываем флаг через небольшой таймаут после завершения скролла
    //             setTimeout(() => {
    //                 manualScroll = false;
    //             }, 1000);
    //         });
    //     });
    
    //     // Слушаем событие прокрутки страницы и сразу обновляем навигацию
    //     window.addEventListener('scroll', updateNavigation);
    
    //     // Вызываем сразу при загрузке страницы, чтобы правильно выделить заголовок
    //     window.addEventListener('load', () => {
    //         // Проверяем положение скролла при загрузке страницы
    //         const scrollPosition = window.scrollY || window.pageYOffset;
    
    //         // Если мы находимся вверху страницы и ни один заголовок не виден, выделяем первый заголовок
    //         if (scrollPosition === 0) {
    //             lastActiveIndex = 0; // Выделяем первый заголовок, если мы находимся в начале страницы
    //         }
    
    //         // Определяем, какой заголовок должен быть активным в зависимости от скролла
    //         sections.forEach((section, index) => {
    //             const rect = section.getBoundingClientRect();
    //             if (rect.top <= 500 && rect.bottom > 0) {
    //                 lastActiveIndex = index;
    //             }
    //         });
    
    //         // Обновляем навигацию после загрузки страницы
    //         updateNavigation();
    //     });
    
    //     updateNavigation(); // Также вызываем сразу после загрузки, если страница уже прокручена
    // }
    
    function highlightLink() {
        const sections = document.querySelectorAll('h2, h3, h4, h5, h6'); // Все заголовки
        const navLinks = document.querySelectorAll('.post__navigation a'); // Все ссылки навигации
        const indicator = document.querySelector('.post__navigation .indicator'); // Индикатор
        const navContainer = document.querySelector('.post__navigation'); // Контейнер навигации
    
        let lastActiveIndex = -1; // Храним индекс последнего активного заголовка
        let manualScroll = false; // Флаг для отключения автообновления при клике
    
        function updateNavigation() {
            if (manualScroll) return; // Если управление вручную, пропускаем обновление
    
            let activeIndex = -1;
    
            // Определяем текущий активный заголовок
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                
                // Проверяем, находится ли заголовок в зоне видимости
                if (rect.top <= 500 && rect.bottom > 0) {
                    activeIndex = index;
                }
            });
    
            // Если ни один заголовок не виден, выделяем последний активный заголовок
            if (activeIndex === -1 && lastActiveIndex !== -1) {
                activeIndex = lastActiveIndex;
            } else if (activeIndex !== -1) {
                lastActiveIndex = activeIndex; // Обновляем последний активный заголовок
            }
    
            // Обновляем классы для ссылок и перемещаем индикатор
            navLinks.forEach((link, index) => {
                if (index === activeIndex) {
                    link.classList.add('active'); // Выделяем активный заголовок
                    // Перемещаем индикатор
                    const linkRect = link.getBoundingClientRect();
                    const navRect = navContainer.getBoundingClientRect(); // Получаем размеры контейнера
    
                    // Вычисляем позицию индикатора на середину активной ссылки
                    const indicatorPosition = (linkRect.top - navRect.top) + linkRect.height / 2 - indicator.offsetHeight / 2;
                    indicator.style.top = `${indicatorPosition}px`; // Устанавливаем top индикатора в контейнере
    
                    // Устанавливаем высоту индикатора, чтобы она соответствовала высоте активного заголовка
                    indicator.style.height = `${linkRect.height}px`;
                } else {
                    link.classList.remove('active'); // Убираем выделение с остальных
                }
            });
        }
    
        // Обработчик клика на ссылки
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Останавливаем стандартное поведение якоря
                manualScroll = true; // Устанавливаем флаг ручного управления
    
                // Прокручиваем к нужному заголовку
                sections[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
    
                // Обновляем активное состояние ссылки
                navLinks.forEach((l) => l.classList.remove('active'));
                link.classList.add('active');
    
                // Перемещаем индикатор
                const linkRect = link.getBoundingClientRect();
                const navRect = navContainer.getBoundingClientRect();
                const indicatorPosition = (linkRect.top - navRect.top) + linkRect.height / 2 - indicator.offsetHeight / 2;
                indicator.style.top = `${indicatorPosition}px`;
    
                // Устанавливаем высоту индикатора, чтобы она соответствовала высоте активного заголовка
                indicator.style.height = `${linkRect.height}px`;
    
                // Сбрасываем флаг через небольшой таймаут после завершения скролла
                setTimeout(() => {
                    manualScroll = false;
                }, 1000);
            });
        });
    
        // Слушаем событие прокрутки страницы и сразу обновляем навигацию
        window.addEventListener('scroll', updateNavigation);
    
        // Вызываем сразу при загрузке страницы
        updateNavigation();
    }
    

    function pageHeading() {
        const navContainer = document.getElementsByClassName('post__navigation')[0];
        const pageBody = document.getElementsByClassName('single')[0];
        const pageHeadings = Array.from(pageBody.querySelectorAll('h2, h3, h4, h5, h6'));

        // замена заголовка в окне на зголовок страницы
        function getPageHeadingH1() {
            const pageHeadingH1 = document.getElementsByClassName('dan__page-navigation__heading')[0];
            pageHeadingH1.innerHTML = Array.from(pageBody.querySelectorAll('h1'))[0].textContent;
        }

        //Добавляет id к заголовкам
        function writeHeadingId() {
            // const pageHeadings = Array.from(pageBody.querySelectorAll('h1, h2, h3, h4, h5, h6'));
            pageHeadings.forEach((el, index) => {
                el.setAttribute('id', 'element-' + [index]);
                el.setAttribute('tag-name', el.tagName);
            });
            // console.log('pageHeadings —', pageHeadings);
        }

        function links(container, name, link, elemClass) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = '#' + link;
            a.title = name;
            a.appendChild(document.createTextNode(name));
            a.classList.add('dan__page-navigation__item__' + elemClass, 'dan__page-navigation__item__heading');
            // console.log('name — ', a.title, 'link — ', a.href)
            li.appendChild(a);
            container.appendChild(li);
        }

        function createPageNavLinks() {
            pageHeadings.forEach((element, index) => {
                const elementId = element.getAttribute('id');
                const elementClass = element.getAttribute('tag-name').toLowerCase();
                const elementNameId = element.textContent;

                // console.log('elementNameId — ', elementNameId)
                links(navContainer, elementNameId, elementId, elementClass);
            })
        }
        // getPageHeadingH1();
        writeHeadingId();
        createPageNavLinks();
    }

    if (document.getElementsByClassName('post__navigation')[0]) {
        pageHeading();
        highlightLink();
    }
    // pageNavLinks();
};

initBlockTemplate();