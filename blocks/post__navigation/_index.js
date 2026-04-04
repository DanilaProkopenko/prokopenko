const initBlockTemplate_v2 = () => {
    let manualScroll = false;

    function transliterate(text) {
        const map = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
            'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
            'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
            'я': 'ya'
        };

        return text
            .toLowerCase()
            .split('')
            .map(char => map[char] || char)
            .join('')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');
    }

    function scrollToSection(section) {
        manualScroll = true;

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        const handleScrollEnd = () => {
            manualScroll = false;
            window.removeEventListener('scroll', handleScrollEnd);
        };

        window.addEventListener('scroll', handleScrollEnd, { once: true });
    }

    function centerActiveLink(navContainer, link) {
        if (!navContainer || !link) return;

        const li = link.closest('li');
        const target = li || link;
        const scrollAmount =
            target.offsetLeft - (navContainer.clientWidth / 2) + (target.offsetWidth / 2);

        navContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    function pageHeading() {
        const navContainer = document.querySelector('.post__navigation');
        const mainBlock = document.querySelector('.single__content');
        const pageBody = mainBlock || document.body;
        const pageHeadings = Array.from(pageBody.querySelectorAll('h2, h3, h4, h5, h6'));

        if (!navContainer || !pageHeadings.length) return;

        const usedIds = new Set();

        pageHeadings.forEach((el) => {
            let id = transliterate(el.textContent);

            if (usedIds.has(id)) {
                let counter = 1;
                while (usedIds.has(`${id}-${counter}`)) {
                    counter++;
                }
                id = `${id}-${counter}`;
            }

            usedIds.add(id);
            el.setAttribute('id', id);
            el.setAttribute('tag-name', el.tagName);

            const li = document.createElement('li');
            const a = document.createElement('a');

            a.href = '#' + id;
            a.title = el.textContent;
            a.textContent = el.textContent;
            a.classList.add(
                'dan__page-navigation__item__' + el.tagName.toLowerCase(),
                'dan__page-navigation__item__heading'
            );

            li.appendChild(a);

            const ul = navContainer.querySelector('ul');
            if (ul) {
                ul.appendChild(li);
            }
        });
    }

    function highlightLink() {
        const mainBlock = document.querySelector('.single__content') || document.body;
        const sections = Array.from(mainBlock.querySelectorAll('h2, h3, h4, h5, h6'));
        const navContainer = document.querySelector('.post__navigation');
        const navLinks = navContainer ? Array.from(navContainer.querySelectorAll('a')) : [];

        if (!navContainer || !sections.length || !navLinks.length) return;

        let lastActiveIndex = -1;

        function setActiveLink(activeIndex) {
            navLinks.forEach((link, index) => {
                if (index === activeIndex) {
                    link.classList.add('active');
                    centerActiveLink(navContainer, link);
                } else {
                    link.classList.remove('active');
                }
            });
        }

        function updateNavigation() {
            if (manualScroll) return;

            let activeIndex = -1;
            const isAtTop = window.scrollY <= 100;
            const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

            if (isAtTop) {
                activeIndex = 0;
            } else if (isAtBottom) {
                activeIndex = sections.length - 1;
            } else {
                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();

                    if (rect.top <= window.innerHeight * 0.2 && rect.bottom >= window.innerHeight * 0.1) {
                        activeIndex = index;
                    }
                });
            }

            if (activeIndex === -1 && lastActiveIndex !== -1) {
                activeIndex = lastActiveIndex;
            } else if (activeIndex !== -1) {
                lastActiveIndex = activeIndex;
            }

            if (activeIndex !== -1) {
                setActiveLink(activeIndex);
            }
        }

        navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                const targetSection = sections[index];
                if (!targetSection) return;

                manualScroll = true;
                setActiveLink(index);

                const parentContentBlock = targetSection.closest('.more-content');

                if (parentContentBlock && !parentContentBlock.classList.contains('active')) {
                    const button = parentContentBlock.previousElementSibling;

                    parentContentBlock.style.height = parentContentBlock.scrollHeight + 'px';
                    parentContentBlock.classList.add('active');

                    if (button && button.classList.contains('more-button')) {
                        button.textContent = 'Свернуть ▲';
                    }

                    parentContentBlock.addEventListener('transitionend', function onTransitionEnd() {
                        parentContentBlock.removeEventListener('transitionend', onTransitionEnd);

                        setTimeout(() => {
                            scrollToSection(targetSection);
                        }, 100);
                    }, { once: true });
                } else {
                    setTimeout(() => {
                        scrollToSection(targetSection);
                    }, 50);
                }
            });
        });

        window.addEventListener('scroll', updateNavigation);
        updateNavigation();
    }

    document.addEventListener('DOMContentLoaded', () => {
        if (!document.querySelector('.post__navigation')) return;

        pageHeading();
        highlightLink();
    });
};

initBlockTemplate_v2();