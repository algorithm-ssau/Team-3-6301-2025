async function fetchSubjects() {
  try {
    const response = await fetch("/api/subjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    throw error;
  }
}

// Использование
try {
  const subjectsData = await fetchSubjects();
  console.log("Получены данные:", subjectsData);

  // Пример обработки данных
  subjectsData.forEach((subject) => {
    console.log(subject);
  });
} catch (error) {
  // Обработка ошибок
  console.error("Не удалось загрузить данные:", error);
}

export const cardText = {
  minimum: [
    "8−10 онлайн-вебинаров<br>в месяц (+ записи)",
    "4-5 видеоуроков в месяц",
    "карточки с алгоритмами<br>и конспекты к каждой теме",
    "тесты (теория + практика + сочинение) каждую неделю",
    "пробники 2 раза в месяц<br>(без проверки сочинения)",
    "еженедельные вебинары по психологии и профориентации от приглашенных спикеров",
    "индивидуальные ответы на вопросы по теории в закрытой группе",
    "2 беседы в Телеграме (теория + флудилка)",
  ],
  standart: [
    "2 сочинения в месяц с индивидуальной подробной проверкой от наших суперстрогих проверяющих",
    "<span>пробники 2 раза в месяц<br><i>(с проверкой сочинения)</i></span>",
    "помощь мотиватора (следит за прогрессом, помогает не потеряться на курсе и поддерживает ученика)",
    "3 беседы в Телеграме (теория + флудилка + беседа с мотиватором)",
  ],
  premium: [
    "групповые занятия с наставником раз в неделю",
    "<span>помощь наставника<br><i>(дипломированный филолог или  студент гуманитарного направления, который не только мотивирует и поддерживает ученика, но и отлично разбирается в предмете)</i></span>",
    "4-5 сочинений в месяц с индивидуальной подробной проверкой от наших суперстрогих проверяющих",
    "<span>3 беседы в Телеграме<br>(теория + флудилка + <b>беседа с наставником</b>)</span>",
  ],
};

export const subjects = [
  {
    name: "rus",
    title: "Курсы по Русскому языку",
    priceFull: [9860, 13770, 16760],
    priceMonthly: [4290, 5990, 7290],
    priceInstallment: [9860, 13770, 16760],
    startText: "18&nbsp;марта",
    durationText: "2.5&nbsp;месяца",
    durationNumber: 1,
    cardText: cardText,
  },
  {
    name: "inf",
    title: "Курсы по Информатике",
    priceFull: [7695, 10745, 13075],
    priceMonthly: [4290, 5990, 7290],
    priceInstallment: [7695, 10745, 13075],
    startText: "3&nbsp;апреля",
    durationText: "2&nbsp;месяца",
    durationNumber: 1,
    cardText: cardText,
  },
  {
    name: "chem",
    title: "Курсы по Химии",
    priceFull: [7695, 10745, 13075],
    priceMonthly: [4290, 5990, 7290],
    priceInstallment: [7695, 10745, 13075],
    startText: "21&nbsp;марта",
    durationText: "2&nbsp;месяца",
    durationNumber: 1,
    cardText: cardText,
  },
  {
    name: "bio",
    title: "Курсы по Биологии",
    priceFull: [9860, 13770, 16760],
    priceMonthly: [4290, 5990, 7290],
    priceInstallment: [9860, 13770, 16760],
    startText: "24&nbsp;марта",
    durationText: "2.5&nbsp;месяца",
    durationNumber: 2.5,
    cardText: cardText,
  },
];
