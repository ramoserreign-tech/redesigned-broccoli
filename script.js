const pages = [...document.querySelectorAll("[data-page]")];
const navigation = document.querySelector(".primary-nav");
const menuToggle = document.querySelector(".menu-toggle");
const knownRoutes = new Set(pages.map((page) => page.id));

function showPage() {
  const route = window.location.hash.slice(1);
  const pageId = knownRoutes.has(route) ? route : "home";

  for (const page of pages) {
    const active = page.id === pageId;
    page.classList.toggle("is-active", active);
    page.setAttribute("aria-hidden", String(!active));
  }

  document.title = pageId === "home"
    ? "BNHS SDRRM: Be Prepared, Be Safe, Be Alert"
    : `${pages.find((page) => page.id === pageId).querySelector("h1").textContent} | BNHS SDRRM`;

  navigation.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("hashchange", showPage);
showPage();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

for (const checkbox of document.querySelectorAll(".kit-checklist input")) {
  checkbox.addEventListener("change", () => {
    const checkedCount = document.querySelectorAll(".kit-checklist input:checked").length;
    document.querySelector("#kit-progress-text").textContent = `${checkedCount} of 10 items ready`;
    document.querySelector("#kit-progress").style.width = `${checkedCount * 10}%`;
  });
}
