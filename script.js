
// =====================================
// 1. MOBILE NAVBAR / HAMBURGER MENU
// =====================================

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const menuBackdrop = document.querySelector(".menu-backdrop");

function setMenu(open) {
  mainNav.classList.toggle("open", open);
  menuBackdrop.classList.toggle("show", open);

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute(
    "aria-label",
    open ? "Tutup menu" : "Buka menu"
  );

  document.body.style.overflow = open ? "hidden" : "";
}

// Klik hamburger
menuToggle.addEventListener("click", () => {
  const isOpen =
    menuToggle.getAttribute("aria-expanded") === "true";

  setMenu(!isOpen);
});

// Klik area luar navbar
menuBackdrop.addEventListener("click", () => {
  setMenu(false);
});

// Tutup dengan tombol Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
  }
});

// Tutup ketika link navbar diklik
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenu(false);
  });
});


// =====================================
// 2. FILTER TRENDY PRODUCT
// =====================================

const filterButtons = document.querySelectorAll(".tab");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const filter = button.dataset.filter;

    // Mengatur tombol aktif
    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    // Filter produk
    productCards.forEach((card) => {

      const category = card.dataset.category;

      const isVisible =
        filter === "all" || category === filter;

      card.classList.toggle("hidden", !isVisible);

    });

  });

});


// =====================================
// 3. SEARCH PRODUCT
// =====================================

const searchToggle = document.querySelector(".search-toggle");
const searchPanel = document.querySelector(".search-panel");
const searchInput = searchPanel.querySelector("input");

searchToggle.addEventListener("click", () => {

  searchPanel.classList.toggle("open");

  if (searchPanel.classList.contains("open")) {
    searchInput.focus();
  }

});

searchPanel.addEventListener("submit", (event) => {

  event.preventDefault();

  const query = searchInput.value.trim().toLowerCase();

  if (!query) return;

  productCards.forEach((card) => {

    const productName = card.textContent.toLowerCase();

    card.classList.toggle(
      "hidden",
      !productName.includes(query)
    );

  });

  // Nonaktifkan semua tombol filter
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });

  searchPanel.classList.remove("open");

});


// =====================================
// 4. HERO SLIDER BUTTON
// =====================================

const heroArrows = document.querySelectorAll(".hero-arrow");
const heroImage = document.querySelector(".hero-banner > img");

const bannerImages = [
  "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1800&q=85",

  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85",

  "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1800&q=85"
];

let currentSlide = 0;
let slideInterval;

function showSlide(index) {

  currentSlide =
    (index + bannerImages.length) % bannerImages.length;

  heroImage.style.opacity = "0";

  setTimeout(() => {
    heroImage.src = bannerImages[currentSlide];
    heroImage.style.opacity = "1";
  }, 350);

}

function startAutoSlide() {

  slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);

}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

heroArrows.forEach((arrow) => {

  arrow.addEventListener("click", () => {

    if (arrow.classList.contains("next")) {
      showSlide(currentSlide + 1);
    } else {
      showSlide(currentSlide - 1);
    }

    resetAutoSlide();

  });

});

startAutoSlide();


// =====================================
// 5. RESET NAVBAR SAAT RESIZE
// =====================================

window.addEventListener("resize", () => {

  if (window.innerWidth > 700) {
    setMenu(false);
  }

});
