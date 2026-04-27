const API = "http://localhost:3000/api/products";

const container = document.getElementById("productsGrid");

/* ================= SCROLL (FIXED HERO BUTTON) ================= */
function scrollToProducts() {
  document.getElementById("products")
    .scrollIntoView({ behavior: "smooth" });
}

/* ================= SLIDER ================= */
function startSlider() {
  const slides = document.querySelectorAll(".slide");
  let i = 0;

  setInterval(() => {
    slides.forEach(s => s.classList.remove("active"));
    i = (i + 1) % slides.length;
    slides[i].classList.add("active");
  }, 3000);
}
/* ================= CART ================= */
let cartCount = 0;

function addToCart() {
  cartCount++;
  document.getElementById("cartCount").innerText = cartCount;
}

/* ================= NAVBAR (FIXED) ================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

/* TOGGLE MENU */
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* CLOSE MENU WHEN CLICK LINK */
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

