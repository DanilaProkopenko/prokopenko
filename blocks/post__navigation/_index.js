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


    function highlightLink() {
        const mainBlock = document.getElementsByClassName('single__content')[0];
        let sections, navLinks, indicator, navContainer;
        if (mainBlock) {
            sections = mainBlock.querySelectorAll('h2, h3, h4, h5, h6'); // Все заголовки
            navLinks = mainBlock.querySelectorAll('.post__navigation a'); // Все ссылки навигации
            indicator = mainBlock.querySelector('.post__navigation .indicator'); // Индикатор
            navContainer = mainBlock.querySelector('.post__navigation'); // Контейнер навигации
        } else {
            sections = document.querySelectorAll('h2, h3, h4, h5, h6'); // Все заголовки
            navLinks = document.querySelectorAll('.post__navigation a'); // Все ссылки навигации
            indicator = document.querySelector('.post__navigation .indicator'); // Индикатор
            navContainer = document.querySelector('.post__navigation'); // Контейнер навигации
        }
    
        let lastActiveIndex = -1; // Храним индекс последнего активного заголовка
        let manualScroll = false; // Флаг для отключения автообновления при клике
    
        function updateNavigation() {
            if (manualScroll) return;
    
            let activeIndex = -1;
    
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 500 && rect.bottom > 0) {
                    activeIndex = index;
                }
            });
    
            if (activeIndex === -1 && lastActiveIndex !== -1) {
                activeIndex = lastActiveIndex;
            } else if (activeIndex !== -1) {
                lastActiveIndex = activeIndex;
            }
    
            navLinks.forEach((link, index) => {
                if (index === activeIndex) {
                    link.classList.add('active');
                    const linkRect = link.getBoundingClientRect();
                    const navRect = navContainer.getBoundingClientRect();
                    const indicatorPosition = (linkRect.top - navRect.top) + linkRect.height / 2 - indicator.offsetHeight / 2;
                    indicator.style.top = `${indicatorPosition}px`;
                    indicator.style.height = `${linkRect.height}px`;
                } else {
                    link.classList.remove('active');
                }
            });
        }
    
        // Добавляем обработчик на каждую ссылку навигации
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Останавливаем стандартное поведение якоря
                manualScroll = true; // Устанавливаем флаг ручного управления
    
                const targetSection = sections[index];
    
                // Ищем ближайший .more-content
                const parentContentBlock = targetSection.closest('.more-content');
    
                // Если блок закрыт — открываем его
                if (parentContentBlock && !parentContentBlock.classList.contains('active')) {
                    const button = parentContentBlock.previousElementSibling;
    
                    // Открываем блок
                    parentContentBlock.style.height = parentContentBlock.scrollHeight + 'px';
                    parentContentBlock.classList.add('active');
                    if (button && button.classList.contains('more-button')) {
                        button.textContent = 'Свернуть ▲';
                    }
    
                    // Ждём окончания анимации перед скроллом
                    parentContentBlock.addEventListener('transitionend', function onTransitionEnd() {
                        parentContentBlock.removeEventListener('transitionend', onTransitionEnd);
                        scrollToSection(targetSection, link, index);
                    }, { once: true });
                } else {
                    // Блок уже открыт или не more-content
                    scrollToSection(targetSection, link, index);
                }
            });
        });
    
        // Плавный скролл к секции
        function scrollToSection(section, link, index) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
    
            // Обновляем активную ссылку и индикатор
            navLinks.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
    
            const linkRect = link.getBoundingClientRect();
            const navRect = navContainer.getBoundingClientRect();
            const indicatorPosition = (linkRect.top - navRect.top) + linkRect.height / 2 - indicator.offsetHeight / 2;
            indicator.style.top = `${indicatorPosition}px`;
            indicator.style.height = `${linkRect.height}px`;
    
            setTimeout(() => {
                manualScroll = false;
            }, 1000);
        }
    
        // Слушаем событие прокрутки страницы и сразу обновляем навигацию
        document.getElementById('main')?.addEventListener('scroll', updateNavigation);
    
        // Вызываем сразу при загрузке страницы
        updateNavigation();
    }

    function pageHeading() {
        const navContainer = document.getElementsByClassName('post__navigation')[0];
        // const pageBody = document.getElementsByClassName('single')[0];
        const mainBlock = document.getElementsByClassName('single__content')[0];
        let pageBody;
        if (mainBlock) {
            pageBody = mainBlock;
        } else {
            pageBody = document.getElementById('main');
        }
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