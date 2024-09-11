import { Header } from './Header';

let wwzrdsHeader;

document.addEventListener('DOMContentLoaded', () => {
  const headerDomElement = document.querySelector('.header');
  if (headerDomElement) {
    wwzrdsHeader = new Header(headerDomElement);
    wwzrdsHeader.burger();
    wwzrdsHeader.headerOut();
    // wwzrdsHeader.pageNavLinks();
    // wwzrdsHeader.highlightLink();
  }
});

export { wwzrdsHeader };
