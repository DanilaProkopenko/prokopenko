// // document.addEventListener("DOMContentLoaded", function () {
// //     const mediaBlock = document.getElementById('media-block');
// //     const textBlock = document.getElementById('text-block');

// //     if (!mediaBlock || !textBlock) return;

// //     // Функция синхронизации скролла
// //     function syncScroll(small, big) {
// //       small.addEventListener('scroll', () => {
// //         const maxSmall = small.scrollHeight - small.clientHeight;
// //         const maxBig = big.scrollHeight - big.clientHeight;

// //         if (maxSmall <= 0 || maxBig <= 0) return;

// //         const ratio = small.scrollTop / maxSmall;
// //         big.scrollTop = ratio * maxBig;
// //       });
// //     }

// //     // Ожидание загрузки всех изображений и видео
// //     function waitForImages(container, callback) {
// //       const images = container.querySelectorAll('img, video');
// //       let loadedCount = 0;

// //       if (images.length === 0) {
// //         callback();
// //         return;
// //       }

// //       images.forEach((img) => {
// //         if (img.complete && img.naturalHeight !== undefined && img.naturalHeight > 0) {
// //           loadedCount++;
// //           if (loadedCount === images.length) callback();
// //         } else {
// //           img.addEventListener('load', () => {
// //             loadedCount++;
// //             if (loadedCount === images.length) callback();
// //           });

// //           img.addEventListener('error', () => {
// //             loadedCount++;
// //             if (loadedCount === images.length) callback();
// //           });
// //         }
// //       });
// //     }

// //     // Инициализация синхронизации
// //     function initSync() {
// //       syncScroll(mediaBlock, textBlock);
// //       syncScroll(textBlock, mediaBlock);
// //     }

// //     // Наблюдатель за изменением размеров (для lazyload)
// //     const resizeObserver = new ResizeObserver(() => {
// //       initSync(); // Обновляем пропорции при изменении высоты
// //     });

// //     resizeObserver.observe(mediaBlock);
// //     resizeObserver.observe(textBlock);

// //     // Ожидаем загрузки изображений
// //     waitForImages(mediaBlock, () => {
// //       initSync();
// //     });
// // });

// document.addEventListener("DOMContentLoaded", function () {
//   // Вариант один
//   // console.log('done');

//   // const leftBlock = document.getElementById('media-block');
//   // const rightBlock = document.getElementById('text-block');
//   // const mainWindow = document.getElementById('main');
//   // const splitContainer = document.getElementById('split-container');

//   // let rightBlockOffsetBottom = 0; // Расстояние от верха страницы до низа правого блока

//   // // === Функция для расчёта позиции нижней границы правого блока ===
//   // function updateRightBlockPosition() {
//   //   const rect = rightBlock.getBoundingClientRect();
//   //   rightBlockOffsetBottom = window.scrollY + rect.bottom;
//   //   console.log('Новая позиция низа правого блока:', rightBlockOffsetBottom);
//   // }

//   // // === Логика фиксации правого блока при достижении низа экрана ===
//   // function blockSticky() {
//   //   const currentScroll = window.scrollY || window.pageYOffset;
//   //   const windowHeight = window.innerHeight;

//   //   // Если пользователь проскроллил до низа правого блока — фиксируем
//   //   if (currentScroll + windowHeight >= rightBlockOffsetBottom) {
//   //     rightBlock.classList.add('fix_bottom'); // Добавляем класс с position: fixed
//   //     console.log('Правый блок зафиксирован у низа экрана');
//   //   } else {
//   //     rightBlock.classList.remove('fix_bottom'); // Убираем фиксацию
//   //     console.log('Правый блок снова в потоке документа');
//   //   }
//   // }

//   // // === Обновляем позицию правого блока при изменении размеров ===
//   // const resizeObserver = new ResizeObserver(() => {
//   //   updateRightBlockPosition(); // Пересчитываем позицию при изменении высоты
//   // });

//   // resizeObserver.observe(leftBlock);
//   // resizeObserver.observe(rightBlock);
//   // resizeObserver.observe(splitContainer);

//   // // === Инициализация начальной позиции правого блока ===
//   // updateRightBlockPosition();

//   // // === Слушатель скролла для проверки необходимости фиксации ===
//   // window.addEventListener('scroll', () => {
//   //   blockSticky();
//   // });

//   // // === Слушатель ресайза окна (например, поворот устройства или изменение размера браузера) ===
//   // window.addEventListener('resize', () => {
//   //   updateRightBlockPosition();
//   // });


//   // Вариант два
//   const leftBlock = document.getElementById('media-block');
//   const rightBlockWrapper = document.getElementById('text-block');
//   const rightBlock = document.getElementById('text-block-content');
//   const mainWindow = document.getElementById('main');
//   const splitContainer = document.getElementById('split-container');

