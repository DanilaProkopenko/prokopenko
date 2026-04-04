import { Header } from './Header';

let wwzrdsHeader;

document.addEventListener('DOMContentLoaded', () => {
  const headerDomElement = document.querySelector('.header');
  if (headerDomElement) {
    wwzrdsHeader = new Header(headerDomElement);
    wwzrdsHeader.burger();
    // wwzrdsHeader.headerOut();
    // wwzrdsHeader.headerOut('.header__top__right .header__navigation._main');
    // wwzrdsHeader.headerOut('.header__navigation._contact');

    // headerOut({
    //   selector: '.header__navigation._main',
    //   outClass: 'out',
    //   startHideAfter: 100,
    //   hideDistance: 20,
    //   showDistance: 160,
    //   topVisibleOffset: 60
    // });

    // headerOut({
    //   selector: '.header__navigation._contact',
    //   outClass: 'out',
    //   startHideAfter: 100,
    //   hideDistance: 20,
    //   showDistance: 160,
    //   topVisibleOffset: 60
    // });

    wwzrdsHeader.headerOut({
      // selector: '.header__navigation._main, .header__navigation._contact',
      selector: '.header__wrapper',
      outClass: 'out',
      startHideAfter: 100,
      hideDistance: 20,
      showDistance: 160,
      topVisibleOffset: 60
    });
    // wwzrdsHeader.headerOut('.header__top__logo');
    // wwzrdsHeader.pageNavLinks();
    // wwzrdsHeader.highlightLink();

    // wwzrdsHeader.pageHeading();
  }
});

export { wwzrdsHeader };
