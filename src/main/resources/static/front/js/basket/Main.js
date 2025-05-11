import { subjects } from "../Subjects.js";
import { RecommendCard } from "./RecommendCard.js";
import { ProductCard } from "./ProductCard.js";

let procuctList = [];
let recommendedList = [];
let subjectsName = [];
subjects.forEach((subject) => {
  subjectsName.push(subject.name);
});

let priceType = "Помесячно";
let maxTariffInBasket;
let productsInBasket = 0;
let price = 0;
let priceWithDiscount = 0;

function loadCardTemplate(name) {
  const tmpl = document.getElementById(name);
  if (!tmpl) {
    throw new Error(`Не найден <template id="${name}"> на странице`);
  }
  return tmpl.content;
}

let templateContent = await loadCardTemplate("productCard-template");
// Создаём карточки
subjects.forEach(async (subject) => {
  // 1) клонируем шаблон
  const clone = templateContent.cloneNode(true);

  // 2) заполняем данными
  clone.querySelector(".picked-card").classList.add(subject.name);
  const imgEl = clone.querySelector(".card-img img");
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
  document.querySelector(".content-cards").prepend(clone);
  procuctList.push(
    new ProductCard(subject, removeBasket, findMaxTariffInBasket)
  );
});

templateContent = await loadCardTemplate("recommendCard-template");
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
  document.querySelector(".basket-recommended").append(clone);
  recommendedList.push(new RecommendCard(subject, toBasket));
});

const contentForm = document.querySelector("#content-form");

function readLocalStorage() {
  recommendedList.forEach(function (card) {
    if (localStorage.getItem(`${card.subject.name}-display`) === "flex") {
      card.hideCard(toBasket);
    }
  });
}
readLocalStorage();

function toBasket(name) {
  const productCard = returnFromList(procuctList, name);
  const productInf = returnFromList(procuctList, "inf");
  const productRus = returnFromList(procuctList, "rus");
  if (productCard) {
    if (name === "inf") {
      if (
        productsInBasket === 0 ||
        (productsInBasket === 1 && productRus.inBasket())
      ) {
        productsInBasket++;
        productCard.showCard();
        console.log(`Предмет ${name} добавлен в корзину`);
      } else {
        document.querySelector("#alert-text").textContent =
          "Информатика может быть добавлена только в пустую корзину или в комплекте с русским языком";
        showPopup("popup-alert");
        console.log(
          `Предмет ${name} может быть добавлен в корзину только в комплекте с русским языком`
        );
        productsInBasket++;
        productCard.hideCard(removeBasket);
      }
    } else if (name !== "rus") {
      if (productInf.inBasket()) {
        let sub = "Биология";
        if (name === "chem") sub = "Химия";
        document.querySelector(
          "#alert-text"
        ).textContent = `${sub} не может быть добавлена в корзину в комплекте с информатикой`;
        showPopup("popup-alert");
        console.log(
          `Предмет ${name} не может быть добавлен в корзину в комплекте с информатикой`
        );
        productsInBasket++;
        productCard.hideCard(removeBasket);
      } else {
        productCard.showCard();
        productsInBasket++;
        console.log(`Предмет ${name} добавлен в корзину`);
      }
    } else {
      productCard.showCard();
      productsInBasket++;
      console.log(`Предмет ${name} добавлен в корзину`);
    }
    checkBasket();
  } else {
    console.warn(`ProductCard с name ${name} не найден.`);
  }
  makeDiscount();
}

function removeBasket(name) {
  const recommendedCard = returnFromList(recommendedList, name);
  if (recommendedCard) {
    recommendedCard.showCard();
    productsInBasket--;
    checkBasket();
    console.log(
      `Предмет ${name} удален из корзины, кол-во предметов в корзине = ${productsInBasket}`
    );
  } else {
    console.warn(`ProductCard с name ${name} не найден.`);
  }
  makeDiscount();
}
document
  .querySelector("#change-type-1")
  .addEventListener("click", changePriceType("В рассрочку"));
document
  .querySelector("#change-type-2")
  .addEventListener("click", changePriceType("Помесячно"));

document
  .querySelector("#change-type-3")
  .addEventListener("click", changePriceType("Полная оплата"));

function changePriceType(newPriceType) {
  priceType = newPriceType;
  procuctList.forEach(function (product) {
    product.changePriceType(priceType);
  });
  recommendedList.forEach(function (product) {
    product.changePriceType(priceType);
  });
  makeDiscount();
}

function returnFromList(list, name) {
  return list.find((card) => card.subject.name === name);
}

function findMaxTariffInBasket() {
  let maxTariff = [];
  procuctList.forEach(function (product) {
    if (product.display === "flex") maxTariff.push(product.tariff);
  });
  maxTariffInBasket = "Минимум";
  if (maxTariff.includes("Стандарт")) {
    maxTariffInBasket = "Стандарт";
  }
  if (maxTariff.includes("Премиум")) {
    maxTariffInBasket = "Премиум";
  }
  if (maxTariff.length === 0) {
    maxTariffInBasket = "Премиум";
  }
  recommendedList.forEach(function (product) {
    product.changeTariff(maxTariffInBasket);
  });
  makeDiscount();
}

findMaxTariffInBasket();

