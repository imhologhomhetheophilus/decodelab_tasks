const API = "http://localhost:3000/api/products";

const container = document.getElementById("productsGrid");
const loadingEl = document.getElementById("loading");
const cartCountEl = document.getElementById("cartCount");

let cartCount = 0;
let slideIndex = 0;

/* ================= HAMBURGER MENU ================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

/* CLOSE MENU WHEN CLICKING ANY LINK */
document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

/* CLOSE MENU WHEN CLICKING OUTSIDE (PRO UX) */
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove("show");
  }
});

/* ================= SLIDER ================= */
function startSlider() {
  const slides = document.querySelectorAll(".slide");

  if (!slides.length) return;

  setInterval(() => {
    slides.forEach(s => s.classList.remove("active"));

    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add("active");
  }, 3000);
}

/* ================= SCROLL ================= */
function scrollToProducts() {
  document.getElementById("products")
    .scrollIntoView({ behavior: "smooth" });
}

/* ================= LOAD PRODUCTS ================= */
async function loadProducts() {
  try {
    loadingEl.style.display = "block";

    const res = await fetch(API);
    const data = await res.json();

    loadingEl.style.display = "none";
    container.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = "<p>No products found</p>";
      return;
    }

    data.forEach(p => {

      const img = p.image?.startsWith("/")
        ? p.image
        : `/asset/images/${p.image}`;

      container.innerHTML += `
        <div class="product-card">
          <img src="${img}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>₦${Number(p.price).toLocaleString()}</p>

          <button onclick="addToCart()">Add to Cart</button>
          <button onclick="editProduct('${p._id}')">Edit</button>
          <button onclick="deleteProduct('${p._id}')">Delete</button>
        </div>
      `;
    });

  } catch (err) {
    console.error("LOAD ERROR:", err);
    loadingEl.innerText = "Failed to load products";
  }
}

/* ================= CART ================= */
function addToCart() {
  cartCount++;
  cartCountEl.innerText = cartCount;
}

/* ================= EDIT PRODUCT ================= */
async function editProduct(id) {
  const name = prompt("New name:");
  const price = prompt("New price:");

  if (!name || !price) return;

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price: Number(price) })
  });

  loadProducts();
}

/* ================= DELETE PRODUCT ================= */
async function deleteProduct(id) {
  if (!confirm("Delete product?")) return;

  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadProducts();
}

/* ================= INIT ================= */
window.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  startSlider();
});