//   function updateBlockHeight() {
//     const rightHeight = rightBlock.offsetHeight;
//     console.log('Правый блок высота — ', rightHeight)
//     const leftHeight = leftBlock.offsetHeight;
//     console.log('Левый блок высота — ', leftHeight)
//     const splitHeight = splitContainer.offsetHeight;
//     console.log('Сплит блок высота — ', splitHeight)
//   }

//   function blockSticky() {
//     const rightBlock = document.getElementById('text-block-content');
//     const mainWindow = document.getElementById('main');

//     const desriptionBlock = rightBlock;

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         // if (entry.isIntersecting && entry.boundingClientRect.top <= window.innerHeight) {
//         //   console.log('Низ элемента теперь в пределах видимости');
//         //   observer.unobserve(entry.target); // чтобы не срабатывало повторно
//         //   console.log('entry.boundingClientRect.bottom — ', entry.boundingClientRect.bottom);
//         //   console.log('window.innerHeight — ', window.innerHeight);
//         //   rightBlock.style.cssText = 'background-color: green';
//         //   // } else if (entry.boundingClientRect.bottom <= window.innerHeight) {
//         //   //   console.log('Равные');
//         //   //   console.log('window.innerHeight — ', window.innerHeight);
//         //   //   console.log('entry.boundingClientRect.bottom — ', entry.boundingClientRect.bottom);
//         //   //   rightBlock.style.cssText = 'background-color: orange';
//         // } else if (entry.boundingClientRect.bottom = window.innerHeight) {
//         //   console.log('Низ элемента Равен');
//         //   console.log('entry.boundingClientRect.bottom — ', entry.boundingClientRect.bottom);
//         //   console.log('window.innerHeight — ', window.innerHeight);
//         //   rightBlock.style.cssText = 'background-color: red';
//         // }
//         // if (entry.isIntersecting && entry.boundingClientRect.top <= window.innerHeight) {
//         //   console.log('Низ элемента теперь в пределах видимости');
//         //   console.log('entry — ', entry.boundingClientRect.bottom, ' window — ', window.innerHeight);
//         //   rightBlock.style.cssText = 'background-color: green';
//         // } else if (entry.boundingClientRect.bottom < window.innerHeight) {
//         //   console.log('Низ элемента Равен');
//         //   console.log('entry — ', entry.boundingClientRect.bottom, ' window — ', window.innerHeight);
//         //   rightBlock.style.cssText = 'background-color: red';
//         // }
//         // Получаем текущую позицию скролла
//         let currentScroll = mainWindow.pageYOffset || mainWindow.scrollTop;

//         // Определяем направление прокрутки
//         if (currentScroll > lastScrollTop) {
//           console.log('Прокрутка вниз');
//           // rightBlock.style.cssText = 'background-color: red';

//         } else {
//           console.log('Прокрутка вверх');
//           rightBlock.style.cssText = 'background-color: green';
//           rightBlock.style.cssText = 'position: fixed; top: auto; left: 629px; bottom: 60px; width: 357px;';

//         }

//         // Обновляем предыдущую позицию скролла
//         lastScrollTop = currentScroll;

//         if (entry.boundingClientRect.bottom < window.innerHeight) {
//           console.log('Низ элемента достиг низа');
//           // rightBlock.style.cssText = 'background-color: orange';
//           rightBlock.classList.add('_fix');
//           const rightHeight = rightBlock.offsetHeight;

//           rightBlockWrapper.style.cssText = 'position: relative; height: ' + rightHeight + 'px';

//         } else if (entry.boundingClientRect.bottom > window.innerHeight) {
//           console.log('Низ элемента вышел за границы');
//           rightBlock.classList.remove('fix_bottom');
//         }
//       });
//     }, {
//       root: null, // viewport
//       threshold: 0.01,
//     });

//     observer.observe(desriptionBlock);
//   }


//   blockSticky();
//   // Наблюдатель за изменением размеров(для lazyload)
//   const resizeObserver = new ResizeObserver(() => {
//     updateBlockHeight(); // Обновляем пропорции при изменении высоты
//     blockSticky();
//   });

//   let lastScrollTop = 0;

//   mainWindow.addEventListener('scroll', function () {

//   });
//   mainWindow.addEventListener('scroll', () => {
//     // const maxSmall = small.scrollHeight - small.clientHeight;
//     // const maxBig = big.scrollHeight - big.clientHeight;

//     // if (maxSmall <= 0 || maxBig <= 0) return;

//     // const ratio = small.scrollTop / maxSmall;
//     // big.scrollTop = ratio * maxBig;
//     // console.log('scroll')
//     resizeObserver.observe(leftBlock);
//     resizeObserver.observe(rightBlock);
//     resizeObserver.observe(splitContainer);
//     blockSticky();
//   });

//   // Вариант три


// });

