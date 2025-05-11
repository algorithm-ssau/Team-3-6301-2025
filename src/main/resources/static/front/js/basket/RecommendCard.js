export class RecommendCard {
  subject;
  display = "flex";
  card;
  cardId;
  price;
  priceType = "Помесячно";
  priceEnd = "₽";
  tariff = "Премиум";
  tariffButton;
  callBack;
  tariffList = ["Минимум", "Стандарт", "Премиум"];
  iconSell =
    '<div class="icon-sell"><img alt = "" src = "https://insperia.ru/wp-content/uploads/2025/03/icon-sell.svg"><span>-50%</span></div>';

  constructor(subject, toBasket) {
    this.subject = subject;
    this.callBack = toBasket;
    this.cardId = `.recommended-card.${this.subject.name}`;
    this.card = document.querySelector(this.cardId);
    this.tariffButton = this.card.querySelector(".button-showpopup");
    let text = `Старт <b>${this.subject.startText}</b>`;
    if (this.subject.name === "chem") text = `<b>${this.subject.startText}</b>`;
    this.card.querySelector(".start").innerHTML = text;
    this.card.querySelectorAll(".start").forEach(function (field) {
      field.innerHTML = text;
    });
    text = this.subject.durationText;
    this.card.querySelectorAll(".duration").forEach(function (field) {
      field.innerHTML = `Длительность <b>${text}</b>`;
    });
    this.changeTariff(this.tariff);
    this.changePriceType(this.priceType);
    this.setupClickHandler();
  }

  changeDisplay(status) {
    this.display = status;
    this.card.style.display = this.display;
  }

  changeTariff(newTariff) {
    this.tariff = newTariff;
    this.tariffButton.innerHTML = this.tariff;
    this.changePrice();
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
    const priceField = this.card.querySelector(`.description-price.desktop`);
    priceField.innerHTML = `${this.price.toLocaleString("ru-RU")} ${
      this.priceEnd
    }`;
  }

  makeDiscount() {
    const priceFields = this.card.querySelectorAll(`.description-price`);
    let percentages = 0.5; // Скидка 50%
    let textEnd = "";
    this.iconSell = this.iconSell.replace("40", "50");
    if (this.priceType == "Помесячно") {
      percentages = 0.6; // Скидка 40%
      this.iconSell = this.iconSell.replace("50", "40");
      textEnd = "<b>/мес</b>";
    }

    this.priceWithDiscount = this.price * percentages;
    priceFields.forEach((priceField) => {
      priceField.innerHTML = `${Math.floor(
        this.priceWithDiscount
      ).toLocaleString("ru-RU")} ₽${textEnd} <strike>${
        this.iconSell
      } ${this.price.toLocaleString("ru-RU")} ₽</strike>${textEnd}`;
    });
  }
  makeDiscountByNumber(number) {
    //console.log(`${this.price} - ${number} = ${this.price - number}`)
    const priceFields = this.card.querySelectorAll(`.description-price`);
    let percentages = (number / this.price) * 100;
    this.iconSell = this.iconSell.replace("50", "40");
    const newIconSell = this.iconSell.replace("40", Math.floor(percentages));
    let textEnd = "";
    if (this.priceType == "Помесячно") {
      textEnd = "<b>/мес</b>";
    }
    this.priceWithDiscount = Math.floor(this.price * (1 - percentages / 100));
    priceFields.forEach((priceField) => {
      priceField.innerHTML = `${Math.floor(
        this.priceWithDiscount
      ).toLocaleString(
        "ru-RU"
      )} ₽${textEnd} <strike>${newIconSell} ${this.price.toLocaleString(
        "ru-RU"
      )} ₽</strike>${textEnd}`;
    });
  }
  removeDiscount() {
    const priceField = this.card.querySelector(`.description-price`);
    let textEnd = "";
    if (this.priceType == "Помесячно") {
      textEnd = "<b>/мес</b>";
    }
    priceField.innerHTML = `${Math.floor(this.price).toLocaleString(
      "ru-RU"
    )} ₽${textEnd}`;
  }

  showPopup() {
    const popup = new Popup(this.subject, this.tariff, (newTariff) =>
      this.changeTariff(newTariff)
    );
  }

  showCard() {
    this.changeDisplay("flex");
  }

  hideCard(callBack) {
    this.changeDisplay("none");
    localStorage.setItem("tariff-" + this.subject.name, this.tariff);
    if (typeof callBack === "function") {
      callBack(this.subject.name); // Вызываем callback после выполнения hideCard()
    }
  }

  setupClickHandler() {
    this.tariffButton.addEventListener("click", () => this.showPopup());
    this.card
      .querySelector(".button-button")
      .addEventListener("click", () => this.hideCard(this.callBack));
  }
}
