import { subjects } from "../Subjects.js";

function loadCardTemplate(name) {
  const tmpl = document.getElementById(name);
  if (!tmpl) {
    throw new Error(`Не найден <template id="${name}"> на странице`);
  }
  return tmpl.content;
}

let templateContent = await loadCardTemplate("recommendCard-template");
// Создаём карточки
subjects.forEach(async (subject) => {
  // 1) клонируем шаблон
  const clone = templateContent.cloneNode(true);

  // 2) заполняем данными
  clone.querySelector(".recommended-card").classList.add(subject.name);
  const imgEl = clone.querySelector(".card-img");
  const titleEl = clone.querySelector(".content-title a");
  const priceEls = clone.querySelectorAll(".description-price");
  const delBtn = clone.querySelector(".delete");
  let imageUrl = `img/card/teacher-${subject.name}.png`;
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
  if (titleEl) titleEl.textContent = subject.title;
  priceEls.forEach((el) => (el.textContent = subject.priceFull[1] + " ₽"));
  // — берём, например, второй тариф; подправьте логику по своему усмотрению
  if (delBtn) {
    delBtn.addEventListener("click", () => {
      fetchSubjects(subject.name);
    });
  }

  // 4) вставляем в контейнер
  document.querySelector("body").append(clone);
});

async function fetchSubjects(name) {
  console.log(name);
  try {
    const response = await fetch(`/api/subjects/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    window.location.href = "/front/deleteSubject.html";
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
}
