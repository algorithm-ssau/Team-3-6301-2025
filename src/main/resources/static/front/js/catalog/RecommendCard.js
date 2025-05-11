export class RecommendCard {
  iconSell =
    '<div class="icon-sell"><img alt = "" src = "https://insperia.ru/wp-content/uploads/2025/03/icon-sell.svg"><span>-50%</span></div>';
  tariff = "Премиум";
  tariffButton;
  type = "Полная оплата";
  mainPrice;
  discount = false;
  card;
  display = "none";

  constructor(subject) {
    this.subject = subject;
    this.card = document.querySelector(
      `.recommended-card.${this.subject.name}`
    );
    this.setupText();
    this.updateTariff(this.tariff);
    this.setupClickHandler();
  }

  setupText() {
    this.tariffButton = this.card.querySelector(".tariff-rec");
    this.tariffButton.innerHTML = this.tariff;
    this.card.querySelector(".content-title a").innerHTML = this.subject.title;
    this.card.querySelector(
      ".start"
    ).innerHTML = `Старт <b>${this.subject.startText}</b>`;
    this.card.querySelector(".duration").innerHTML =
      "Длительность <b>" + this.subject.durationText + "</b>";
    if (localStorage.getItem(this.subject.name + "-display") === "flex") {
      const button = this.card.querySelector(".button-button");
      button.classList.add("added");
      button.innerHTML = "В корзине";
    }
  }

  setupClickHandler() {
    this.updateTariff(this.tariff);
    this.tariffButton.addEventListener("click", () => this.showPopup());
    this.card
      .querySelector(".button-button")
      .addEventListener("click", () => this.toBasket());
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
    this.changePrice();
  }
  changePrice() {
    const fields = this.card.querySelectorAll(".description-price");
    fields.forEach((field) => {
      field.innerHTML = `${this.mainPrice} ₽`;
    });
  }
  toBasket() {
    localStorage.setItem(`${this.subject.name}-display`, "flex");
    localStorage.setItem(`tariff-${this.subject.name}`, this.tariff);
    this.showBasketPopup();
  }
  showBasketPopup() {
    document.querySelector(".popup-basket").style.display = "flex";
  }
}
