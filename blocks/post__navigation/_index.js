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
        // Выбираем все разделы и ссылки
        const sections = document.querySelectorAll('h2, h3, h4, h5, h6');

        const navLinks = document.querySelectorAll('.post__navigation a');
        // Функция, которая проверяет, какой раздел виден в окне просмотра
        function updateNavigation() {
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 500 && rect.bottom >= 10) {
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

    if(document.getElementsByClassName('post__navigation')[0]){
        pageHeading();
        highlightLink();
    }
    // pageNavLinks();
};

initBlockTemplate();