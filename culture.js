document.querySelectorAll(".expandable-card").forEach((card) => {
  const button = card.querySelector("button");

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    card.classList.toggle("is-expanded");
    button.setAttribute("aria-expanded", String(card.classList.contains("is-expanded")));
    button.textContent = card.classList.contains("is-expanded") ? "Show less" : "Read more";
  });

  card.addEventListener("click", () => {
    button.click();
  });
});
