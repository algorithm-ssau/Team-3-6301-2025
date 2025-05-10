// loadHeader.js
document.addEventListener("DOMContentLoaded", function () {
  // Создаем контейнер для хедера
  const headerContainer = document.createElement("div");
  headerContainer.id = "header-container";

  // Вставляем контейнер в начало body
  document.body.insertBefore(headerContainer, document.body.firstChild);

  // Загружаем содержимое хедера
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      headerContainer.innerHTML = data;
    })
    .catch((error) => {
      console.error("Ошибка загрузки хедера:", error);
    });
});
