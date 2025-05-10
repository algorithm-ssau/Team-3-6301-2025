class Popup {
  subject;
  popup;
  tariff;
  callBack;

  constructor(subject, tariff, callBack) {
    this.subject = subject;
    this.popup = document.querySelector("#popup-tariff");
    this.tariff = tariff;
    this.callBack = callBack;

    this.handleCardButtonMinimum = () =>
      this.pickCard("Минимум", this.callBack);
    this.handleCardButtonStandart = () =>
      this.pickCard("Стандарт", this.callBack);
    this.handleCardButtonPremium = () =>
      this.pickCard("Премиум", this.callBack);
    this.handleHeaderCrossClick = () => this.hidePopup();
    this.showPopup();
    this.setupClickHandler();
  }

  showPopup() {
    this.changeText();
    this.updatePopupContent();
    this.popup.style.display = "flex";
  }

  hidePopup() {
    this.popup.style.display = "none";
    this.destroy();
  }

  changeText() {
    let textFields = this.popup.querySelectorAll(".material-content");
    let i = 0;
    let text = this.subject.cardText.minimum;
    textFields.forEach(function (textField) {
      textField.innerHTML = text[i];
      i++;
    });
    textFields = this.popup.querySelectorAll(".tariff-card-content.standart");
    i = 0;
    text = this.subject.cardText.standart;
    textFields.forEach(function (textField) {
      textField.innerHTML = text[i];
      i++;
    });
    textFields = this.popup.querySelectorAll(".tariff-card-content.premiums");
    i = 0;
    text = this.subject.cardText.premium;
    textFields.forEach(function (textField) {
      textField.innerHTML = text[i];
      i++;
    });
  }

  pickCard(newTariff, callBack) {
    if (typeof callBack === "function") {
      callBack(newTariff);
    }
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
    const button = this.popup.querySelector(`#card-button-${end}`);
    const border = this.popup.querySelector(`#cards-card-${end}`);
    if (button) {
      button.classList.add("checked");
      button.textContent = "Выбран";
      border.classList.add("checked");
    }
  }

  clearButtons() {
    for (let i = 1; i <= 3; i++) {
      const border = this.popup.querySelector(`#cards-card-${i}`);
      const button = this.popup.querySelector(`#card-button-${i}`);
      if (button) {
        button.classList.remove("checked");
        button.textContent = "Выбрать";
        border.classList.remove("checked");
      }
    }
  }

  setupClickHandler() {
    this.popup
      .querySelector(".header-cross")
      .addEventListener("click", this.handleHeaderCrossClick);
    this.popup
      .querySelector("#card-button-1")
      .addEventListener("click", this.handleCardButtonMinimum);
    this.popup
      .querySelector("#card-button-2")
      .addEventListener("click", this.handleCardButtonStandart);
    this.popup
      .querySelector("#card-button-3")
      .addEventListener("click", this.handleCardButtonPremium);
  }

  destroy() {
    // Удаляем обработчики событий с сохраненными функциями
    this.popup
      .querySelector("#card-button-1")
      .removeEventListener("click", this.handleCardButtonMinimum);
    this.popup
      .querySelector("#card-button-2")
      .removeEventListener("click", this.handleCardButtonStandart);
    this.popup
      .querySelector("#card-button-3")
      .removeEventListener("click", this.handleCardButtonPremium);
    this.popup
      .querySelector(".header-cross")
      .removeEventListener("click", this.handleHeaderCrossClick);
  }
}
