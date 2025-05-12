const title = document.querySelector("#title");
const start = document.querySelector("#start");
const duration = document.querySelector("#duration");
const code = document.querySelector("#code");
const priceType = ["full", "month"];
const priceTariff = ["min", "stand", "prem"];

function getPrices() {
  let prices = [];
  priceType.forEach((type) => {
    priceTariff.forEach((tariff) => {
      if (document.querySelector(`#${type}-${tariff}`).value)
        prices.push(document.querySelector(`#${type}-${tariff}`).value);
      else prices.push(0);
    });
  });
  return prices;
}

document.querySelector(".create-button").addEventListener("click", async () => {
  try {
    // Получаем данные из полей ввода
    const prices = getPrices();
    const subjectData = {
      name: code.value.trim(),
      title: title.value.trim(),
      priceFull: prices.slice(0, 3),
      priceMonthly: prices.slice(3, 6),
      priceInstallment: prices.slice(0, 3),
      startText: start.value.trim(),
      durationText: duration.value.trim(),
    };

    // Валидация данных
    if (!subjectData.name || !subjectData.title) {
      throw new Error("Заполните обязательные поля (код и название)");
    }

    console.log(JSON.stringify(subjectData));

    // Отправка данных на сервер
    const response = await fetch("/api/subjects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Ошибка сервера");
    }

    // Обработка успешного ответа
    const result = await response.json();
    console.log("Предмет успешно создан:", result);

    window.location.href = "/front/catalog.html";
  } catch (error) {
    console.error("Ошибка при создании предмета:", error);
  }
});
