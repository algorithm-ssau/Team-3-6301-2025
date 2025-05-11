function toggleDropdown() {
  const options = document.querySelector(".options");
  const img = document.querySelector(".selected-img");
  options.style.display = options.style.display === "block" ? "none" : "block";
  img.style.transform =
    options.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
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

function selectOption(value) {
  document.querySelector(".options").style.display = "none";
  document.querySelector(".selected-img").style.transform = "rotate(0deg)";
  selectSubject(value);
}

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
