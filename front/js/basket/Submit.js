let isValid = false;
const verificationCodeInput = document.getElementById("confirm-input");
const verificationError = document.getElementById("confirm-error");
const formConfirm = document.querySelector(".form-confirm");
const formClose = document.getElementById("close-popup");
const phoneInput = document.getElementById("phone-input");
const submitButton = document.getElementById("confirm-submit");
const sendCodeButton = document.getElementById("send-code");
let generatedCode;
let phoneNumber;
function redirectImg(page) {
  window.location.href = `/${page}`;
}

var handlePhoneInput = function (event) {
  var inputElement = event.target,
    shouldClear = inputElement.dataset.phoneClear,
    phonePattern = inputElement.dataset.phonePattern,
    defaultPattern = "+7 (___) ___-__-__",
    currentPattern = phonePattern ? phonePattern : defaultPattern,
    index = 0,
    defaultDigits = currentPattern.replace(/\D/g, ""),
    inputDigits = event.target.value.replace(/\D/g, "");

  if (!inputElement.dataset.cursorSet) {
    inputElement.dataset.cursorSet = "true";
  }

  if (shouldClear !== "false" && event.type === "blur") {
    if (inputDigits.length < currentPattern.match(/([\_\d])/g).length) {
      event.target.value = "";
      return;
    }
  }

  if (defaultDigits.length >= inputDigits.length) inputDigits = defaultDigits;
  event.target.value = currentPattern.replace(/./g, function (char) {
    return /[_\d]/.test(char) && index < inputDigits.length
      ? inputDigits.charAt(index++)
      : index >= inputDigits.length
      ? ""
      : char;
  });

  if (event.type === "focus" && !inputElement.dataset.cursorSet) {
    setTimeout(function () {
      var cursorPosition = inputElement.value.indexOf("7") + 1;
      if (cursorPosition > 0) {
        inputElement.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  }

  // Проверка, полностью ли заполнен номер
  var confirmButton = document.getElementById("confirm-button");
  sendCodeButton.style.display = "none";
  if (inputDigits.length >= 11) {
    sendCodeButton.style.display = "flex";
  }
};

for (let ev of ["input", "blur", "focus"]) {
  phoneInput.addEventListener(ev, handlePhoneInput);
}

sendCodeButton.addEventListener("click", () => createVerificationCode());

function createVerificationCode() {
  phoneNumber = phoneInput.value.replace(/\D/g, "");
  console.log(phoneNumber);
  if (!generatedCode) {
    // Генерация кода
    console.log("Генерация кода");
    generatedCode = generateVerificationCode();
    // Отправляем AJAX запрос для отправки кода
    console.log("Код: " + generatedCode);
    console.log("Отправляем AJAX запрос для отправки кода");
    //sendVerificationCode(phoneNumber, generatedCode);
    verificationCodeInput.style.display = "flex";
  } else {
    console.log("Код уже был отправлен");
  }
}

function generateVerificationCode(length = 4) {
  const chars = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function sendVerificationCode(phoneNumber, generatedCode) {
  // ajax запрос
  fetch(ajaxurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      action: "send_verification_code",
      phone_number: phoneNumber,
      code: generatedCode,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.success) {
      }
    })
    .catch((error) => {});
}
verificationCodeInput.addEventListener("input", () =>
  confirmVerificationCode()
);

function confirmVerificationCode() {
  if (verificationCodeInput.value.length > 4) {
    verificationCodeInput.value = verificationCodeInput.value.slice(0, 4); // Обрезаем лишние цифры
  }
  const enteredCode = verificationCodeInput.value;
  if (enteredCode.length == 4) {
    if (enteredCode == generatedCode) {
      // если все хорошо
      verificationCodeInput.style.display = "none";
      verificationError.style.display = "none";
      submitButton.style.display = "block";
      submitButton.classList.remove("deactivated");
      //submitButton.addEventListener("click", submitForm);
    } else {
      verificationError.innerText = "Код подтверждения неверный";
      verificationError.style.display = "block";
    }
  } else {
    verificationError.style.display = "none";
  }
}
formClose.addEventListener("click", closePopup);
formClose.addEventListener("touchend", closePopup); // Добавляем обработчик для мобильных устройств

function closePopup() {
  document.querySelector(".popup-phone").style.display = "none";
}

function submitForm() {
  let resultMas = [];
  subjectsName.forEach(function (name) {
    if (localStorage.getItem(`${name}-display`) == "flex") {
      resultMas.push([name, localStorage.getItem(`tariff-${name}`)]);
    }
  });
  let name = document.querySelector("#form-name").value;
  if (name == "") {
    name = "Ваня";
  }
  const sum = parseInt(priceWithDiscount, 10);
  const phone = phoneInput.value.replace(/\D/g, "");
  const obj = {
    name: name,
    phone: phone,
    choose: resultMas,
    pay: priceType,
    promo: isValid,
    sum: sum,
  };
  console.log(JSON.stringify(obj));
  fetch("https://plain-sea-e1da.alekseyvyaltsev6.workers.dev/", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      startAnimation();
      setTimeout(() => {
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          console.error("Ссылка для оплаты не найдена в ответе");
        }
      }, 6000);
    })
    .catch((error) => {
      console.error("Ошибка:", error); // Обрабатываем ошибку
    });
}

function startAnimation() {
  document.querySelector(".form-animation").style.display = "flex";
  animateRotate(2160); // Запуск анимации на 2160 градусов (6 полных оборотов)
}

function animateRotate(targetAngle) {
  const animationImg = document.querySelector("#animation-load");
  let startAngle = 0;
  const duration = 6000; // 6 секунд
  const startTime = performance.now();

  function step(currentTime) {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // Прогресс от 0 до 1
    const currentAngle = startAngle + targetAngle * progress;
    animationImg.style.transform = `rotate(${currentAngle}deg)`;

    if (progress < 1) {
      requestAnimationFrame(step); // Продолжаем анимацию
    }
  }

  requestAnimationFrame(step); // Запускаем анимацию
}

document
  .getElementById("promo-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const promocode = document.getElementById("promo-input").value.trim();

    checkPromocode(promocode);
  });

async function checkPromocode(promocode) {
  const googleSheetUrl =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSD5Klo2DRysOrMIK3YxUbSQuvFmNjYfO5nmlPe6HLgFRoSoN1CHDluuaTxDb3RHLKOd9tOeL1HBJa3/pub?output=csv";
  const resultDiv = document.querySelector(".form-underpromo");
  resultDiv.innerHTML = "*Промокод можно использовать только один раз";
  try {
    const response = await fetch(googleSheetUrl);
    const data = await response.text();
    const lines = data.split("\n");

    isValid = false;
    let discount = "";
    let item = "";

    lines.forEach((line) => {
      const [code, itemName, used, discountValue] = line.split(",");
      if (code === promocode && used.trim() === "нет") {
        isValid = true;
        discount = discountValue.trim();
        item = itemName.trim();
      }
    });

    if (isValid && counter == 1 && productChem.getMainPrice() != 0) {
      promo = (100 - discount) / 100;
      promoCode = promocode;
      getPrice();
    } else if (isValid && counter == 1) {
      resultDiv.innerHTML = "Промокод может примениться только к Химии.";
    }
  } catch (error) {
    resultDiv.innerHTML =
      "<p>Ошибка при проверке промокода. Попробуйте позже.</p>";
    console.error("Ошибка:", error);
  }
}
