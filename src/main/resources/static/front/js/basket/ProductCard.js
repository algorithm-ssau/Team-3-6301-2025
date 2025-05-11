export class ProductCard {
  subject;
  display = "none";
  card;
  cardId;
  price;
  priceType = "Помесячно";
  priceEnd = "₽";
  tariff;
  tariffButton;
  callBack;
  tariffList = ["Минимум", "Стандарт", "Премиум"];
  callBackFindMaxTariffInBasket;
  priceWithDiscount;
  iconSell =
    '<div class="icon-sell"><img alt = "" src = "https://insperia.ru/wp-content/uploads/2025/03/icon-sell.svg"><span>-50%</span></div>';
  difference;

  constructor(subject, removeBasket, findMaxTariffInBasket) {
    this.subject = subject;
    this.callBack = removeBasket;
    this.callBackFindMaxTariffInBasket = findMaxTariffInBasket;
    this.cardId = `.picked-card.${this.subject.name}`;
    this.card = document.querySelector(this.cardId);
    this.card.querySelector(".content-title a").innerHTML = this.subject.title;
    let text = `Старт <b>${this.subject.startText}</b>`;
    if (this.subject.name === "chem") text = `<b>${this.subject.startText}</b>`;
    this.card.querySelector(".start").innerHTML = text;
    this.card.querySelector(
      ".duration"
    ).innerHTML = `Длительность <b>${this.subject.durationText}</b>`;
    if (localStorage.getItem("tariff-" + this.subject.name) === null) {
      localStorage.setItem("tariff-" + this.subject.name, "Премиум");
    }
    this.tariff = localStorage.getItem("tariff-" + this.subject.name);
    this.tariffButton = this.card.querySelector(".button-showpopup");
    this.tariffButton.innerHTML = this.tariff;
    this.changePriceType(this.priceType);
    this.setupClickHandler();
  }

  changeDisplay(status) {
    this.display = status;
    this.card.style.display = this.display;
    localStorage.setItem(`${this.subject.name}-display`, this.display);
  }

  showPopup() {
    const popup = new Popup(this.subject, this.tariff, (newTariff) =>
      this.changeTariff(newTariff, this.callBackFindMaxTariffInBasket)
    );
  }

  changeTariff(newTariff, callBack) {
    this.tariff = newTariff;
    this.tariffButton.innerHTML = this.tariff;
    localStorage.setItem("tariff-" + this.subject.name, this.tariff);
    this.changePrice();
    if (typeof callBack === "function") {
      callBack();
    }
  }

  changePriceType(newType) {
    this.priceType = newType;
    if (this.priceType === "Помесячно") {
      this.priceEnd = "₽ <b>/мес</b>";
    } else {
      this.priceEnd = "₽";
    }
    this.changePrice();
  }

  changePrice() {
    let index = this.tariffList.findIndex((tariff) => tariff === this.tariff);
    if (this.priceType === "Помесячно") {
      this.price = this.subject.priceMonthly[index];
    } else {
      this.price = this.subject.priceFull[index];
    }
    this.difference =
      this.subject.priceMonthly[index] * this.subject.durationNumber -
      this.subject.priceFull[index];
    const priceField = this.card.querySelector(`.description-price`);
    priceField.innerHTML = `${this.price.toLocaleString("ru-RU")} ${
      this.priceEnd
    }`;
  }

  makeDiscount() {
    const priceField = this.card.querySelector(`.description-price`);
    let percentages = 0.5; // Скидка 50%
    this.iconSell = this.iconSell.replace("40", "50");
    let textEnd = "";
    if (this.priceType == "Помесячно") {
      percentages = 0.6; // Скидка 40%
      this.iconSell = this.iconSell.replace("50", "40");
      textEnd = "<b>/мес</b>";
    }
    this.priceWithDiscount = Math.floor(this.price * percentages);
    priceField.innerHTML = `${Math.floor(this.priceWithDiscount).toLocaleString(
      "ru-RU"
    )} ₽${textEnd} <strike>${this.iconSell} ${this.price.toLocaleString(
      "ru-RU"
    )} ₽</strike>${textEnd}`;
  }

  makeDiscountByNumber(number) {
    //console.log(`${this.price} - ${number} = ${this.price - number}`)
    const priceField = this.card.querySelector(`.description-price`);
    let percentages = (number / this.price) * 100;
    this.iconSell = this.iconSell.replace("50", "40");
    const newIconSell = this.iconSell.replace("40", Math.floor(percentages));
    let textEnd = "";
    if (this.priceType == "Помесячно") {
      textEnd = "<b>/мес</b>";
    }
    this.priceWithDiscount = Math.floor(this.price * (1 - percentages / 100));
    priceField.innerHTML = `${Math.floor(this.priceWithDiscount).toLocaleString(
      "ru-RU"
    )} ₽${textEnd} <strike>${newIconSell} ${this.price.toLocaleString(
      "ru-RU"
    )} ₽</strike>${textEnd}`;
  }

  removeDiscount() {
    const priceField = this.card.querySelector(`.description-price`);
    let textEnd = "";
    if (this.priceType == "Помесячно") {
      textEnd = "<b>/мес</b>";
    }
    this.priceWithDiscount = this.price;
    priceField.innerHTML = `${Math.floor(this.price).toLocaleString(
      "ru-RU"
    )} ₽${textEnd}`;
  }

  showCard() {
    this.changeTariff(localStorage.getItem("tariff-" + this.subject.name));
    this.changePrice();
    this.changeDisplay("flex");
  }

  hideCard(callBack) {
    this.changeDisplay("none");
    if (typeof callBack === "function") {
      callBack(this.subject.name); // Вызываем callback после выполнения hideCard()
    }
  }

  inBasket() {
    if (this.display == "flex") return true;
    else return false;
  }

  setupClickHandler() {
    this.tariffButton.addEventListener("click", () => this.showPopup());
    this.card
      .querySelector(".header-trash")
      .addEventListener("click", () => this.hideCard(this.callBack));
    this.card
      .querySelector(".cross-delete")
      .addEventListener("click", () => this.hideCard(this.callBack));
  }
}
