class Popup {
  constructor(
    subject,
    tariff,
    tariffButton,
    cardText,
    priceMonthly,
    onCloseCallback
  ) {
    this.subject = subject;
    this.tariff = tariff;
    this.tariffButton = tariffButton;
    this.priceMonthly = priceMonthly;
    this.onCloseCallback = onCloseCallback; // Колбэк для обновления тарифа
    this.popup = document.querySelector(".popup-tariff");
    this.changeDescription(cardText);
    // Сохраняем ссылки на функции-обработчики
    this.handleCardButton1Click = () => this.pickCard("Минимум");
    this.handleCardButton2Click = () => this.pickCard("Стандарт");
    this.handleCardButton3Click = () => this.pickCard("Премиум");
    this.handleHeaderCrossClick = () => this.hidePopup();

    this.setupClickHandler();
    this.showPopup();
  }

  setupClickHandler() {
    // Добавляем обработчики с сохраненными функциями
    document
      .querySelector("#card-button-1")
      .addEventListener("click", this.handleCardButton1Click);
    document
      .querySelector("#card-button-2")
      .addEventListener("click", this.handleCardButton2Click);
    document
      .querySelector("#card-button-3")
      .addEventListener("click", this.handleCardButton3Click);
    document
      .querySelector(".header-cross")
      .addEventListener("click", this.handleHeaderCrossClick);
  }

  showPopup() {
    this.popup.style.display = "flex";
    this.updatePopupContent();
  }
  changeDescription(cardText) {
    this.changeDescriptionMinimum(".material-content", cardText.minimum);
    this.changeDescriptionMinimum(
      ".tariff-card-content.standart",
      cardText.standart
    );
    this.changeDescriptionMinimum(
      ".tariff-card-content.premium",
      cardText.premium
    );
  }
  changeDescriptionMinimum(className, cardText) {
    const texts = document.querySelectorAll(className);
    texts.forEach(function (text, i) {
      text.innerHTML = cardText[i];
    });
  }
  changeDescriptionMinimum(className, cardText) {
    const prices = document.querySelectorAll(".card-title span:last-child");
    const priceMonthly = this.priceMonthly;

    prices.forEach(function (price, i) {
      let text = " ₽ /мес";
      if (priceMonthly[i] > 7290) {
        text = " ₽";
      }
      price.innerHTML =
        Math.floor(priceMonthly[i]).toLocaleString("ru-RU") + text;
    });

    const texts = document.querySelectorAll(className);
    texts.forEach(function (text, i) {
      text.innerHTML = cardText[i];
    });
  }
  hidePopup() {
    this.popup.style.display = "none";
    this.tariffButton.textContent = this.tariff;

    // Вызываем колбэк для обновления тарифа в ProductCard
    if (this.onCloseCallback) {
      this.onCloseCallback(this.tariff);
    }

    // Уничтожаем объект
    this.destroy();
  }

  pickCard(value) {
    this.tariff = value;
    localStorage.setItem("tariff-" + this.subject, this.tariff);
    this.updatePopupContent();
    this.hidePopup();
  }

  updatePopupContent() {
    this.clearButtons();
    switch (this.tariff) {
      case "Минимум":
        this.pressButton("1");
        break;
      case "Стандарт":
        this.pressButton("2");
        break;
      case "Премиум":
        this.pressButton("3");
        break;
    }
  }

  pressButton(end) {
    const button = document.querySelector("#card-button-" + end);
    const radioButton = document.querySelector("#tariff-" + end);
    if (button && radioButton) {
      button.classList.add("checked");
      button.textContent = "Выбран";
      radioButton.checked = true;
    }
  }

  clearButtons() {
    for (let i = 1; i <= 3; i++) {
      const button = document.querySelector("#card-button-" + i);
      if (button) {
        button.classList.remove("checked");
        button.textContent = "Выбрать";
      }
    }
  }

  destroy() {
    // Удаляем обработчики событий с сохраненными функциями
    document
      .querySelector("#card-button-1")
      .removeEventListener("click", this.handleCardButton1Click);
    document
      .querySelector("#card-button-2")
      .removeEventListener("click", this.handleCardButton2Click);
    document
      .querySelector("#card-button-3")
      .removeEventListener("click", this.handleCardButton3Click);
    document
      .querySelector(".header-cross")
      .removeEventListener("click", this.handleHeaderCrossClick);

    // Удаляем ссылку на объект из ProductCard
    if (this.tariffButton.popupInstance) {
      delete this.tariffButton.popupInstance;
    }
  }
}
