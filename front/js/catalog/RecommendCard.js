class RecommendCard {
  iconSell =
    '<div class="icon-sell"><img alt = "" src = "https://insperia.ru/wp-content/uploads/2025/03/icon-sell.svg"><span>-50%</span></div>';
  tariff = "Премиум";
  tariffButton;
  type = "Помесячно";
  mainPrice;
  discount = false;

  constructor(subject) {
    this.subject = subject;
    this.tariffButton = document.querySelector(
      ".tariff-rec-" + this.subject.name
    );
    this.tariffButton.innerHTML = this.tariff;
    let text = `Старт <b>${this.subject.startText}</b>`;
    if (this.subject.name === "chem") text = `<b>${this.subject.startText}</b>`;
    document.querySelector(".start-" + this.subject.name).innerHTML = text;
    document.querySelector(".duration-" + this.subject.name).innerHTML =
      "Длительность <b>" + this.subject.durationText + "</b>";
    this.setupClickHandler();
  }
  setupClickHandler() {
    this.updateTariff(this.tariff);
    this.tariffButton.addEventListener("click", () => this.showPopup());
  }
  showPopup() {
    let masPrice = this.subject.priceMonthly;
    if (this.type != "Помесячно") masPrice = this.subject.priceFull;
    // Создаем экземпляр Popup и передаем текущий тариф и колбэк
    this.popup = new Popup(
      this.subject.name,
      this.tariff,
      this.tariffButton,
      this.subject.cardText,
      masPrice,
      (newTariff) => this.updateTariff(newTariff) // Колбэк для обновления тарифа
    );
  }
  updateTariff(newTariff) {
    this.tariff = newTariff;
    this.tariffButton.innerHTML = this.tariff;
    localStorage.setItem("tariff-" + this.subject.name, this.tariff);
    this.priceType(this.type);
  }
  priceType(type) {
    this.type = type;
    let index = 0;
    if (this.tariff == "Стандарт") {
      index = 1;
    } else if (this.tariff == "Премиум") {
      index = 2;
    }
    if (this.type == "Помесячно") {
      this.mainPrice = this.subject.priceMonthly[index];
    } else {
      this.mainPrice = this.subject.priceFull[index];
    }
    if (this.discount) {
      this.makeDiscount();
    } else {
      this.removeDiscount();
    }
  }
  makeDiscount() {
    let prices = document.querySelectorAll(
      ".description-price." + this.subject.name
    );
    let percentages = 0.5; // Скидка 50%
    let textEnd = ["", ""];
    this.iconSell = this.iconSell.replace("40", "50");
    if (this.type == "Помесячно") {
      percentages = 0.6; // Скидка 40%
      this.iconSell = this.iconSell.replace("50", "40");
      textEnd[0] = "<b>/мес*</b>";
      textEnd[1] = "<b>/мес</b>";
    }
    this.priceWithDiscount = this.mainPrice * percentages;
    const text =
      Math.floor(this.priceWithDiscount).toLocaleString("ru-RU") +
      " ₽" +
      textEnd[0] +
      " <strike>" +
      this.iconSell +
      this.mainPrice.toLocaleString("ru-RU") +
      " ₽</strike>" +
      textEnd[1];

    prices.forEach(function (priceText) {
      priceText.innerHTML = text;
      priceText.classList.add("withDiscount");
    });
    this.discount = true;
  }
  removeDiscount() {
    let prices = document.querySelectorAll(
      ".description-price." + this.subject.name
    );
    let textEnd = "";
    if (this.type == "Помесячно") {
      textEnd = "<b>/мес</b>";
    }
    const text =
      Math.floor(this.mainPrice).toLocaleString("ru-RU") + " ₽" + textEnd;

    prices.forEach(function (priceText) {
      priceText.innerHTML = text;
      priceText.classList.remove("withDiscount");
    });
    this.discount = false;
  }
  checkCounter() {
    let counter = 0;
    if (localStorage.getItem("rus-display") == "flex") {
      counter++;
    }
    if (localStorage.getItem("inf-display") == "flex") {
      counter++;
    }
    if (localStorage.getItem("chem-display") == "flex") {
      counter++;
    }
    return counter;
  }
}
