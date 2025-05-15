const initBlockTemplate = () => {
    // Флаг, который указывает, вызван ли скролл программно (не пользователем)
    let manualScroll = false;

    /**
     * 1️⃣ Создаёт ссылки в меню навигации на основе секций с атрибутом data-id-name.
     */
    function pageNavLinks() {
        const navContainer = document.getElementsByClassName('post__navigation')[0];
        const sections = document.querySelectorAll('section');

        function createPageNavLinks() {
            sections.forEach((section, index) => {
                const sectionId = section.getAttribute('id');
                const sectionNameId = section.getAttribute('data-id-name');

                if (sectionNameId != 0) {
                    links(navContainer, sectionNameId, sectionId);
                }
            });
        }

        function links(container, name, link) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = '#' + link;
            a.title = name;
            a.appendChild(document.createTextNode(name));
            li.appendChild(a);
            container.appendChild(li);
        }

        createPageNavLinks();
    }


    /**
     * 3️⃣ Отслеживает текущую секцию при скролле и выделяет соответствующую ссылку.
     */
    function highlightLink() {
        const mainBlock = document.querySelector('.single__content') || document.getElementById('main');
        let sections, navLinks, indicator, navContainer;

        if (mainBlock) {
            sections = mainBlock.querySelectorAll('h2, h3, h4, h5, h6');
            navLinks = mainBlock.querySelectorAll('.post__navigation a');
            indicator = mainBlock.querySelector('.post__navigation .indicator');
            navContainer = mainBlock.querySelector('.post__navigation');
        } else {
            sections = document.querySelectorAll('h2, h3, h4, h5, h6');
            navLinks = document.querySelectorAll('.post__navigation a');
            indicator = document.querySelector('.post__navigation .indicator');
            navContainer = document.querySelector('.post__navigation');
        }

        let lastActiveIndex = -1;

        function updateNavigation() {
            if (manualScroll) return;

            let activeIndex = -1;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.2 && rect.bottom >= window.innerHeight * 0.1) {
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
                    const navRect = navContainer?.getBoundingClientRect() || {};
                    const indicatorPosition =
                        (linkRect.top - navRect.top) + linkRect.height / 2 - (indicator?.offsetHeight || 0) / 2;

                    if (indicator) {
                        indicator.style.top = `${indicatorPosition}px`;
                        indicator.style.height = `${linkRect.height}px`;
                    }

                    const scrollAmount = link.offsetLeft - (navContainer.clientWidth / 2) + (link.offsetWidth / 2);
                    navContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
                } else {
                    link.classList.remove('active');
                }
            });
        }

        // Обработка клика по ссылке в меню
        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                const targetSection = sections[index];
                const parentContentBlock = targetSection.closest('.more-content');

                // Если раздел внутри .more-content и он свёрнут — раскрываем его
                if (parentContentBlock && !parentContentBlock.classList.contains('active')) {
                    const button = parentContentBlock.previousElementSibling;

                    // Раскрываем блок
                    parentContentBlock.style.height = parentContentBlock.scrollHeight + 'px';
                    parentContentBlock.classList.add('active');

                    if (button && button.classList.contains('more-button')) {
                        button.textContent = 'Свернуть ▲';
                    }

                    // Ждём завершения transition перед скроллом
                    const handleTransitionEnd = () => {
                        parentContentBlock.removeEventListener('transitionend', handleTransitionEnd);
                        setTimeout(() => {
                            manualScroll = false;
                            targetSection.scrollIntoView({ behavior: 'smooth' });
                        }, 50);
                    };

                    parentContentBlock.addEventListener('transitionend', handleTransitionEnd, { once: true });

                } else {
                    // Если блок уже открыт — просто скроллим
                    manualScroll = false;
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }, 50);
                }

                // Всё равно обновляем активную ссылку и индикатор
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const linkRect = link.getBoundingClientRect();
                const navRect = navContainer.getBoundingClientRect();

                const indicatorPosition =
                    (linkRect.top - navRect.top) + linkRect.height / 2 - indicator.offsetHeight / 2;

                indicator.style.top = `${indicatorPosition}px`;
                indicator.style.height = `${linkRect.height}px`;

                const scrollAmount = link.offsetLeft - (navContainer.clientWidth / 2) + (link.offsetWidth / 2);
                navContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
            });
        });

        document.getElementById('main').addEventListener('scroll', updateNavigation);
        updateNavigation(); // Инициализация
    }

    /**
     * 4️⃣ Добавляет id всем заголовкам (h2, h3 и т.д.) и строит меню по ним.
     */
    function pageHeading() {
        const navContainer = document.querySelector('.post__navigation');
        const mainBlock = document.querySelector('.single__content');
        const pageBody = mainBlock || document.getElementById('main');
        const pageHeadings = Array.from(pageBody.querySelectorAll('h2, h3, h4, h5, h6'));

        function writeHeadingId() {
            pageHeadings.forEach((el, index) => {
                el.setAttribute('id', 'element-' + index);
                el.setAttribute('tag-name', el.tagName);
            });
        }

        function links(container, name, link, elemClass) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.href = '#' + link;
            a.title = name;
            a.appendChild(document.createTextNode(name));
            a.classList.add('dan__page-navigation__item__' + elemClass, 'dan__page-navigation__item__heading');
            li.appendChild(a);
            container.appendChild(li);
        }

        function createPageNavLinks() {
            pageHeadings.forEach((element, index) => {
                const elementId = element.getAttribute('id');
                const elementClass = element.getAttribute('tag-name').toLowerCase();
                const elementNameId = element.textContent;
                links(navContainer, elementNameId, elementId, elementClass);
            });
        }

        writeHeadingId();
        createPageNavLinks();
    }

    /**
    * 5️⃣ Запускаем скрипт, как только DOM готов (без ожидания картинок)
    */
    document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('.post__navigation')) {
            pageHeading();
            highlightLink();
        }
    });
};

// Запускаем скрипт
initBlockTemplate();