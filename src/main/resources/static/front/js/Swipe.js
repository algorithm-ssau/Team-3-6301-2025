let startTranslateX = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
const threshold = 50;

const cardContainer = document.querySelector(".tariff-content-cards");

cardContainer.addEventListener("touchstart", handleStart);
cardContainer.addEventListener("touchmove", handleMove);
cardContainer.addEventListener("touchend", handleEnd);

cardContainer.addEventListener("mousedown", handleStart);
cardContainer.addEventListener("mousemove", handleMove);
cardContainer.addEventListener("mouseup", handleEnd);
cardContainer.addEventListener("mouseleave", handleEnd);

function handleStart(event) {
  if (event.type === "touchstart") {
    startX = event.touches[0].clientX;
  } else if (event.type === "mousedown") {
    startX = event.clientX;
    isDragging = true;
  }
}
function handleMove(event) {
  if (!isDragging && event.type !== "touchmove") return;

  if (event.type === "touchmove") {
    currentX = event.touches[0].clientX;
  } else if (event.type === "mousemove") {
    currentX = event.clientX;
  }
}

function handleEnd() {
  if (window.innerWidth > 1000) return;
  if (!isDragging && event.type !== "touchend") return;

  const deltaX = currentX - startX;

  if (Math.abs(deltaX) > threshold) {
    if (deltaX > 0) {
      // Свайп вправо
      if (startTranslateX != 33) startTranslateX += 33;
      document.querySelector(
        ".tariff-content-cards"
      ).style.transform = `translateX(${startTranslateX}%)`;
      cardContainer.scrollBy({
        left: -cardContainer.offsetWidth,
        behavior: "smooth",
      });
    } else {
      // Свайп влево
      if (startTranslateX != -33) startTranslateX -= 33;
      document.querySelector(
        ".tariff-content-cards"
      ).style.transform = `translateX(${startTranslateX}%)`;
      cardContainer.scrollBy({
        left: cardContainer.offsetWidth,
        behavior: "smooth",
      });
    }
  }
  isDragging = false;
}
