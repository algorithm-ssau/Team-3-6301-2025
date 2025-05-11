import { subjects } from "../Subjects.js";
import { RecommendCard } from "./RecommendCard.js";

const cardsContainer = document.querySelector(".basket-recommended");

function loadCardTemplate() {
  const tmpl = document.getElementById("card-template");
  if (!tmpl) {
    throw new Error('Не найден <template id="card-template"> на странице');
  }
  return tmpl.content;
}

const templateContent = await loadCardTemplate();
let cardList = [];
// Создаём карточки
subjects.forEach(async (subject) => {
  // 1) клонируем шаблон
  const clone = templateContent.cloneNode(true);

  // 2) заполняем данными
  clone.querySelector(".recommended-card").classList.add(subject.name);
  const imgEl = clone.querySelector(".card-img");
  const titleEl = clone.querySelector(".content-title a");
  const priceEls = clone.querySelectorAll(".description-price");
  const imageUrl = `img/card/teacher-${subject.name}.png`;
  try {
    // Проверка существования через HEAD-запрос
    const response = await fetch(imageUrl, { method: "HEAD" });

    if (
      response.ok &&
      response.headers.get("Content-Type").startsWith("image/")
    ) {
      imgEl.src = imageUrl;
    } else {
      throw new Error("Image not found or invalid type");
    }
  } catch (error) {
    console.warn(`Изображение ${imageUrl} недоступно, используем заглушку`);
    imageUrl = `img/card/teacher-rus.png`;
  }
  if (imgEl) imgEl.src = imageUrl;
  if (titleEl) titleEl.textContent = subject.name.toUpperCase();
  priceEls.forEach((el) => (el.textContent = subject.priceFull[1] + " ₽"));
  // — берём, например, второй тариф; подправьте логику по своему усмотрению

  // 3) вешаем на кнопку коризны data-value
  const button = clone.querySelector("button.button-button");
  if (button) button.setAttribute("data-subject", subject.name);

  // 4) вставляем в контейнер
  cardsContainer.appendChild(clone);
});

subjects.forEach((subject) => {
  cardList.push(new RecommendCard(subject));
});

function readBasket() {
  let counter = 0;
  subjects.forEach((subject) => {
    if (localStorage.getItem(subject.name + "-display") === "flex") {
      counter++;
    }
  });
  document.querySelector("#basket-fixed-counter").textContent = counter;
}

readBasket();
