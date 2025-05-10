const recommendedRus = new RecommendCard(subjects[0]);
const recommendedChem = new RecommendCard(subjects[3]);
const recommendedInf = new RecommendCard(subjects[1]);
const recommendedBio = new RecommendCard(subjects[4]);
recommendedRus.priceType(recommendedRus.type);
recommendedInf.priceType(recommendedInf.type);
recommendedChem.priceType(recommendedChem.type);
recommendedBio.priceType(recommendedBio.type);

function redirectImg(page) {
  window.location.href = `/${page}`;
}

function selectSubject(value) {
  document.querySelector(".option-text").textContent = value;
  switch (value) {
    case "Все курсы":
      document.getElementById("catalog-menu-1").checked = true;
      selectAll();
      break;
    case "Русский язык":
      document.getElementById("catalog-menu-2").checked = true;
      select(".rus");
      break;
    case "Информатика":
      document.getElementById("catalog-menu-3").checked = true;
      select(".inf");
      break;
    case "Химия":
      document.getElementById("catalog-menu-4").checked = true;
      select(".chem");
      break;
    case "Биология":
      document.getElementById("catalog-menu-6").checked = true;
      select(".bio");
      break;
    case "Математика":
      document.getElementById("catalog-menu-7").checked = true;
      select(".math");
      break;
  }
}
let subjectsMas = [".rus", ".inf", ".chem", ".bio", ".math"];
function selectAll() {
  subjectsMas.forEach(function (subject) {
    displayFlex(".recommended-card" + subject);
  });
}
function select(className) {
  subjectsMas.forEach(function (subject) {
    displayNone(".recommended-card" + subject);
  });
  displayFlex(".recommended-card" + className);
}
function displayNone(className) {
  const elements = document.querySelectorAll(className);
  elements.forEach((item) => {
    item.style.display = "none";
  });
}
function displayFlex(className) {
  const elements = document.querySelectorAll(className);
  elements.forEach((item) => {
    item.style.display = "flex";
  });
}
function readBasket() {
  let subjects = ["rus", "chem", "inf", "bio"];
  let counter = 0;
  subjects.forEach((subject) => {
    if (localStorage.getItem(subject + "-display") == "flex") {
      const button = document.querySelector(".button-button." + subject);
      button.classList.add("added");
      button.innerHTML = "В корзине";
      counter++;
    }
  });
  document.querySelector("#basket-fixed-counter").textContent = counter;
}
readBasket();
function toBasket(value) {
  localStorage.setItem(value + "-display", "flex");
  localStorage.setItem("tariff-" + value, "Стандарт");
  showBasketPopup();
  readBasket();
  recommendedRus.priceType(recommendedRus.type);
  recommendedInf.priceType(recommendedInf.type);
  recommendedChem.priceType(recommendedChem.type);
  recommendedBio.priceType(recommendedBio.type);
}
function makeDiscount() {
  recommendedRus.removeDiscount();
  recommendedChem.removeDiscount();
  recommendedBio.removeDiscount();
  if (localStorage.getItem("rus-display") == "flex") {
    recommendedChem.makeDiscount();
    recommendedBio.makeDiscount();
  } else if (localStorage.getItem("chem-display") == "flex") {
    recommendedRus.makeDiscount();
    recommendedBio.makeDiscount();
  } else if (localStorage.getItem("bio-display") == "flex") {
    recommendedRus.makeDiscount();
    recommendedChem.makeDiscount();
  }
}
makeDiscount();
function showBasketPopup() {
  document.querySelector(".popup-basket").style.display = "flex";
}
function hideBasketPopup() {
  document.querySelector(".popup-basket").style.display = "none";
}
function showFakePopup() {
  document.querySelector(".popup-fake").style.display = "flex";
}
function hideFakePopup() {
  document.querySelector(".popup-fake").style.display = "none";
}
