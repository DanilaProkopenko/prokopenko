document.addEventListener("DOMContentLoaded", function () {
    // Функция для обработки заголовков
    function adjustHeadings() {
      // Находим все заголовки на странице
      const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  
      headings.forEach((heading) => {
        // Получаем следующий элемент после текущего заголовка
        const nextElement = heading.nextElementSibling;
  
        // Удаляем все предыдущие классы для отступов
        heading.classList.remove(
          "large-margin-top",
          "medium-margin-top",
          "small-margin-top",
          "large-margin-all",
          "medium-margin-all",
          "small-margin-all"
        );
  
        // Проверяем условия для каждого случая
        if (nextElement) {
          if (["H2", "H3", "H4", "H5", "H6"].includes(nextElement.tagName)) {
            // Если после заголовка идет другой заголовок, добавляем одинаковые отступы сверху и снизу
            heading.classList.add("medium-margin-all");
          } else {
            // Если после заголовка есть ЛЮБОЙ другой элемент, добавляем малый отступ только сверху
            heading.classList.add("small-margin-top");
          }
        } else {
          // Если после заголовка НЕТ элементов, добавляем средний отступ сверху и снизу
          heading.classList.add("medium-margin-all");
        }
      });
    }
  
    // Вызываем функцию при загрузке страницы
    adjustHeadings();
  });