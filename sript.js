
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

const brandSearch = document.getElementById("brandSearch");
const brands = document.querySelectorAll(".brand");
const emptyMessage = document.getElementById("emptyMessage");

const modal = document.getElementById("brandModal");
const modalTitle = document.getElementById("modalTitle");
const modalCountry = document.getElementById("modalCountry");
const modalInfo = document.getElementById("modalInfo");
const modalModels = document.getElementById("modalModels");

const modalClose = document.getElementById("modalClose");
const modalDone = document.getElementById("modalDone");

// Telefon menyusi
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.textContent = opened ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(opened));
});

// Menyudan bo‘lim tanlanganda menyuni yopish
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Brendlarni qidirish
brandSearch.addEventListener("input", () => {
  const query = brandSearch.value.trim().toLowerCase();
  let count = 0;

  brands.forEach(brand => {
    const name = brand.dataset.name.toLowerCase();
    const country = brand.dataset.country.toLowerCase();

    const found = name.includes(query) || country.includes(query);

    brand.hidden = !found;

    if (found) count++;
  });

  emptyMessage.hidden = count !== 0;
});

// Brend haqida ma’lumot oynasi
brands.forEach(brand => {
  brand.addEventListener("click", () => {
    modalTitle.textContent = brand.dataset.name;
    modalCountry.textContent = "Davlat: " + brand.dataset.country;
    modalInfo.textContent = brand.dataset.info;
    modalModels.textContent = brand.dataset.models;

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
  });
});

// Oynani yopish
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modalDone.addEventListener("click", closeModal);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Qidiruv tugmasi bosilganda qidiruv maydoniga o‘tish
document.getElementById("focusSearch").addEventListener("click", () => {
  brandSearch.focus();
  document.getElementById("brands").scrollIntoView({
    behavior: "smooth"
  });
});
