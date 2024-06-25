<?php

?>

<header class="header__wrapper">
    <div class="header">
        <div class="header__top">
            <!-- <a href="/" class="header__top__logo">
                <h1>
                    prokopenko
                </h1>
            </a> -->
            <div class="header__description__avatar">
                <a href="<?= esc_attr(get_avatar_url('danilaprok20@gmail.com')); ?>" data-fancybox data-caption="Аватар пользователя">
                    <img src="<?= esc_attr(get_avatar_url('danilaprok20@gmail.com')); ?>" alt="" class="header__description__avatar__source">
                </a>
                <div class="header__description__avatar__title">
                    <div class="header__description__avatar__title_name">
                        Данила Прокопенко
                    </div>
                    <div class="header__description__avatar__title_caption">
                        Графический и веб–дизайнер
                    </div>
                </div>
            </div>
            <div class="header__top__burger">
                <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 2H21M0 8.27586H21M0 15H21" stroke="white" stroke-width="2.5" />
                </svg>
            </div>
        </div>
        <div class="header__description">
            <!-- <div class="header__description__avatar">
                <img src="<?= esc_attr(get_avatar_url('danilaprok20@gmail.com')); ?>" alt="" class="header__description__avatar__source">
                <div class="header__description__avatar__title">
                    <div class="header__description__avatar__title_name">
                        Данила Прокопенко
                    </div>
                    <div class="header__description__avatar__title_caption">
                        Графический и веб–дизайнер
                    </div>
                </div>
            </div> -->
            <div class="header__description__content">
                <p>
                    Дизайнер в широком смысле этого слова.
                    Работаю и с сайтами, и с различной полиграфией, и также с различным промо–продуктом по типу: баннеры, стенды, вывести и тд.
                </p>
                <p>
                    Коммерческий опыт — 4 года. Сейчас работаю в <a href="https://www.zerna.design/" target="_blank">zerna.design.</a> Живу в Ростове–на–Дону.
                </p>
                <p>
                    Мне невероятно повезло работать c потрясающими людьми, которые помогают, учат и терпят многочисленные вопросы. Спасибо вам)
                </p>
            </div>
        </div>
        <div class="header__bottom">
            <ul class="header__bottom__links">
                <li class="header__bottom__links__item"><a href="" class="header__bottom__links__item__link">danilaprok20@gmail.com</a></li>
                <li class="header__bottom__links__item"><a href="" class="header__bottom__links__item__link">Резюме</a></li>
                <li class="header__bottom__links__item"><a href="" class="header__bottom__links__item__link">Telegram</a></li>
                <li class="header__bottom__links__item"><a href="" class="header__bottom__links__item__link">Instagram</a></li>
            </ul>
            <div class="header__bottom__year">
                <div class="header__bottom__year__update">Last update: 13.07.2024</div>
                <div class="header__bottom__year__title">© 2024 Made by me</div>
            </div>
        </div>
    </div>
</header>