function checkBasket() {
  if (productsInBasket === 0) {
    document.querySelector(".picked-add").style.display = "flex";
    document.querySelector(".add-text").innerHTML =
      "Твоя корзина пуста<br><br>Добавь два или более предметов<br><i>со скидкой 50%</i>";
    document.querySelector(".content-form").style.display = "none";
  } else if (productsInBasket === subjectsName.length) {
    document.querySelector(".picked-add").style.display = "none";
  } else {
    document.querySelector(".picked-add").style.display = "flex";
    document.querySelector(".add-text").innerHTML =
      "Добавь любой предмет — на каждый следующий сделаем скидку 50%";
    document.querySelector(".content-form").style.display = "flex";
  }
}

checkBasket();

function makeDiscount() {
  const productRus = returnFromList(procuctList, "rus");
  const productChem = returnFromList(procuctList, "chem");
  const productBio = returnFromList(procuctList, "bio");
  const productInf = returnFromList(procuctList, "inf");

  const recRus = returnFromList(recommendedList, "rus");
  const recChem = returnFromList(recommendedList, "chem");
  const recBio = returnFromList(recommendedList, "bio");
  const recInf = returnFromList(recommendedList, "inf");

  procuctList.forEach(function (item) {
    item.removeDiscount();
  });

  recommendedList.forEach(function (item) {
    item.removeDiscount();
  });

  if (productsInBasket === 1) {
    if (
      productRus.inBasket() ||
      productChem.inBasket() ||
      productBio.inBasket()
    ) {
      recommendedList.forEach(function (item) {
        item.makeDiscount();
      });
      if (productChem.price > productRus.price) {
        recChem.makeDiscountByNumber(productRus.price * 0.5);
      }
    }
  } else if (productsInBasket === 2) {
    // Вариант 1: Информатика + Русский
    if (productInf.inBasket()) {
      if (productRus.inBasket()) {
        let percentages = 0.25;
        if (priceType === "Помесячно") percentages = 0.2;
        productInf.makeDiscountByNumber(productInf.price * percentages);
        productRus.makeDiscountByNumber(productRus.price * percentages);
        updateForm();
        return; // Выходим после обработки этого случая
      }
    }

    // Вариант 2: Русский + Биология
    if (productRus.inBasket()) {
      if (productBio.inBasket()) {
        if (productRus.price >= productBio.price) {
          productBio.makeDiscount();
          recBio.makeDiscount();
        } else {
          productRus.makeDiscount();
          recRus.makeDiscount();
        }

        if (
          productRus.price >= recChem.price ||
          productBio.price >= recChem.price
        ) {
          recChem.makeDiscount();
        }
        updateForm();
        return;
      }
    }

    // Вариант 3: Русский + Химия
    if (productRus.inBasket()) {
      if (productChem.inBasket()) {
        if (productRus.price >= productChem.price) {
          productChem.makeDiscount();
          recChem.makeDiscount();
        } else {
          productRus.makeDiscount();
          recRus.makeDiscount();
        }
        recBio.makeDiscount();
      }
    }
    if (productBio.inBasket()) {
      if (productChem.inBasket()) {
        if (productBio.price >= productChem.price) {
          productChem.makeDiscount();
          recChem.makeDiscount();
        } else {
          productBio.makeDiscount();
          recBio.makeDiscount();
        }

        if (
          productBio.price >= recRus.price ||
          productChem.price >= recRus.price
        ) {
          recRus.makeDiscount();
        }
      }
    }
  } else if (productsInBasket === 3) {
    // Сначала сравниваем русский с химией
    if (productRus.price >= productChem.price) {
      productChem.makeDiscount();
      // Затем сравниваем русский с биологией
      if (productRus.price >= productBio.price) {
        productBio.makeDiscount();
      } else {
        productRus.makeDiscount();
      }
    }
    // Если русский дешевле химии
    else {
      // Сначала сравниваем химию с биологией
      if (productChem.price >= productBio.price) {
        productRus.makeDiscount();
        productBio.makeDiscount();
      } else {
        productRus.makeDiscount();
        productChem.makeDiscount();
      }
    }
  }
  updateForm();
}

function updateForm() {
  price = 0;
  priceWithDiscount = 0;
  let difference = 0;
  let sumEnd = " ₽";
  if (priceType === "Помесячно") {
    sumEnd += "<b>/мес</b>";
  }
  procuctList.forEach(function (product) {
    if (product.inBasket()) {
      price += product.price;
      priceWithDiscount += product.priceWithDiscount;
      difference += product.difference;
      //console.log(`Цена без скидки на ${product.subject.name} = ${product.price} ₽`)
      //console.log(`Цена по скидке на ${product.subject.name} = ${product.priceWithDiscount}`)
    }
  });
  document.querySelector(
    "#priceWithDiscount"
  ).innerHTML = `${priceWithDiscount.toLocaleString("ru-RU")}${sumEnd}`;
  if (price !== priceWithDiscount) {
    document.querySelector(
      "#priceWithOutDiscount"
    ).innerHTML = `${price.toLocaleString("ru-RU")} ₽`;
  } else {
    document.querySelector("#priceWithOutDiscount").innerHTML = "";
  }
  document.querySelector(".eco-value").innerHTML = `${(
    price - priceWithDiscount
  ).toLocaleString("ru-RU")} ₽ /мес`;

  if (priceType !== "Помесячно") {
    document.querySelector(".eco-value").innerHTML = `${(
      price -
      priceWithDiscount +
      difference
    ).toLocaleString("ru-RU")} ₽`;
  }

  document.querySelector(
    "#difference"
  ).innerHTML = `- ${difference.toLocaleString("ru-RU")} ₽`;
  document.querySelector(
    "#difference2"
  ).innerHTML = `- ${difference.toLocaleString("ru-RU")} ₽`;
}
