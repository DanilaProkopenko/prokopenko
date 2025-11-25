const initBlockTemplate_v2 = () => {
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

                // Если значение data-id-name не равно 0, создаём для него ссылку
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
     * 2️⃣ Прокручивает страницу до указанной секции с обработкой окончания скролла.
     */
    function scrollToSection(section, index) {
        manualScroll = true; // Устанавливаем флаг перед началом скролла

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        const handleScrollEnd = () => {
            manualScroll = false;
            window.removeEventListener('scroll', handleScrollEnd);
        };

        // Ждём конца скролла один раз
        window.addEventListener('scroll', handleScrollEnd, { once: true });
    }

    /**
     * 3️⃣ Отслеживает текущую секцию при скролле и выделяет соответствующую ссылку.
     */
    function highlightLink() {
        const mainBlock = document.querySelector('.single__content') || document.body;
        let sections, navLinks, indicator, navContainer;

        // Выбираем правильные элементы в зависимости от наличия .single__content
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
            if (manualScroll) return; // Игнорируем, если скролл был программным

            let activeIndex = -1;

            // Проверяем, какие заголовки сейчас видны на экране
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.2 && rect.bottom >= window.innerHeight * 0.1) {
                    activeIndex = index;
                }
            });

            // Запоминаем последний активный индекс, чтобы избежать "пропадания"
            if (activeIndex === -1 && lastActiveIndex !== -1) {
                activeIndex = lastActiveIndex;
            } else if (activeIndex !== -1) {
                lastActiveIndex = activeIndex;
            }

            // Обновляем классы и позиционируем индикатор
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

                    // Центрируем активную ссылку в горизонтальном меню
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
                e.preventDefault();
                manualScroll = true;

                const targetSection = sections[index];
                const parentContentBlock = targetSection.closest('.more-content');

                // Если раздел скрыт внутри "ещё", раскрываем его
                if (parentContentBlock && !parentContentBlock.classList.contains('active')) {
                    const button = parentContentBlock.previousElementSibling;

                    parentContentBlock.style.height = parentContentBlock.scrollHeight + 'px';
                    parentContentBlock.classList.add('active');

                    if (button && button.classList.contains('more-button')) {
                        button.textContent = 'Свернуть ▲';
                    }

                    // После анимации раскрытия прокручиваем к нужному заголовку
                    parentContentBlock.addEventListener('transitionend', function onTransitionEnd() {
                        parentContentBlock.removeEventListener('transitionend', onTransitionEnd);
                        setTimeout(() => {
                            scrollToSection(targetSection, link, index);
                        }, 100);
                    }, { once: true });
                } else {
                    // Иначе просто прокручиваем
                    setTimeout(() => {
                        scrollToSection(targetSection, link, index);
                    }, 50);
                }

                // Ручное обновление состояния активной ссылки
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

        // Слушаем скролл и обновляем активную ссылку
        window.addEventListener('scroll', updateNavigation);
        updateNavigation(); // Инициализация
    }

    /**
     * 4️⃣ Добавляет id всем заголовкам (h2, h3 и т.д.) и строит меню по ним.
     */
    function pageHeading() {
        const navContainer = document.querySelector('.post__navigation');
        const mainBlock = document.querySelector('.single__content');
        const pageBody = mainBlock || document.body;
        const pageHeadings = Array.from(pageBody.querySelectorAll('h2, h3, h4, h5, h6'));

        // Назначаем уникальные ID заголовкам и сохраняем их теги
        function writeHeadingId() {
            pageHeadings.forEach((el, index) => {
                el.setAttribute('id', 'element-' + index);
                el.setAttribute('tag-name', el.tagName);
            });
        }

        // Создаём ссылку в меню
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

        // Генерируем пункты меню на основе заголовков
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

const initBlockTemplate = () => {

    // Генерация ID для заголовков и создание меню
    function pageHeading() {
        const navContainer = document.querySelector('.post__navigation');
        const content = document.querySelector('.single__content');

        if (!content || !navContainer) return;

        const headings = Array.from(content.querySelectorAll('h2, h3'));

        // Присвоение уникальных ID заголовкам
        headings.forEach((el, index) => {
            el.id = 'element-' + index;
        });

        // Создание ссылок в меню
        headings.forEach(heading => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + heading.id;
            a.textContent = heading.textContent;
            a.classList.add('nav-link');
            li.appendChild(a);
            navContainer.appendChild(li);
        });
    }

    // Отслеживание видимости заголовков через Intersection Observer
    function observeHeadings() {
        const headings = document.querySelectorAll('h2, h3');
        const links = document.querySelectorAll('.post__navigation a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;

                    // Убираем active у всех ссылок
                    links.forEach(link => link.classList.remove('active'));

                    // Добавляем active к той, что соответствует текущему заголовку
                    const currentLink = document.querySelector(`.post__navigation a[href="#${id}"]`);
                    if (currentLink) {
                        currentLink.classList.add('active');
                    }
                }
            });
        }, {
            rootMargin: '-100px 0px -60% 0px', // Настройка зоны активности
            threshold: 0.1
        });

        headings.forEach(heading => observer.observe(heading));
    }

    // Обработка клика по ссылкам (для подсветки)
  function handleLinkClicks() {
    const navContainer = document.querySelector('.post__navigation');
    navContainer.addEventListener('click', (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение якорей

        const link = e.target.closest('a');
        if (!link) return;

        const hash = link.getAttribute('href'); // Например: #element-3
        const targetHeading = document.querySelector(hash); // Получаем заголовок

        if (!targetHeading) return;

        // Проверяем, находится ли заголовок внутри .more-content
        const moreContent = targetHeading.closest('.more-content');

        if (moreContent && !moreContent.classList.contains('active')) {
            // Открываем блок
            moreContent.classList.add('active');
moreContent.style.height = moreContent.scrollHeight + 'px'
            // Ищем ближайшую кнопку .more-button и меняем текст
            const button = moreContent.previousElementSibling?.classList?.contains('more-button')
                ? moreContent.previousElementSibling
                : null;

            if (button) {
                button.textContent = 'Свернуть ▲';
            }
        }

        // Выполняем прокрутку после всех действий
        setTimeout(() => {
            targetHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Небольшая задержка, чтобы успел открыться блок
    });
}

    // Запуск всего
    pageHeading();
    observeHeadings();
    handleLinkClicks();

};


// Запускаем скрипт
initBlockTemplate_v2();